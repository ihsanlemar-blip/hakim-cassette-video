import React from 'react';
import { PROJECT_CONFIG } from '../config/projectConfig';

interface CassetteTitleBadgeProps {
  frame: number;
  bass: number;
  pulse: number;
}

export const CassetteTitleBadge: React.FC<CassetteTitleBadgeProps> = ({
  bass,
  pulse,
}) => {
  const { layout, song } = PROJECT_CONFIG;
  const { cassetteTitle } = layout;

  // Audio-reactive scale and glow
  const scale = 1.0 + pulse * 0.015;
  const glowAlpha = 0.2 + bass * 0.28;
  const borderAlpha = 0.38 + bass * 0.25;

  return (
    <div
      style={{
        position: 'absolute',
        left: cassetteTitle.leftPx,
        bottom: cassetteTitle.bottomPx,
        width: cassetteTitle.widthPx,
        height: cassetteTitle.heightPx,
        zIndex: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${scale})`,
        transition: 'transform 0.06s ease-out',
        pointerEvents: 'none',
      }}
    >
      {/* 
        Refined Glassmorphic Pill Container (Background "bg")
        - Radial dark navy/charcoal gradient
        - High-grade backdrop blur
        - Precision 24kt gold border with dynamic bass reactivity
        - Soft ambient gold drop-shadow
      */}
      <div
        dir="rtl"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 22px',
          borderRadius: 28,
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(13, 20, 32, 0.90) 0%, rgba(6, 10, 16, 0.95) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: `1.5px solid rgba(216, 169, 62, ${borderAlpha})`,
          boxShadow: `
            0 10px 24px rgba(0, 0, 0, 0.88),
            0 0 ${12 + bass * 14}px rgba(216, 169, 62, ${glowAlpha}),
            inset 0 1px 1px rgba(255, 255, 255, 0.15)
          `,
        }}
      >
        {/* Subtle decorative gold side accent */}
        <span
          style={{
            color: '#d8a93e',
            fontSize: 14,
            opacity: 0.75 + bass * 0.25,
            marginLeft: 14,
            textShadow: '0 0 8px rgba(216, 169, 62, 0.5)',
          }}
        >
          ✦
        </span>

        {/* Main Song Title Text in Custom Pashto Font */}
        <span
          style={{
            fontFamily: "'Bahij Nazanin', 'Noto Naskh Arabic Local', 'Noto Naskh Arabic', sans-serif",
            fontSize: 29,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: 0.5,
            background:
              'linear-gradient(135deg, #ffffff 0%, #fae8be 45%, #d8a93e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: `drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 ${6 + bass * 8}px rgba(216, 169, 62, 0.35))`,
          }}
        >
          {cassetteTitle.text || song.pashtoTitle}
        </span>

        {/* Subtle decorative gold side accent */}
        <span
          style={{
            color: '#d8a93e',
            fontSize: 12,
            opacity: 0.75 + bass * 0.25,
            marginRight: 12,
            textShadow: '0 0 8px rgba(216, 169, 62, 0.5)',
          }}
        >
          ✦
        </span>
      </div>
    </div>
  );
};
