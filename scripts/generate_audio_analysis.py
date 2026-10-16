import subprocess
import json
import math
import numpy as np

def analyze():
    print("Decoding MP3 to PCM...")
    cmd = ['ffmpeg', '-v', 'error', '-i', 'public/ghamjani_stargi.mp3', '-f', 'f32le', '-ac', '1', '-ar', '44100', '-']
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    raw_audio, _ = proc.communicate()
    samples = np.frombuffer(raw_audio, dtype=np.float32)
    sample_rate = 44100
    fps = 30
    duration = len(samples) / sample_rate
    total_frames = int(math.ceil(duration * fps))
    print(f"Loaded {len(samples)} samples. Duration: {duration:.2f}s, Total Frames: {total_frames} @ {fps} fps")

    hop_size = sample_rate / fps
    n_fft = 4096
    window = np.hanning(n_fft)

    # 36 frequency bands between 40 Hz and 14000 Hz (logarithmic distribution)
    n_bands = 36
    freq_bins = np.logspace(np.log10(40), np.log10(14000), n_bands + 1)
    fft_freqs = np.fft.rfftfreq(n_fft, d=1.0/sample_rate)

    band_bin_indices = []
    for i in range(n_bands):
        f_low = freq_bins[i]
        f_high = freq_bins[i+1]
        idx = np.where((fft_freqs >= f_low) & (fft_freqs < f_high))[0]
        if len(idx) == 0:
            idx = [int(np.argmin(np.abs(fft_freqs - (f_low + f_high)/2)))]
        band_bin_indices.append(idx)

    # Low bass indices (40-220 Hz)
    bass_idx = np.where((fft_freqs >= 40) & (fft_freqs <= 220))[0]
    # Mid indices (220-2500 Hz)
    mid_idx = np.where((fft_freqs > 220) & (fft_freqs <= 2500))[0]
    # Treble indices (2500-12000 Hz)
    treble_idx = np.where((fft_freqs > 2500) & (fft_freqs <= 12000))[0]

    all_frames = []

    # Smoothing states
    smoothed_bands = np.zeros(n_bands, dtype=np.float32)
    prev_bass = 0.0
    prev_mid = 0.0
    prev_treble = 0.0
    prev_pulse = 0.0

    # Max tracking for adaptive normalization
    history_max = 0.01

    for frame in range(total_frames):
        center_sample = int(round(frame * hop_size))
        start = center_sample - n_fft // 2
        end = start + n_fft

        # Slice with padding
        if start < 0:
            pad_left = -start
            chunk = samples[0:max(0, end)]
            chunk = np.pad(chunk, (pad_left, 0), mode='constant')
        elif end > len(samples):
            chunk = samples[start:len(samples)]
            pad_right = end - len(samples)
            chunk = np.pad(chunk, (0, pad_right), mode='constant')
        else:
            chunk = samples[start:end]

        if len(chunk) < n_fft:
            chunk = np.pad(chunk, (0, n_fft - len(chunk)), mode='constant')

        # FFT
        windowed = chunk * window
        spectrum = np.abs(np.fft.rfft(windowed))

        # Band energies
        raw_band_vals = np.zeros(n_bands, dtype=np.float32)
        for b in range(n_bands):
            b_indices = band_bin_indices[b]
            raw_band_vals[b] = np.mean(spectrum[b_indices])

        raw_bass = np.mean(spectrum[bass_idx]) if len(bass_idx) > 0 else 0.0
        raw_mid = np.mean(spectrum[mid_idx]) if len(mid_idx) > 0 else 0.0
        raw_treble = np.mean(spectrum[treble_idx]) if len(treble_idx) > 0 else 0.0

        # Equal loudness weight curve (boost bass & highs relative to mids for perception)
        freq_weights = np.linspace(1.2, 2.4, n_bands)
        weighted_bands = raw_band_vals * freq_weights

        # Update local peak tracking
        current_max = np.percentile(weighted_bands, 95)
        history_max = max(history_max * 0.9995, current_max, 0.05)

        # Normalize with soft saturation (tanh)
        norm_bands = np.tanh(weighted_bands / (history_max * 0.75))

        # Attack / Decay smoothing for bands (fast attack 0.7, smooth decay 0.25)
        for b in range(n_bands):
            target = norm_bands[b]
            if target > smoothed_bands[b]:
                smoothed_bands[b] = smoothed_bands[b] * 0.3 + target * 0.7
            else:
                smoothed_bands[b] = smoothed_bands[b] * 0.75 + target * 0.25

        norm_bass = float(np.tanh(raw_bass * 1.5 / history_max))
        norm_mid = float(np.tanh(raw_mid * 1.0 / history_max))
        norm_treble = float(np.tanh(raw_treble * 2.0 / history_max))

        # Bass pulse / kick detection (difference from smoothed base)
        bass_diff = max(0.0, norm_bass - prev_bass)
        pulse = float(np.clip(norm_bass * 0.6 + bass_diff * 0.8, 0.0, 1.0))
        if pulse < prev_pulse:
            pulse = prev_pulse * 0.82 + pulse * 0.18
        prev_pulse = pulse

        prev_bass = norm_bass * 0.7 + prev_bass * 0.3
        prev_mid = norm_mid * 0.7 + prev_mid * 0.3
        prev_treble = norm_treble * 0.7 + prev_treble * 0.3

        overall_energy = float(np.clip(np.mean(smoothed_bands) * 1.2, 0.0, 1.0))

        # Store rounded to 2 decimals to keep JSON concise
        frame_entry = [
            round(overall_energy, 2),
            round(norm_bass, 2),
            round(norm_mid, 2),
            round(norm_treble, 2),
            round(pulse, 2),
            [round(float(v), 2) for v in smoothed_bands]
        ]
        all_frames.append(frame_entry)

    out_path = 'src/config/audioAnalysis.json'
    with open(out_path, 'w') as f:
        json.dump({
            "fps": fps,
            "duration": round(duration, 3),
            "totalFrames": total_frames,
            "bandCount": n_bands,
            "frames": all_frames
        }, f)
    print(f"Saved audio analysis to {out_path} ({total_frames} frames).")

if __name__ == '__main__':
    analyze()
