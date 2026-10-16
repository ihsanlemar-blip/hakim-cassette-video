import React from 'react';

interface SingerBackGlowProps {
  bass: number;
  energy: number;
}

export const SingerBackGlow: React.FC<SingerBackGlowProps> = ({ bass, energy }) => {
  // Controlled glow pulsing in sync with music
  const dynamicHaloOpacity = 0.55 + bass * 0.35;
  const dynamicHaloSpread = 50 + bass * 25;
  const dynamicRimOpacity = 0.45 + energy * 0.3;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {/* 1. Large Diffused Ambient Halo behind upper torso and head */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '25%',
          width: 580,
          height: 620,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 50% 45%, rgba(246, 217, 124, 0.45) 0%, rgba(216, 169, 62, 0.3) 38%, rgba(138, 101, 26, 0.12) 65%, transparent 80%)',
          filter: `blur(${dynamicHaloSpread}px)`,
          opacity: dynamicHaloOpacity,
          transform: `scale(${1.0 + bass * 0.06})`,
          transition: 'all 0.08s ease-out',
        }}
      />

      {/* 2. Concentrated Golden Halo directly behind head */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '32%',
          width: 380,
          height: 380,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 50% 50%, rgba(255, 240, 190, 0.5) 0%, rgba(216, 169, 62, 0.35) 45%, transparent 75%)',
          filter: 'blur(35px)',
          opacity: 0.65 + bass * 0.3,
          transform: `scale(${1.0 + bass * 0.04})`,
        }}
      />

      {/* 3. Soft Rim Light along shoulders and hair contour */}
      <div
        style={{
          position: 'absolute',
          top: '22%',
          left: '18%',
          width: 680,
          height: 520,
          borderRadius: '45%',
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(216, 169, 62, 0.28) 0%, rgba(160, 110, 30, 0.1) 50%, transparent 75%)',
          filter: 'blur(45px)',
          opacity: dynamicRimOpacity,
        }}
      />

      {/* 4. Warm Floor Atmospheric Reflection under the seated singer */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '10%',
          width: 780,
          height: 240,
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(216, 169, 62, 0.2) 0%, rgba(10, 15, 25, 0.6) 65%, transparent 85%)',
          filter: 'blur(40px)',
          opacity: 0.7 + bass * 0.25,
        }}
      />
    </div>
  );
};
