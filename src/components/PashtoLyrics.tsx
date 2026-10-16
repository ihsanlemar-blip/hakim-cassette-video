import React from 'react';
import { getActiveSubtitle, VERIFIED_SUBTITLES, SubtitleCue } from '../utils/subtitles';
import { PROJECT_CONFIG } from '../config/projectConfig';

interface PashtoLyricsProps {
  frame: number;
  subtitles?: SubtitleCue[];
}

export const PashtoLyrics: React.FC<PashtoLyricsProps> = ({
  frame,
  subtitles = VERIFIED_SUBTITLES,
}) => {
  const { layout } = PROJECT_CONFIG;
  const { lyrics } = layout;

  const activeState = getActiveSubtitle(frame, subtitles);

  // If no cue is active (e.g. during instrumental gaps or intro/outro), do not render
  if (!activeState) {
    return null;
  }

  const { cue, opacity, translateY } = activeState;

  return (
    <div
      style={{
        position: 'absolute',
        right: lyrics.rightPx,
        bottom: lyrics.bottomPx,
        width: lyrics.widthPx,
        transform: `translateY(${translateY}px)`,
        opacity,
        zIndex: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        transition: 'opacity 0.08s ease-out, transform 0.08s ease-out',
      }}
    >
      {/* Frosted Glass Backdrop Pill */}
      <div
        dir="rtl"
        style={{
          maxWidth: '100%',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(13, 17, 25, 0.88) 0%, rgba(6, 8, 12, 0.94) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1.5px solid rgba(216, 169, 62, 0.38)',
          borderRadius: 36,
          padding: '14px 38px',
          boxShadow: `
            0 12px 32px rgba(0, 0, 0, 0.9),
            0 0 24px rgba(216, 169, 62, 0.18),
            inset 0 1px 1px rgba(255, 255, 255, 0.15)
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontFamily: lyrics.fontFamily,
            fontSize: lyrics.fontSizePx,
            fontWeight: 700,
            lineHeight: 1.45,
            letterSpacing: 0.5,
            color: '#fdfbf7',
            textShadow: `
              0 2px 4px rgba(0, 0, 0, 1),
              0 4px 14px rgba(0, 0, 0, 0.95),
              0 0 20px rgba(216, 169, 62, 0.35)
            `,
            whiteSpace: 'nowrap',
          }}
        >
          {cue.text}
        </span>
      </div>

      {/* Subtle cue indicator dot underneath */}
      <div
        style={{
          marginTop: 6,
          width: 28,
          height: 2,
          borderRadius: 1,
          background:
            'linear-gradient(90deg, transparent 0%, #d8a93e 50%, transparent 100%)',
          opacity: 0.75,
        }}
      />
    </div>
  );
};
