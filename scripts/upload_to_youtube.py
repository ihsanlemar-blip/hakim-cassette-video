#!/usr/bin/env python3
"""
Direct YouTube Uploader for Hakim Jan Faryadi Master Video.
Downloads the rendered master video directly from GitHub Release to Cloud Shell
and uploads it to YouTube without consuming local user device data.
"""

import os
import sys
import json
import argparse
import threading
from urllib.parse import urlparse, parse_qs
from http.server import HTTPServer, BaseHTTPRequestHandler

from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

SCOPES = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube.readonly'
]

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(WORKSPACE_DIR, "out")
DEFAULT_VIDEO_NAME = "HakimJan_Faryadi_GhamjaneStargi_1080p.mp4"
TAG_NAME = "v2.0.0-final-master"

POSSIBLE_SECRET_PATHS = [
    os.path.join(WORKSPACE_DIR, "client_secrets.json"),
    os.path.join(WORKSPACE_DIR, "clientSecret.json"),
    os.path.expanduser("~/client_secrets.json"),
    os.path.expanduser("~/clientSecret.json")
]

POSSIBLE_TOKEN_PATHS = [
    os.path.join(WORKSPACE_DIR, "token.json"),
    os.path.expanduser("~/token.json")
]


def find_client_secrets():
    for p in POSSIBLE_SECRET_PATHS:
        if os.path.exists(p):
            return p
    return None


def get_token_file():
    for p in POSSIBLE_TOKEN_PATHS:
        if os.path.exists(p):
            return p
    return os.path.join(WORKSPACE_DIR, "token.json")


def get_authenticated_service(client_secrets_file=None):
    creds = None
    token_file = get_token_file()

    if os.path.exists(token_file):
        try:
            creds = Credentials.from_authorized_user_file(token_file, SCOPES)
            print(f"[✓] Loaded existing authorization token from: {token_file}")
        except Exception as e:
            print(f"[!] Could not load existing token: {e}")
            creds = None

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            print("[*] Refreshing expired access token...")
            try:
                creds.refresh(Request())
                with open(token_file, 'w') as f:
                    f.write(creds.to_json())
                print(f"[✓] Token refreshed successfully.")
            except Exception as e:
                print(f"[!] Token refresh failed: {e}. Re-authenticating...")
                creds = None

        if not creds:
            secrets_path = client_secrets_file or find_client_secrets()
            if not secrets_path or not os.path.exists(secrets_path):
                print("\n" + "!" * 75)
                print("ERROR: clientSecret JSON file was not found!")
                print(f"Looked in:")
                for p in POSSIBLE_SECRET_PATHS:
                    print(f"  - {p}")
                print("\nPlease place your clientSecret json file at:")
                print(f"  {POSSIBLE_SECRET_PATHS[0]}")
                print("!" * 75 + "\n")
                sys.exit(1)

            print(f"[*] Using client secrets file: {secrets_path}")
            redirect_uri = "http://localhost:8080/"
            flow = InstalledAppFlow.from_client_secrets_file(
                secrets_path,
                scopes=SCOPES,
                redirect_uri=redirect_uri
            )
            auth_url, _ = flow.authorization_url(prompt='consent', access_type='offline')

            print("\n" + "=" * 78)
            print("STEP 1: Open this URL in your browser to authorize your YouTube account:")
            print("=" * 78)
            print(f"\n{auth_url}\n")
            print("=" * 78)
            print("STEP 2: After logging in & allowing permissions, your browser will redirect to:")
            print("        http://localhost:8080/?code=4/0A... (or show 'Can't reach page')")
            print("        Simply COPY the redirected URL (or code) and paste it below.")
            print("=" * 78 + "\n")

            auth_code = None
            code_event = threading.Event()

            class OAuthCallbackHandler(BaseHTTPRequestHandler):
                def do_GET(self):
                    nonlocal auth_code
                    query = urlparse(self.path).query
                    params = parse_qs(query)
                    if 'code' in params:
                        auth_code = params['code'][0]
                        self.send_response(200)
                        self.send_header("Content-Type", "text/html")
                        self.end_headers()
                        self.wfile.write(b"<html><body style='font-family:sans-serif;text-align:center;padding-top:60px;'><h2>Authentication successful!</h2><p>You can close this tab now and return to your terminal.</p></body></html>")
                        code_event.set()
                    else:
                        self.send_response(400)
                        self.end_headers()
                        self.wfile.write(b"Authentication failed: no code parameter received.")

                def log_message(self, format, *args):
                    pass

            httpd = None
            try:
                httpd = HTTPServer(('0.0.0.0', 8080), OAuthCallbackHandler)
                server_thread = threading.Thread(target=httpd.handle_request, daemon=True)
                server_thread.start()
            except Exception as e:
                print(f"[*] Note: Local listener notice: {e}")

            user_input = None
            try:
                user_input = input("Paste redirected URL or authorization code here (or press Enter if browser connected): ").strip()
            except EOFError:
                pass

            if user_input:
                if "code=" in user_input:
                    parsed = urlparse(user_input)
                    params = parse_qs(parsed.query)
                    auth_code = params.get('code', [user_input])[0]
                else:
                    auth_code = user_input

            if not auth_code and not code_event.is_set():
                print("[*] Waiting for browser authentication callback...")
                code_event.wait(timeout=30)

            if not auth_code:
                raise RuntimeError("Failed to obtain authorization code.")

            flow.fetch_token(code=auth_code)
            creds = flow.credentials

            with open(token_file, 'w') as f:
                f.write(creds.to_json())
            print(f"\n[✓] Successfully authenticated! Token saved to: {token_file}")

    return build('youtube', 'v3', credentials=creds)


