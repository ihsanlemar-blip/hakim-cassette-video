import { staticFile } from 'remotion';

export interface ProjectConfig {
  artist: {
    pashto: string;
    english: string;
  };
  song: {
    pashtoTitle: string;
    englishTitle: string;
    sublabel: string;
    edition: string;
  };
  media: {
    audioSrc: string;
    portraitSrc: string;
    subtitlesSrc: string;
    cassetteTextureSrc?: string;
  };
  dimensions: {
    width: number;
    height: number;
    fps: number;
    durationInSeconds: number;
    durationInFrames: number;
  };
  layout: {
    singer: {
      leftPercent: number; // ~4% from left
      bottomPx: number; // 0px
      widthPx: number; // ~920px (~48% of screen)
      heightPx: number; // ~1040px (~96% of screen)
      glowIntensity: number;
      breathingScale: number;
      floatingAmplitude: number;
    };
    cassette: {
      leftPx: number; // ~540px (near singer transition)
      bottomPx: number; // ~85px
      widthPx: number; // ~360px (~18.75% of screen width)
      heightPx: number; // ~215px
      yawDegrees: number;
      pitchDegrees: number;
      rollDegrees: number;
      swayAmplitude: number;
      bassPulseScale: number;
    };
    spectrum: {
      rightPx: number; // ~70px
      bottomPx: number; // ~90px
      widthPx: number; // ~860px
      heightPx: number; // ~170px
      barCount: number;
      sensitivity: number;
    };
    lyrics: {
      rightPx: number; // ~70px
      bottomPx: number; // ~290px
      widthPx: number; // ~860px
      fontSizePx: number;
      fontFamily: string;
    };
    branding: {
      rightPx: number; // ~70px
      topPx: number; // ~60px
    };
    camera: {
      enabled: boolean;
      maxShakePx: number; // 3.5px
      zoomBreathing: number; // 1.006
      rotationShakeDeg: number; // 0.12deg
      canvasOversize: number; // 1.05 (105% to avoid black borders)
    };
  };
  theme: {
    colors: {
      bgMidnight: string;
      bgNavy: string;
      bgCharcoal: string;
      goldPrimary: string;
      goldLight: string;
      goldGlow: string;
      goldDark: string;
      textLight: string;
      textMuted: string;
      accentTeal: string;
      cassetteBody: string;
      cassetteBevel: string;
    };
  };
}

export const PROJECT_CONFIG: ProjectConfig = {
  artist: {
    pashto: 'حکیم جان فریادي',
    english: 'Hakim Jan Faryadi',
  },
  song: {
    pashtoTitle: 'غمجنې سترګې',
    englishTitle: 'Ghamjane Stargi',
    sublabel: 'Afghan Nostalgic Edition • High Fidelity Stereo',
    edition: 'EXCLUSIVE CASSETTE ARCHIVE',
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
  layout: {
    singer: {
      leftPercent: 3.5, // 3.5% from left edge
      bottomPx: 0,
      widthPx: 920, // ~48-52% visual prominence
      heightPx: 1040,
      glowIntensity: 1.0,
      breathingScale: 0.008,
      floatingAmplitude: 6,
    },
    cassette: {
      leftPx: 560, // Floating tastefully near singer
      bottomPx: 90,
      widthPx: 360, // Exactly 18.75% of 1920 frame width
      heightPx: 216,
      yawDegrees: 7.5,
      pitchDegrees: 2.8,
      rollDegrees: 1.2,
      swayAmplitude: 4,
      bassPulseScale: 1.025,
    },
    spectrum: {
      rightPx: 70,
      bottomPx: 90,
      widthPx: 860,
      heightPx: 165,
      barCount: 36,
      sensitivity: 1.0,
    },
    lyrics: {
      rightPx: 70,
      bottomPx: 285,
      widthPx: 860,
      fontSizePx: 46,
      fontFamily: "'Noto Naskh Arabic Local', 'Noto Naskh Arabic', sans-serif",
    },
    branding: {
      rightPx: 70,
      topPx: 60,
    },
    camera: {
      enabled: true,
      maxShakePx: 3.2,
      zoomBreathing: 1.006,
      rotationShakeDeg: 0.12,
      canvasOversize: 1.05,
    },
  },
  theme: {
    colors: {
      bgMidnight: '#081323',
      bgNavy: '#101D32',
      bgCharcoal: '#0a0d14',
      goldPrimary: '#d8a93e',
      goldLight: '#f6d97c',
      goldGlow: 'rgba(216, 169, 62, 0.45)',
      goldDark: '#8a651a',
      textLight: '#fbf8f0',
      textMuted: '#b0a99a',
      accentTeal: '#152438',
      cassetteBody: '#121418',
      cassetteBevel: '#262930',
    },
  },
};
