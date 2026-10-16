# حکیم جان فریادي — غمجنې سترګې (Hakim Jan Faryadi — Premium Music Visualizer)

A premium, cinematic audio-reactive music video created with **Remotion**, **React**, and **TypeScript**, specifically designed for Afghan singer **Hakim Jan Faryadi (حکیم جان فریادي)** and his soulful Pashto song **"غمجنې سترګې" (Ghamjane Stargi)**.

---

## 🎨 Visual Composition & Creative Hierarchy

The video features a luxury asymmetric composition that honors the emotional, romantic, and nostalgic nature of the song:

```
┌──────────────────────────────────────────────┬──────────────────────────────────────────────┐
│ LEFT / CENTER-LEFT (Hero Singer Area)        │ RIGHT / CENTER-RIGHT (Lyrics & Spectrum)     │
│                                              │                                              │
│  [Multi-layer Golden Back Glow Halo]         │  [Artist & Song Branding Badge]              │
│  [Large Cutout Seated Portrait (50-58%)]     │  حکیم جان فریادي • غمجنې سترګې                 │
│  - Dignified floating motion (hoverY)        │  HIGH FIDELITY STEREO • AFGHAN EDITION       │
│  - Micro-scale breathing scale               │                                              │
│  - Golden rim lighting on shoulders & hair   │  [Synchronized Pashto Lyrics]                │
│  - Authentic traditional attire & hands      │  - Exact CapCut SRT timing (50 cues)         │
│                                              │  - RTL Pashto typography (Noto Naskh)        │
│  [Small Decorative Luxury Cassette]          │  - Frosted glass backdrop & gold glow        │
│  - Size: 18.75% of frame width (360×216px)   │  - Clean instrumental gaps                   │
│  - Dual continuously rotating reels          │                                              │
│  - Tape transferring supply -> take-up       │  [Audio Spectrum Equalizer]                  │
│  - Subtle 3D sway (yaw, pitch, roll)         │  - 36 frequency bars with curved arc         │
│  - Pashto title & singer album thumbnail     │  - Champagne gold & warm amber gradients     │
│                                              │  - Peak transient indicators & floor bounce  │
│  ════════════════════════════════════════════╧════════════════════════════════════════════  │
│  [7-Layer Cinematic Atmosphere: Midnight Blue #081323, Afghan Stars, Dust, Bokeh, Light Rays]│
│  [Audio-Reactive Virtual Camera: Ambient Float + Bass Impulse + Anti-Black-Border Protection]│
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Technical Architecture

```
hakim-cassette-video/
├── .github/
│   └── workflows/
│       ├── validate.yml          # CI: Typecheck, SRT validation, asset integrity
│       ├── preview-render.yml    # Renders 7 screenshots + 10s preview MP4
│       └── render-video.yml      # Renders final 1080p MP4 with FFmpeg check
├── public/
│   ├── fonts/                    # Bundled Noto Naskh Arabic (Regular, Medium, Bold)
│   ├── ghamjani_stargi.mp3       # Master 320 kbps stereo audio track
│   ├── hakim_portrait.png        # Transparent 1190x1322 singer PNG cutout
│   └── Extracted_CapCut_Pashto_Subtitles.srt  # 50 verified Pashto subtitle cues
├── src/
│   ├── components/
│   │   ├── AudioSpectrum.tsx           # Audio-reactive frequency visualizer
│   │   ├── BackgroundAtmosphere.tsx    # 7-layer cinematic backdrop & dust particles
│   │   ├── CameraMotionController.tsx  # Virtual camera with harmonic float & shake
│   │   ├── IntroOutro.tsx              # Opening reveal & concluding master fade
│   │   ├── PashtoLyrics.tsx            # Synchronized RTL subtitle renderer
│   │   ├── SingerBackGlow.tsx          # Multi-layered golden aura & rim lighting
│   │   ├── SingerHero.tsx              # Primary hero portrait with breathing & float
│   │   ├── SmallCassette.tsx           # Vintage-modern compact cassette with 3D depth
│   │   ├── SmallCassetteReels.tsx      # Dual rotating spools & measurement scale
│   │   └── SongBranding.tsx            # Top-right artist & song title insignia
│   ├── config/
│   │   ├── audioAnalysis.json          # Precomputed 11,873-frame STFT frequency data
│   │   ├── projectConfig.ts            # Centralized project configuration
│   │   └── subtitles.json              # Precomputed verified subtitle cues
│   ├── utils/
│   │   ├── audioAnalyzer.ts            # Dual live WebAudio + precomputed STFT analyzer
│   │   └── subtitles.ts                # SRT cue timing parser & fade-in/out controller
│   ├── HakimCassetteVideo.tsx          # Master composition assembly
│   ├── Root.tsx                       # Remotion composition registry
│   └── index.ts                       # Entry point
├── scripts/
│   ├── generate_audio_analysis.py     # Python STFT generator
│   ├── validate_assets.js             # Asset existence & size validator
│   ├── validate_composition.js        # Remotion composition validator
│   └── validate_subtitles.js          # Subtitle cue timing & RTL integrity validator
├── package.json
├── remotion.config.ts
└── tsconfig.json
```

---

## ⚡ Cloud Shell vs GitHub Actions Infrastructure

Because Google Cloud Shell has strict disk quotas (~1.8 GB remaining), **heavy operations are strictly offloaded to GitHub Actions**:

| Task | Google Cloud Shell | GitHub Actions Runner |
|---|---|---|
| Editing source files & configs | ✅ Supported | — |
| TypeScript check (`npm run typecheck`) | ✅ Instant (0 MB overhead) | ✅ Automated in CI |
| Subtitle & asset validation (`npm test`) | ✅ Instant (0 MB overhead) | ✅ Automated in CI |
| Headless Chromium installation | ❌ Prohibited (disk heavy) | ✅ Automated in Actions |
| Preview screenshots & preview video | ❌ Prohibited | ✅ `.github/workflows/preview-render.yml` |
| Full 1080p MP4 master rendering | ❌ Prohibited | ✅ `.github/workflows/render-video.yml` |

---

## 🚀 GitHub Actions Workflows Guide

### 1. Validation Workflow (`validate.yml`)
- **Trigger:** Automatic on `push` or manual via `workflow_dispatch`.
- **Tasks:** Runs `npm ci`, checks all 50 subtitle cues, verifies asset paths, registers compositions, and runs TypeScript strict typechecking.

### 2. Preview Render Workflow (`preview-render.yml`)
- **Trigger:** Manual via GitHub Actions UI (`workflow_dispatch`).
- **Tasks:**
  - Provisions Chromium & Noto fonts on an Ubuntu runner.
  - Renders 7 full-resolution screenshots at key milestones:
    - `00:00:00` (Frame 0 — Opening reveal)
    - `00:00:10` (Frame 300 — Intro settled)
    - `00:00:33.4` (Frame 1002 — First subtitle cue)
    - `00:01:30` (Frame 2700 — Mid-song lyrics)
    - `00:03:00` (Frame 5400 — Main visual composition)
    - `00:05:00` (Frame 9000 — Later song section)
    - `00:06:15.6` (Frame 11269 — Final subtitle cue)
  - Renders a 10-second preview video MP4 (`preview_first_lyric.mp4`).
  - Uploads all screenshots and preview video as an artifact (`hakim-jan-preview-screenshots`).

### 3. Final Master Video Render Workflow (`render-video.yml`)
- **Trigger:** Manual via GitHub Actions UI (`workflow_dispatch`).
- **Configurable Inputs:**
  - `concurrency`: Number of worker threads (default `2`).
  - `crf`: Constant Rate Factor quality (default `18` for near-lossless studio master).
  - `output_filename`: e.g. `HakimJan_Faryadi_GhamjaneStargi_1080p.mp4`.
  - `frames`: `all` or specific range for custom clips.
- **Tasks:**
  - Renders the full 11,873-frame composition (1920×1080 @ 30 FPS).
  - Encodes H.264 video with pristine AAC audio.
  - Verifies video stream and audio stream with FFprobe.
  - Uploads the master MP4 as an artifact with a 90-day retention period.

---

## 📥 How to Download Rendered Artifacts from GitHub Actions

1. Open your repository on GitHub: `https://github.com/ihsanlemar-blip/hakim-cassette-video`
2. Click on the **Actions** tab at the top.
3. Select either **"Visual Preview & Screenshot Test"** or **"Render Full 1080p Music Video"**.
4. Click on the latest workflow run.
5. Scroll down to the **Artifacts** section at the bottom of the page.
6. Click on **`hakim-jan-preview-screenshots`** or **`hakim-jan-master-video`** to download the ZIP file directly to your computer!

---

## 💻 Local Commands

```bash
# Run all local validation tests
npm test

# Type-check TypeScript
npm run typecheck

# Validate subtitle cues only
npm run test:subtitles

# Validate assets only
npm run test:assets

# Start Remotion Studio preview (requires local browser)
npm start
```
