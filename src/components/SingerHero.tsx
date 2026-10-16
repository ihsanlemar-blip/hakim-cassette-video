import React from 'react';
import { Img } from 'remotion';
import { SingerBackGlow } from './SingerBackGlow';
import { PROJECT_CONFIG } from '../config/projectConfig';

interface SingerHeroProps {
  frame: number;
  bass: number;
  energy: number;
}

export const SingerHero: React.FC<SingerHeroProps> = ({ frame, bass, energy }) => {
  const { layout, media } = PROJECT_CONFIG;
  const { singer } = layout;

  const fps = 30;

  // 1. Slow, dignified floating hover (45 frame cycle ~ 1.5s wave, gentle 5-6px amplitude)
  const hoverY = Math.sin((frame * 2 * Math.PI) / (fps * 7.5)) * singer.floatingAmplitude;

  // 2. Micro-scale breathing: subtle 0.3% breath cycle + 0.6% music bass response
  const breath = Math.sin((frame * 2 * Math.PI) / (fps * 5.0)) * 0.003;
  const musicPulse = bass * singer.breathingScale;
  const currentScale = 1.0 + breath + musicPulse;

  // 3. Subtle horizontal sway / parallax (12-second cycle)
  const swayX = Math.sin((frame * 2 * Math.PI) / (fps * 12)) * 3;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${singer.leftPercent}%`,
        bottom: singer.bottomPx,
        width: singer.widthPx,
        height: singer.heightPx,
        zIndex: 5,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Multi-layered cinematic back glow (warm halo, rim lighting) */}
      <SingerBackGlow bass={bass} energy={energy} />

      {/* Hero Singer Cutout with dignified motion */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          transform: `translate(${swayX}px, ${hoverY}px) scale(${currentScale})`,
          transformOrigin: 'center bottom',
          transition: 'transform 0.08s ease-out',
          zIndex: 2,
          // Clean fade mask at the bottom edge to blend into deep blue environment seamlessly
          maskImage:
            'linear-gradient(to bottom, black 0%, black 86%, rgba(0,0,0,0.4) 94%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, black 86%, rgba(0,0,0,0.4) 94%, transparent 100%)',
        }}
      >
        <Img
          src={media.portraitSrc}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center bottom',
            filter: `
              drop-shadow(0 0 ${16 + bass * 12}px rgba(216, 169, 62, ${0.35 + bass * 0.25}))
              drop-shadow(0 20px 40px rgba(0, 0, 0, 0.95))
            `,
          }}
        />
      </div>
    </div>
  );
};
