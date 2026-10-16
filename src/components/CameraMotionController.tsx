import React from 'react';
import { PROJECT_CONFIG } from '../config/projectConfig';

interface CameraMotionControllerProps {
  frame: number;
  energy: number;
  bass: number;
  pulse: number;
  children: React.ReactNode;
}

export const CameraMotionController: React.FC<CameraMotionControllerProps> = ({
  frame,
  energy,
  bass,
  pulse,
  children,
}) => {
  const { layout } = PROJECT_CONFIG;
  const { camera } = layout;

  if (!camera.enabled) {
    return <>{children}</>;
  }

  // 1. Slow, elegant harmonic ambient float
  const ambientX =
    Math.sin(frame * 0.014) * 1.6 + Math.cos(frame * 0.032) * 1.0;
  const ambientY =
    Math.cos(frame * 0.018) * 1.3 + Math.sin(frame * 0.038) * 0.8;

  // 2. Music-reactive impulse (deterministic harmonic response, not chaotic Math.random())
  const kickX = Math.sin(frame * 1.618) * 1.8 * bass;
  const kickY = Math.cos(frame * 2.14) * 1.5 * pulse;

  // Clamped horizontal and vertical translations
  const totalX = Math.max(
    -camera.maxShakePx,
    Math.min(camera.maxShakePx, ambientX + kickX)
  );
  const totalY = Math.max(
    -camera.maxShakePx * 0.85,
    Math.min(camera.maxShakePx * 0.85, ambientY + kickY)
  );

  // 3. Subtle rotation shake
  const ambientRot = Math.sin(frame * 0.02) * 0.05;
  const kickRot = Math.sin(frame * 1.1) * 0.07 * bass;
  const totalRot = Math.max(
    -camera.rotationShakeDeg,
    Math.min(camera.rotationShakeDeg, ambientRot + kickRot)
  );

  // 4. Zoom breathing: ambient expansion + bass response
  const ambientScale = Math.sin(frame * 0.022) * 0.002;
  const bassScale = bass * (camera.zoomBreathing - 1.0);
  const currentScale = 1.000 + ambientScale + bassScale;

  // Canvas is slightly oversized (105% with -2.5% margins) to prevent black borders
  return (
    <div
      style={{
        position: 'absolute',
        top: '-2.5%',
        left: '-2.5%',
        width: '105%',
        height: '105%',
        transform: `translate3d(${totalX}px, ${totalY}px, 0) scale(${currentScale}) rotate(${totalRot}deg)`,
        transformOrigin: '50% 50%',
        willChange: 'transform',
        transition: 'transform 0.08s ease-out',
      }}
    >
      {children}
    </div>
  );
};
