import { useAudioData, visualizeAudio } from '@remotion/media-utils';
import audioJson from '../config/audioAnalysis.json';

export interface AudioFrameAnalysis {
  energy: number;
  bass: number;
  mid: number;
  treble: number;
  pulse: number;
  bands: number[];
}

const totalPrecomputed = audioJson.frames.length;

export function getPrecomputedAudioFrame(frame: number): AudioFrameAnalysis {
  const safeFrame = Math.max(0, Math.min(frame, totalPrecomputed - 1));
  const raw = audioJson.frames[safeFrame];
  if (!raw) {
    return {
      energy: 0,
      bass: 0,
      mid: 0,
      treble: 0,
      pulse: 0,
      bands: new Array(36).fill(0),
    };
  }

  return {
    energy: raw[0] as number,
    bass: raw[1] as number,
    mid: raw[2] as number,
    treble: raw[3] as number,
    pulse: raw[4] as number,
    bands: raw[5] as number[],
  };
}

/**
 * Audio hook that combines Remotion's native useAudioData + visualizeAudio
 * with precomputed high-precision STFT fallback.
 */
export function useAudioAnalysis(
  frame: number,
  fps: number,
  audioSrc: string,
  numberOfSamples: number = 36
): AudioFrameAnalysis {
  let remotionAudioData = null;
  try {
    remotionAudioData = useAudioData(audioSrc);
  } catch (err) {
    // If running in an environment without WebAudio decode support, fallback gracefully
    remotionAudioData = null;
  }

  const precomputed = getPrecomputedAudioFrame(frame);

  if (remotionAudioData) {
    try {
      const liveBands = visualizeAudio({
        audioData: remotionAudioData,
        frame,
        fps,
        numberOfSamples,
        smoothing: true,
      });

      // Calculate real-time bass/mid/treble/energy from Remotion's live bands
      const sliceBass = liveBands.slice(0, Math.floor(numberOfSamples * 0.2));
      const sliceMid = liveBands.slice(
        Math.floor(numberOfSamples * 0.2),
        Math.floor(numberOfSamples * 0.6)
      );
      const sliceTreble = liveBands.slice(Math.floor(numberOfSamples * 0.6));

      const avg = (arr: number[]) =>
        arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

      const liveBass = Math.min(1, avg(sliceBass) * 1.5);
      const liveMid = Math.min(1, avg(sliceMid) * 1.2);
      const liveTreble = Math.min(1, avg(sliceTreble) * 1.8);
      const liveEnergy = Math.min(1, avg(liveBands) * 1.4);

      return {
        energy: liveEnergy,
        bass: liveBass,
        mid: liveMid,
        treble: liveTreble,
        pulse: Math.max(liveBass, precomputed.pulse),
        bands: liveBands.map((v, i) => Math.max(v, precomputed.bands[i] || 0)),
      };
    } catch {
      return precomputed;
    }
  }

  return precomputed;
}
