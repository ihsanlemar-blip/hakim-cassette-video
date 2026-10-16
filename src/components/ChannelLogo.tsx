import React from 'react';
import { Img, staticFile } from 'remotion';

interface ChannelLogoProps {
  frame?: number;
}

export const ChannelLogo: React.FC<ChannelLogoProps> = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 35,
        left: 45,
        zIndex: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 8px rgba(216, 169, 62, 0.25))',
      }}
    >
      <Img
        src={staticFile('HJ_Logo.png')}
        style={{
          width: 170,
          height: 'auto',
          objectFit: 'contain',
          opacity: 0.95,
        }}
      />
    </div>
  );
};
