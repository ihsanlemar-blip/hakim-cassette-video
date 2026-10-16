import React, { useMemo } from 'react';
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
  const { theme } = PROJECT_CONFIG;
  const { colors } = theme;

  // 1. Deterministic floating dust motes (35 particles)
  const dustParticles = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => {
      const seedX = (i * 137.5) % 1920;
      const seedY = (i * 223.7) % 1080;
      const size = 1.2 + (i % 4) * 1.0;
      const speed = 0.22 + (i % 5) * 0.12;
      const drift = Math.sin(i * 1.7) * 35;
      const baseAlpha = 0.18 + (i % 4) * 0.1;
      return { id: i, seedX, seedY, size, speed, drift, baseAlpha };
    });
  }, []);

  // 2. Deterministic subtle twinkling stars (45 delicate stars)
  const stars = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => {
      const x = ((i * 197.3 + 73) % 1920);
      const y = ((i * 149.9 + 41) % 650); // mostly in upper 60% of frame
      const size = 1.0 + (i % 3) * 0.7;
      const twinkleSpeed = 0.03 + (i % 4) * 0.02;
      const phase = (i * 1.3) % (Math.PI * 2);
      const baseBrightness = 0.2 + (i % 5) * 0.12;
      return { id: i, x, y, size, twinkleSpeed, phase, baseBrightness };
    });
  }, []);

  // 3. Deterministic soft golden bokeh circles (6 elegant bokeh orbs)
  const bokehOrbs = useMemo(() => {
    return [
      { id: 1, x: 280, y: 320, size: 260, baseAlpha: 0.07, speed: 0.015 },
      { id: 2, x: 750, y: 680, size: 340, baseAlpha: 0.05, speed: 0.012 },
      { id: 3, x: 1250, y: 240, size: 280, baseAlpha: 0.06, speed: 0.018 },
      { id: 4, x: 1650, y: 720, size: 380, baseAlpha: 0.04, speed: 0.01 },
      { id: 5, x: 500, y: 180, size: 220, baseAlpha: 0.05, speed: 0.02 },
      { id: 6, x: 1400, y: 520, size: 300, baseAlpha: 0.05, speed: 0.014 },
    ];
  }, []);

  // Ambient breathing pulse
  const pulseIntensity = 0.35 + bass * 0.3;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        backgroundColor: colors.bgMidnight,
      }}
    >
      {/* ========================================================= */}
      {/* LAYER A — Cinematic Base Midnight Blue & Navy Gradient    */}
      {/* ========================================================= */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 45%, #101D32 0%, #081323 50%, #050912 85%, #020408 100%)',
        }}
      />

      {/* ========================================================= */}
      {/* LAYER B — Warm Amber Singer Light & Center Glow           */}
      {/* ========================================================= */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '55%',
          height: '75%',
          background:
            'radial-gradient(ellipse at 45% 45%, rgba(213, 154, 85, 0.16) 0%, rgba(138, 101, 26, 0.07) 45%, transparent 75%)',
          filter: 'blur(70px)',
          opacity: pulseIntensity,
          transform: `scale(${1.0 + bass * 0.04})`,
          transition: 'transform 0.1s ease-out',
        }}
      />

      {/* Right side subtle ambiance for lyrics / spectrum balance */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          right: '8%',
          width: '45%',
          height: '65%',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(21, 36, 56, 0.35) 0%, rgba(8, 19, 35, 0.15) 50%, transparent 75%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ========================================================= */}
      {/* LAYER C — Subtle Afghan Geometric Rosette Watermark       */}
      {/* ========================================================= */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.032,
          mixBlendMode: 'screen',
        }}
        viewBox="0 0 1920 1080"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="afghanLattice"
            width="160"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 15 L 98 62 L 145 80 L 98 98 L 80 145 L 62 98 L 15 80 L 62 62 Z"
              fill="none"
              stroke="#d8a93e"
              strokeWidth="1.2"
            />
            <circle cx="80" cy="80" r="32" fill="none" stroke="#d8a93e" strokeWidth="0.8" />
            <circle
              cx="80"
              cy="80"
              r="54"
              fill="none"
              stroke="#d8a93e"
              strokeWidth="0.5"
              strokeDasharray="3 3"
            />
            <path
              d="M 0 0 L 30 30 M 160 0 L 130 30 M 0 160 L 30 130 M 160 160 L 130 130"
              stroke="#d8a93e"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="1920" height="1080" fill="url(#afghanLattice)" />
      </svg>

      {/* ========================================================= */}
      {/* LAYER D — Delicate Twinkling Stars                        */}
      {/* ========================================================= */}
      {stars.map((s) => {
        const twinkle = Math.sin(frame * s.twinkleSpeed + s.phase);
        const brightness = Math.max(0.08, s.baseBrightness + twinkle * 0.25);

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
              boxShadow: `0 0 ${s.size * 3}px rgba(246, 217, 124, ${brightness * 0.8})`,
            }}
          />
        );
      })}

      {/* ========================================================= */}
      {/* LAYER E — Floating Dust Motes & Granules                  */}
      {/* ========================================================= */}
      {dustParticles.map((p) => {
        const yPos = (p.seedY - frame * p.speed) % 1150;
        const normalizedY = yPos < -50 ? yPos + 1150 : yPos;
        const xOffset = Math.sin(frame * 0.02 + p.id) * p.drift;
        const posX = (p.seedX + xOffset) % 1920;
        const opacity = p.baseAlpha * (0.85 + energy * 0.35);

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
              backgroundColor: '#edd8a4',
              opacity,
              boxShadow: `0 0 ${p.size * 3}px rgba(230, 190, 100, 0.65)`,
            }}
          />
        );
      })}

      {/* ========================================================= */}
      {/* LAYER F — Soft Out-of-Focus Golden Bokeh Highlights       */}
      {/* ========================================================= */}
      {bokehOrbs.map((b) => {
        const floatY = Math.sin(frame * b.speed + b.id) * 15;
        const alpha = b.baseAlpha * (0.8 + bass * 0.4);

        return (
          <div
            key={b.id}
            style={{
              position: 'absolute',
              left: b.x,
              top: b.y + floatY,
              width: b.size,
              height: b.size,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(230, 193, 138, 0.35) 0%, rgba(213, 154, 85, 0.12) 50%, transparent 75%)',
              filter: 'blur(35px)',
              opacity: alpha,
            }}
          />
        );
      })}

      {/* ========================================================= */}
      {/* LAYER G — Volumetric Light Shafts (Subtle Angled Rays)   */}
      {/* ========================================================= */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          left: '10%',
          width: 800,
          height: 1500,
          background:
            'linear-gradient(115deg, transparent 35%, rgba(216, 169, 62, 0.025) 45%, rgba(246, 217, 124, 0.045) 50%, rgba(216, 169, 62, 0.025) 55%, transparent 65%)',
          transform: 'rotate(-18deg)',
          opacity: 0.7 + bass * 0.3,
          pointerEvents: 'none',
        }}
      />

      {/* Cinematic Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(2, 3, 5, 0.65) 85%, rgba(0, 1, 2, 0.92) 100%)',
        }}
      />
    </div>
  );
};
