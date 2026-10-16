import React, { useMemo } from 'react';
import { Img } from 'remotion';
import { PROJECT_CONFIG } from '../config/projectConfig';

interface BackgroundProps {
  frame: number;
  energy: number;
  bass: number;
}

export const BackgroundAtmosphere: React.FC<BackgroundProps> = ({
  frame,
  energy,
  bass,
}) => {
  const { media } = PROJECT_CONFIG;

  // 1. Subtle floating dust motes (25 delicate particles)
  const dustParticles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => {
      const seedX = (i * 137.5) % 1920;
      const seedY = (i * 223.7) % 1080;
      const size = 1.0 + (i % 3) * 0.8;
      const speed = 0.18 + (i % 4) * 0.1;
      const drift = Math.sin(i * 1.7) * 30;
      const baseAlpha = 0.14 + (i % 3) * 0.08;
      return { id: i, seedX, seedY, size, speed, drift, baseAlpha };
    });
  }, []);

  // 2. Subtle delicate twinkling stars (30 understated stars)
  const stars = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const x = (i * 197.3 + 73) % 1920;
      const y = (i * 149.9 + 41) % 550; // upper sky
      const size = 0.8 + (i % 3) * 0.6;
      const twinkleSpeed = 0.025 + (i % 4) * 0.015;
      const phase = (i * 1.3) % (Math.PI * 2);
      const baseBrightness = 0.18 + (i % 4) * 0.1;
      return { id: i, x, y, size, twinkleSpeed, phase, baseBrightness };
    });
  }, []);

  // Ambient breathing pulse
  const pulseIntensity = 0.25 + bass * 0.2;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        backgroundColor: '#04060b',
      }}
    >
      {/* ========================================================= */}
      {/* 1. Base Layer: User's Pre-Darkened Blurred Scenic PNG     */}
      {/* ========================================================= */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Img
          src={media.backgroundSrc}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />
      </div>

      {/* Ambient Singer Underglow (subtle warm backlight) */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '45%',
          height: '70%',
          background:
            'radial-gradient(ellipse at 45% 45%, rgba(213, 154, 85, 0.12) 0%, rgba(138, 101, 26, 0.03) 45%, transparent 75%)',
          filter: 'blur(50px)',
          opacity: pulseIntensity,
          transform: `scale(${1.0 + bass * 0.03})`,
          transition: 'transform 0.1s ease-out',
        }}
      />

      {/* ========================================================= */}
      {/* 4. Delicate Twinkling Stars in Night Sky                  */}
      {/* ========================================================= */}
      {stars.map((s) => {
        const twinkle = Math.sin(frame * s.twinkleSpeed + s.phase);
        const brightness = Math.max(0.06, s.baseBrightness + twinkle * 0.2);

        return (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              backgroundColor: '#fbf8ef',
              opacity: brightness,
              boxShadow: `0 0 ${s.size * 2}px rgba(246, 217, 124, ${brightness * 0.6})`,
            }}
          />
        );
      })}

      {/* ========================================================= */}
      {/* 5. Floating Golden Dust Motes & Granules                  */}
      {/* ========================================================= */}
      {dustParticles.map((p) => {
        const yPos = (p.seedY - frame * p.speed) % 1150;
        const normalizedY = yPos < -50 ? yPos + 1150 : yPos;
        const xOffset = Math.sin(frame * 0.02 + p.id) * p.drift;
        const posX = (p.seedX + xOffset) % 1920;
        const opacity = p.baseAlpha * (0.8 + energy * 0.3);

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: posX < 0 ? posX + 1920 : posX,
              top: normalizedY,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: '#ecd69d',
              opacity,
              boxShadow: `0 0 ${p.size * 2.5}px rgba(230, 190, 100, 0.5)`,
            }}
          />
        );
      })}

    </div>
  );
};
