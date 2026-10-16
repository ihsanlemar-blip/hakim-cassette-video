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
    backgroundSrc: string;
    cassettePngSrc: string;
    customFontSrc: string;
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
      leftPercent: number; // ~3.5% from left
      bottomPx: number; // 0px
      widthPx: number; // ~920px (~48-52% of visual composition)
      heightPx: number; // ~1040px (~96% of screen)
      glowIntensity: number;
      breathingScale: number;
      floatingAmplitude: number;
    };
    cassette: {
      leftPx: number; // ~560px (beside singer)
      bottomPx: number; // ~115px
      widthPx: number; // ~350px (~18.2% of screen width)
      heightPx: number; // ~214px
      yawDegrees: number;
      pitchDegrees: number;
      rollDegrees: number;
      swayAmplitude: number;
      bassPulseScale: number;
    };
    cassetteTitle: {
      leftPx: number;
      bottomPx: number;
      widthPx: number;
      heightPx: number;
      text: string;
    };
    spectrum: {
      rightPx: number; // ~70px
      bottomPx: number; // ~90px
      widthPx: number; // ~860px
      heightPx: number; // ~165px
      barCount: number;
      sensitivity: number;
    };
    lyrics: {
      rightPx: number; // ~70px
      bottomPx: number; // ~285px
      widthPx: number; // ~860px
      fontSizePx: number;
      fontFamily: string;
    };
    camera: {
      enabled: boolean;
      maxShakePx: number; // 3.2px
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
    };
  };
}

export const PROJECT_CONFIG: ProjectConfig = {
  artist: {
    pashto: 'حکیم جان فریادي',
    english: 'Hakim Jan Faryadi',
  },
  song: {
    pashtoTitle: 'غمچنې سترګې سندره',
    englishTitle: 'Ghamjane Stargi',
    sublabel: 'Afghan Nostalgic Edition • High Fidelity Stereo',
    edition: 'EXCLUSIVE CASSETTE ARCHIVE',
  },
  media: {
    audioSrc: staticFile('ghamjani_stargi.mp3'),
    portraitSrc: staticFile('hakim_portrait.png'),
    subtitlesSrc: staticFile('Extracted_CapCut_Pashto_Subtitles.srt'),
    backgroundSrc: staticFile('Hakim_Jan_Blackish_Blurred_Background_1920x1080.png'),
    cassettePngSrc: staticFile('Hakim_Jan_Cassette_English_Only_Transparent.png'),
    customFontSrc: staticFile('fonts/Bahij Nazanin-Regular.ttf'),
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
      leftPx: 560, // Beside the singer
      bottomPx: 115, // Lifted slightly for title badge below
      widthPx: 350, // 18.2% of 1920 frame width
      heightPx: 214,
      yawDegrees: 6.5,
      pitchDegrees: 2.5,
      rollDegrees: 1.2,
      swayAmplitude: 4,
      bassPulseScale: 1.025,
    },
    cassetteTitle: {
      leftPx: 560, // Centered below cassette
      bottomPx: 48,
      widthPx: 350,
      heightPx: 48,
      text: 'غمچنې سترګې سندره',
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
      fontSizePx: 48,
      fontFamily: "'Bahij Nazanin', 'Noto Naskh Arabic Local', 'Noto Naskh Arabic', sans-serif",
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
      bgMidnight: '#04060b',
      bgNavy: '#080d18',
      bgCharcoal: '#0a0d14',
      goldPrimary: '#d8a93e',
      goldLight: '#f6d97c',
      goldGlow: 'rgba(216, 169, 62, 0.45)',
      goldDark: '#8a651a',
      textLight: '#fbf8f0',
      textMuted: '#b0a99a',
      accentTeal: '#152438',
    },
  },
};
