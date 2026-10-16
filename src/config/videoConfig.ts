import { staticFile } from 'remotion';

export interface VideoConfig {
  artist: {
    pashto: string;
    english: string;
  };
  song: {
    pashtoTitle: string;
    englishTitle: string;
    sublabel: string;
  };
  media: {
    audioSrc: string;
    portraitSrc: string;
    subtitlesSrc: string;
  };
  dimensions: {
    width: number;
    height: number;
    fps: number;
    durationInSeconds: number;
    durationInFrames: number;
  };
  theme: {
    colors: {
      bgDark: string;
      bgMid: string;
      cassetteBody: string;
      cassetteBevel: string;
      cassetteLabel: string;
      goldPrimary: string;
      goldLight: string;
      goldGlow: string;
      goldDark: string;
      textLight: string;
      textMuted: string;
      accentBlue: string;
    };
  };
  animation: {
    yawDegrees: number;
    pitchDegrees: number;
    rollDegrees: number;
    maxBassPulseScale: number;
    goldGlowIntensity: number;
    spectrumBars: number;
  };
}

export const VIDEO_CONFIG: VideoConfig = {
  artist: {
    pashto: 'حکیم جان فریادي',
    english: 'Hakim Jan Faryadi',
  },
  song: {
    pashtoTitle: 'غمجنې سترګې',
    englishTitle: 'Ghamjane Stargi',
    sublabel: 'Afghan Nostalgic Cassette Edition • High Fidelity Stereo',
  },
  media: {
    audioSrc: staticFile('ghamjani_stargi.mp3'),
    portraitSrc: staticFile('hakim_portrait.png'),
    subtitlesSrc: staticFile('Extracted_CapCut_Pashto_Subtitles.srt'),
  },
  dimensions: {
    width: 1920,
    height: 1080,
    fps: 30,
    durationInSeconds: 395.74,
    durationInFrames: 11873,
  },
  theme: {
    colors: {
      bgDark: '#04060b',
      bgMid: '#0a0e18',
      cassetteBody: '#121418',
      cassetteBevel: '#262930',
      cassetteLabel: '#0d1017',
      goldPrimary: '#d8a93e',
      goldLight: '#f6d97c',
      goldGlow: 'rgba(216, 169, 62, 0.45)',
      goldDark: '#8a651a',
      textLight: '#fbf9f3',
      textMuted: '#b0a99a',
      accentBlue: '#152438',
    },
  },
  animation: {
    yawDegrees: 8.5,
    pitchDegrees: 2.5,
    rollDegrees: 1.2,
    maxBassPulseScale: 1.035,
    goldGlowIntensity: 1.0,
    spectrumBars: 36,
  },
};
