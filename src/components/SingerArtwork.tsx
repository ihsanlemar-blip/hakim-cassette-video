import React from 'react';
import { Img } from 'remotion';

interface SingerArtworkProps {
  portraitSrc: string;
  bass: number;
  energy: number;
}

export const SingerArtwork: React.FC<SingerArtworkProps> = ({
  portraitSrc,
  bass,
  energy,
}) => {
  // Glow pulses in sync with bass energy
  const glowOpacity = 0.45 + bass * 0.45;
  const glowSpread = 22 + bass * 16;

  return (
    <div
      style={{
        position: 'relative',
        width: 330,
        height: 330,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Warm Golden Aura / Radial Halo illumination */}
      <div
        style={{
          position: 'absolute',
          inset: -15,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 50% 45%, rgba(246, 217, 124, 0.55) 0%, rgba(216, 169, 62, 0.35) 40%, rgba(138, 101, 26, 0.15) 65%, transparent 80%)',
          filter: `blur(${glowSpread}px)`,
          opacity: glowOpacity,
          transform: `scale(${1 + bass * 0.06})`,
          transition: 'all 0.08s ease-out',
        }}
      />

      {/* Decorative Golden Arched Oval Border */}
      <div
        style={{
          position: 'absolute',
          width: 290,
          height: 320,
          borderRadius: '145px 145px 20px 20px',
          border: '1.5px solid rgba(216, 169, 62, 0.5)',
          boxShadow: `0 0 16px rgba(216, 169, 62, ${0.25 + bass * 0.25}), inset 0 0 15px rgba(216, 169, 62, 0.15)`,
          background:
            'linear-gradient(145deg, rgba(22, 27, 36, 0.75) 0%, rgba(10, 13, 18, 0.92) 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Subtle geometric star watermark inside portrait arch */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.07,
            backgroundImage:
              'radial-gradient(#d8a93e 1px, transparent 1px), radial-gradient(#d8a93e 1px, transparent 1px)',
            backgroundSize: '18px 18px',
            backgroundPosition: '0 0, 9px 9px',
          }}
        />

        {/* Inner gold rim highlight */}
        <div
          style={{
            position: 'absolute',
            inset: 3,
            borderRadius: '142px 142px 17px 17px',
            border: '1px solid rgba(246, 217, 124, 0.3)',
          }}
        />
      </div>

      {/* Hakim Jan Faryadi Portrait - Clean Cutout with no black rectangular background */}
      <div
        style={{
          position: 'relative',
          width: 300,
          height: 330,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          overflow: 'hidden',
          zIndex: 2,
          // Smooth blend at bottom into label
          maskImage:
            'linear-gradient(to bottom, black 0%, black 82%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, black 82%, transparent 100%)',
        }}
      >
        <Img
          src={portraitSrc}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center bottom',
            filter: `drop-shadow(0 0 ${12 + bass * 8}px rgba(246, 217, 124, ${0.4 + bass * 0.3})) drop-shadow(0 6px 14px rgba(0, 0, 0, 0.85))`,
            transform: `scale(${1.0 + bass * 0.015})`,
            transition: 'transform 0.08s ease-out',
          }}
        />
      </div>
    </div>
  );
};
