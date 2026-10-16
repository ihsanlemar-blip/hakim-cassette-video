import React from 'react';
import { interpolate } from 'remotion';
import { PROJECT_CONFIG } from '../config/projectConfig';

interface IntroOutroProps {
  frame: number;
  totalFrames: number;
}

export const IntroOutro: React.FC<IntroOutroProps> = ({
  frame,
  totalFrames,
}) => {
  const { artist, song } = PROJECT_CONFIG;

  // Master Intro Fade-in from black during first 30 frames (0 to 1 second)
  const masterIntroFade = interpolate(frame, [0, 30], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Intro Title Banner: frames 20 to 180 (approx 0.7s to 6s)
  const introOpacity = interpolate(
    frame,
    [20, 45, 155, 180],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const introTranslateY = interpolate(
    frame,
    [20, 45, 155, 180],
    [-12, 0, 0, -8],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Outro: after last subtitle cue ends (around frame 11300 to 11873)
  const outroStart = 11300;
  const outroOpacity = interpolate(
    frame,
    [outroStart, outroStart + 35, totalFrames - 35, totalFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Final master fade to black over the last 30 frames
  const masterFadeToBlack = interpolate(
    frame,
    [totalFrames - 30, totalFrames],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <>
      {/* 1. Master Initial Reveal from Black (0-1s) */}
      {masterIntroFade > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#04060b',
            opacity: masterIntroFade,
            zIndex: 90,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* 2. Intro Title Banner (Top Center / Subtitle Area) */}
      {introOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 36,
            left: '50%',
            transform: `translateX(-50%) translateY(${introTranslateY}px)`,
            opacity: introOpacity,
            zIndex: 35,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              padding: '12px 36px',
              borderRadius: 30,
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(13, 17, 26, 0.94) 0%, rgba(6, 8, 14, 0.98) 100%)',
              border: '1.5px solid rgba(216, 169, 62, 0.45)',
              boxShadow:
                '0 12px 32px rgba(0, 0, 0, 0.85), 0 0 20px rgba(216, 169, 62, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div
              style={{
                width: 32,
                height: 1,
                background:
                  'linear-gradient(90deg, transparent, #d8a93e)',
              }}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <div
                dir="rtl"
                style={{
                  fontFamily: "'Noto Naskh Arabic Local', 'Noto Naskh Arabic', sans-serif",
                  fontSize: 26,
                  fontWeight: 700,
                  color: '#ffffff',
                  textShadow: '0 2px 6px rgba(0,0,0,0.9)',
                }}
              >
                {artist.pashto} • {song.pashtoTitle}
              </div>
              <div
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 2.2,
                  color: '#d8a93e',
                  textTransform: 'uppercase',
                }}
              >
                {artist.english} • OFFICIAL CASSETTE MUSIC VIDEO
              </div>
            </div>

            <div
              style={{
                width: 32,
                height: 1,
                background:
                  'linear-gradient(90deg, #d8a93e, transparent)',
              }}
            />
          </div>
        </div>
      )}

      {/* 3. Outro Concluding Banner (After Lyrics End) */}
      {outroOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: 54,
            right: 70,
            opacity: outroOpacity,
            zIndex: 35,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              padding: '16px 40px',
              borderRadius: 32,
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(13, 17, 26, 0.94) 0%, rgba(6, 8, 14, 0.98) 100%)',
              border: '1.5px solid rgba(216, 169, 62, 0.4)',
              boxShadow: '0 12px 36px rgba(0,0,0,0.9)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 4,
            }}
          >
            <div
              dir="rtl"
              style={{
                fontFamily: "'Noto Naskh Arabic Local', 'Noto Naskh Arabic', sans-serif",
                fontSize: 26,
                fontWeight: 700,
                color: '#ecd599',
              }}
            >
              حکیم جان فریادي — غمجنې سترګې
            </div>
            <div
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 2,
                color: '#a89f8f',
              }}
            >
              AFGHAN MUSIC ARCHIVE • THANKS FOR WATCHING
            </div>
          </div>
        </div>
      )}

      {/* 4. Final Master Fade To Black */}
      {masterFadeToBlack > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#000000',
            opacity: masterFadeToBlack,
            zIndex: 99,
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  );
};
