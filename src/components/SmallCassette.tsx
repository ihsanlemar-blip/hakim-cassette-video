import React from 'react';
import { Img } from 'remotion';
import { PROJECT_CONFIG } from '../config/projectConfig';

interface SmallCassetteProps {
  frame: number;
  totalFrames: number;
  energy: number;
  bass: number;
  pulse: number;
}

export const SmallCassette: React.FC<SmallCassetteProps> = ({
  frame,
  bass,
  pulse,
}) => {
  const { media, layout } = PROJECT_CONFIG;
  const { cassette } = layout;

  const fps = 30;

  // Gentle 3D sway cycles (independent from singer)
  const yaw = Math.sin((frame * 2 * Math.PI) / (fps * 12)) * cassette.yawDegrees;
  const pitch = Math.cos((frame * 2 * Math.PI) / (fps * 9)) * cassette.pitchDegrees;
  const roll = Math.sin((frame * 2 * Math.PI) / (fps * 15)) * cassette.rollDegrees;

  // Subtle hovering
  const hoverY = Math.sin((frame * 2 * Math.PI) / (fps * 7)) * cassette.swayAmplitude;

  // Music reactivity (micro-pulse scale 1.00 - 1.025)
  const scale = 1.0 + pulse * (cassette.bassPulseScale - 1.0);

  // Subtle dynamic gold edge illumination
  const edgeGlow = 0.25 + bass * 0.3;

  return (
    <div
      style={{
        position: 'absolute',
        left: cassette.leftPx,
        bottom: cassette.bottomPx,
        width: cassette.widthPx,
        height: cassette.heightPx,
        zIndex: 15, // Beside singer, in front of background
        transform: `perspective(900px) translateY(${hoverY}px) rotateY(${yaw}deg) rotateX(${pitch}deg) rotateZ(${roll}deg) scale(${scale})`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.06s ease-out',
        pointerEvents: 'none',
      }}
    >
      {/* 
        Clean, authentic navy-and-gold cassette PNG (Hakim_Jan_Cassette_English_Only_Transparent.png)
        - Transparent background
        - Realistic cassette details & English name HAKIM JAN FARYADI already embedded
        - No added singer photo, no added Pashto names, no duplicate text
      */}
      <Img
        src={media.cassettePngSrc}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: `
            drop-shadow(0 16px 32px rgba(0, 0, 0, 0.95))
            drop-shadow(0 0 ${12 + bass * 12}px rgba(216, 169, 62, ${edgeGlow * 0.45}))
          `,
        }}
      />
    </div>
  );
};
