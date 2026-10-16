import { parseSrt } from '@remotion/captions';
import precomputedSubtitles from '../config/subtitles.json';

export interface SubtitleCue {
  id: number;
  startMs: number;
  endMs: number;
  startFrame: number;
  endFrame: number;
  durationFrames: number;
  text: string;
}

export interface ActiveSubtitleState {
  cue: SubtitleCue;
  opacity: number;
  translateY: number;
  progress: number;
}

/**
 * Parses raw SRT string content using @remotion/captions parseSrt.
 */
export function parseSrtContent(rawSrt: string, fps: number = 30): SubtitleCue[] {
  try {
    const { captions } = parseSrt({ input: rawSrt });
    return captions.map((c, index) => {
      const startFrame = Math.round((c.startMs / 1000) * fps);
      const endFrame = Math.round((c.endMs / 1000) * fps);
      return {
        id: index + 1,
        startMs: c.startMs,
        endMs: c.endMs,
        startFrame,
        endFrame,
        durationFrames: Math.max(1, endFrame - startFrame),
        text: c.text.trim(),
      };
    });
  } catch (err) {
    console.warn('Failed to parse runtime SRT, using verified precomputed subtitles', err);
    return precomputedSubtitles as SubtitleCue[];
  }
}

export const VERIFIED_SUBTITLES: SubtitleCue[] = precomputedSubtitles as SubtitleCue[];

/**
 * Returns the currently active subtitle cue at the given frame,
 * along with smooth fade/slide transitions that strictly respect cue boundaries.
 * Returns null if the frame falls during an instrumental gap.
 */
export function getActiveSubtitle(
  frame: number,
  subtitles: SubtitleCue[] = VERIFIED_SUBTITLES
): ActiveSubtitleState | null {
  // Find active cue
  const active = subtitles.find(
    (c) => frame >= c.startFrame && frame <= c.endFrame
  );

  if (!active) {
    return null;
  }

  const elapsed = frame - active.startFrame;
  const remaining = active.endFrame - frame;
  const total = active.durationFrames;

  // Transition window: 5 frames fade in, 5 frames fade out (or 20% of duration if very short)
  const fadeWindow = Math.min(6, Math.floor(total * 0.25));

  let fadeIn = 1;
  let translateY = 0;
  if (elapsed < fadeWindow && fadeWindow > 0) {
    fadeIn = elapsed / fadeWindow;
    translateY = (1 - fadeIn) * 6; // subtle 6px slide upward into place
  }

  let fadeOut = 1;
  if (remaining < fadeWindow && fadeWindow > 0) {
    fadeOut = remaining / fadeWindow;
  }

  const opacity = Math.min(fadeIn, fadeOut);
  const progress = total > 0 ? elapsed / total : 0;

  return {
    cue: active,
    opacity: Math.max(0, Math.min(1, opacity)),
    translateY,
    progress,
  };
}