def ensure_video_file(custom_path=None):
    if custom_path and os.path.exists(custom_path):
        return custom_path

    os.makedirs(OUT_DIR, exist_ok=True)
    target_path = os.path.join(OUT_DIR, DEFAULT_VIDEO_NAME)

    if os.path.exists(target_path):
        size_mb = os.path.getsize(target_path) / (1024 * 1024)
        print(f"[✓] Master video already present in cloud storage: {target_path} ({size_mb:.1f} MB)")
        return target_path

    print(f"[*] Downloading master 1080p video from GitHub release '{TAG_NAME}' directly into Cloud Shell...")
    cmd = f'gh release download {TAG_NAME} --repo ihsanlemar-blip/hakim-cassette-video -p "{DEFAULT_VIDEO_NAME}" -D "{OUT_DIR}"'
    ret = os.system(cmd)
    if ret != 0 or not os.path.exists(target_path):
        raise RuntimeError(f"Failed to download video from GitHub release. Command returned: {ret}")

    size_mb = os.path.getsize(target_path) / (1024 * 1024)
    print(f"[✓] Video downloaded to cloud runner: {target_path} ({size_mb:.1f} MB)")
    return target_path


def upload_to_youtube(video_path, title, description, privacy="private", tags=None):
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video file not found at: {video_path}")

    youtube = get_authenticated_service()

    # Verify channel
    try:
        channels_response = youtube.channels().list(mine=True, part='snippet').execute()
        items = channels_response.get('items', [])
        if items:
            channel_name = items[0]['snippet']['title']
            print(f"[✓] Authenticated YouTube Channel: '{channel_name}'")
    except Exception as e:
        print(f"[*] Note: Could not query channel name: {e}")

    default_tags = [
        "حکیم جان فریادي", "Hakim Jan Faryadi", "غمجنې سترګې", "Ghamjane Stargi",
        "Pashto Song", "Afghan Music", "Attan", "Cassette", "Remotion"
    ]

    body = {
        'snippet': {
            'title': title,
            'description': description,
            'tags': tags or default_tags,
            'categoryId': '10'  # Music
        },
        'status': {
            'privacyStatus': privacy,
            'selfDeclaredMadeForKids': False
        }
    }

    file_size = os.path.getsize(video_path)
    file_size_mb = file_size / (1024 * 1024)
    print("\n" + "=" * 70)
    print("🚀 STARTING CLOUD DIRECT UPLOAD TO YOUTUBE")
    print(f"   Video File:    {video_path} ({file_size_mb:.1f} MB)")
    print(f"   Video Title:   {title}")
    print(f"   Privacy:       {privacy.upper()} (Draft / Not public until you review)")
    print("=" * 70)

    media = MediaFileUpload(
        video_path,
        chunksize=10 * 1024 * 1024,  # 10 MB chunks
        resumable=True,
        mimetype='video/mp4'
    )

    request = youtube.videos().insert(
        part=','.join(body.keys()),
        body=body,
        media_body=media
    )

    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            progress = int(status.progress() * 100)
            print(f"   -> Upload Progress: {progress}%")

    video_id = response.get('id')
    video_url = f"https://youtu.be/{video_id}"
    studio_url = f"https://studio.youtube.com/video/{video_id}/edit"

    print("\n" + "=" * 70)
    print("🎉 SUCCESS! MASTER VIDEO UPLOADED TO YOUTUBE!")
    print(f"   🎬 Watch URL:      {video_url}")
    print(f"   🛠️ YouTube Studio: {studio_url}")
    print(f"   🔒 Status:         {privacy.upper()}")
    print("=" * 70 + "\n")
    return video_id


def main():
    parser = argparse.ArgumentParser(description="Directly upload rendered video to YouTube channel from Cloud Shell")
    parser.add_argument("--auth-only", action="store_true", help="Authorize with YouTube and save token, then exit")
    parser.add_argument("--client-secret", default=None, help="Path to client_secrets.json")
    parser.add_argument("--file", default=None, help="Custom video file path (defaults to downloading 1080p master from release)")
    parser.add_argument("--privacy", default="private", choices=["private", "unlisted", "public"], help="Privacy level (default: private)")
    parser.add_argument("--title", default="حکیم جان فریادي — غمجنې سترګې سندره | Hakim Jan Faryadi - Ghamjane Stargi (1080p)", help="Video title")
    parser.add_argument("--clean", action="store_true", help="Delete downloaded 511MB video from cloud shell disk after upload")
    args = parser.parse_args()

    if args.auth_only:
        get_authenticated_service(args.client_secret)
        print("[✓] Authentication verified successfully!")
        return

    video_path = ensure_video_file(args.file)

    description = """حکیم جان فریادي — غمجنې سترګې سندره
Hakim Jan Faryadi — Ghamjane Stargi (Official 1080p Full HD Video)

Artist: حکیم جان فریادي (Hakim Jan Faryadi)
Song: غمجنې سترګې (Ghamjane Stargi)
Resolution: 1080p Full HD (1920x1080 @ 30 FPS)
Audio: Master High Fidelity Stereo AAC
Production: Remotion Programmatic Motion Graphics

#HakimJanFaryadi #PashtoMusic #GhamjaneStargi #AfghanMusic
"""

    upload_to_youtube(
        video_path=video_path,
        title=args.title,
        description=description,
        privacy=args.privacy
    )

    if args.clean and os.path.exists(video_path):
        print(f"[*] Cleaning up {video_path} to free disk space...")
        os.remove(video_path)
        print("[✓] Cleanup complete.")


if __name__ == '__main__':
    main()
