import React from 'react';
import { PROJECT_CONFIG } from '../config/projectConfig';

interface SongBrandingProps {
  bass: number;
}

export const SongBranding: React.FC<SongBrandingProps> = ({ bass }) => {
  const { artist, song, layout } = PROJECT_CONFIG;
  const { branding } = layout;

  return (
    <div
      style={{
        position: 'absolute',
        top: branding.topPx,
        right: branding.rightPx,
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        pointerEvents: 'none',
      }}
    >
      {/* Pashto Artist Name */}
      <div
        dir="rtl"
        style={{
          fontFamily: "'Noto Naskh Arabic Local', 'Noto Naskh Arabic', sans-serif",
          fontSize: 32,
          fontWeight: 700,
          lineHeight: 1.2,
          background:
            'linear-gradient(135deg, #ffffff 0%, #f7dc96 40%, #d8a93e 80%, #b58524 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: `drop-shadow(0 2px 8px rgba(0,0,0,0.9)) drop-shadow(0 0 ${8 + bass * 8}px rgba(216, 169, 62, 0.3))`,
        }}
      >
        {artist.pashto}
      </div>

      {/* Pashto Song Title */}
      <div
        dir="rtl"
        style={{
          fontFamily: "'Noto Naskh Arabic Local', 'Noto Naskh Arabic', sans-serif",
          fontSize: 22,
          fontWeight: 600,
          color: '#edd7a1',
          textShadow: '0 2px 6px rgba(0,0,0,0.85)',
          marginTop: 2,
        }}
      >
        {song.pashtoTitle}
      </div>

      {/* Gold Filigree Accent Line */}
      <div
        style={{
          width: 190,
          height: 1.5,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(216, 169, 62, 0.8) 50%, rgba(246, 217, 124, 0.3) 100%)',
          margin: '6px 0',
        }}
      />

      {/* English Branding & Edition Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 10,
          fontWeight: 600,
          color: '#b0a99a',
          letterSpacing: 1.8,
          textTransform: 'uppercase',
        }}
      >
        <span>{artist.english}</span>
        <span style={{ color: '#d8a93e' }}>•</span>
        <span style={{ color: '#f6d97c' }}>HIGH FIDELITY STEREO</span>
      </div>
    </div>
  );
};
