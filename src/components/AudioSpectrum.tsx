import React from 'react';
import { PROJECT_CONFIG } from '../config/projectConfig';

interface AudioSpectrumProps {
  bands: number[];
  energy: number;
  bass: number;
}

export const AudioSpectrum: React.FC<AudioSpectrumProps> = ({
  bands,
  energy,
  bass,
}) => {
  const { layout } = PROJECT_CONFIG;
  const { spectrum } = layout;

  const barCount = spectrum.barCount;
  const halfCount = barCount / 2;

  // Symmetrize the bands: mirrored from center outward for visual harmony
  const mirroredBars: number[] = [];
  for (let i = halfCount - 1; i >= 0; i--) {
    mirroredBars.push(bands[i] || 0.05);
  }
  for (let i = 0; i < halfCount; i++) {
    mirroredBars.push(bands[i] || 0.05);
  }

  const barWidth = Math.floor(spectrum.widthPx / barCount) - 5;

  return (
    <div
      style={{
        position: 'absolute',
        right: spectrum.rightPx,
        bottom: spectrum.bottomPx,
        width: spectrum.widthPx,
        height: spectrum.heightPx,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      {/* Gold Horizon Baseline */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: '2%',
          width: '96%',
          height: 1.5,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(216, 169, 62, 0.3) 15%, rgba(246, 217, 124, 0.85) 50%, rgba(216, 169, 62, 0.3) 85%, transparent 100%)',
          boxShadow: `0 0 12px rgba(216, 169, 62, ${0.25 + bass * 0.45})`,
        }}
      />

      {/* Equalizer Frequency Bars Container */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          width: '100%',
          height: spectrum.heightPx,
          paddingBottom: 20,
          boxSizing: 'border-box',
        }}
      >
        {mirroredBars.map((val, idx) => {
          const distFromCenter =
            Math.abs(idx - (barCount / 2 - 0.5)) / (barCount / 2);
          // Gently curved arc shaping: outer bars rise elegantly
          const arcCurve = Math.cos(distFromCenter * (Math.PI / 2.6));
          const height = Math.max(
            5,
            Math.min(135, val * 125 * (0.8 + arcCurve * 0.35) * spectrum.sensitivity)
          );

          const peakHeight = height + 4;

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: barWidth,
                height: spectrum.heightPx - 20,
                justifyContent: 'flex-end',
                position: 'relative',
              }}
            >
              {/* Floating peak transient indicator */}
              <div
                style={{
                  position: 'absolute',
                  bottom: peakHeight,
                  width: barWidth * 0.85,
                  height: 2.5,
                  borderRadius: 1.2,
                  backgroundColor: '#fbe298',
                  boxShadow: '0 0 8px rgba(251, 226, 152, 0.9)',
                  opacity: Math.max(0.35, val),
                }}
              />

              {/* Main frequency bar */}
              <div
                style={{
                  width: barWidth,
                  height,
                  borderRadius: '2.5px 2.5px 1px 1px',
                  background:
                    'linear-gradient(to top, rgba(14, 25, 42, 0.75) 0%, rgba(138, 101, 26, 0.85) 35%, rgba(216, 169, 62, 0.95) 70%, rgba(246, 217, 124, 1) 100%)',
                  boxShadow: `0 0 ${val * 14}px rgba(216, 169, 62, ${val * 0.6})`,
                  opacity: 0.85 + val * 0.15,
                  transition: 'height 0.05s ease-out',
                }}
              />

              {/* Mirror floor reflection below baseline */}
              <div
                style={{
                  position: 'absolute',
                  top: spectrum.heightPx - 20,
                  width: barWidth,
                  height: height * 0.28,
                  borderRadius: '1px 1px 2px 2px',
                  background:
                    'linear-gradient(to bottom, rgba(216, 169, 62, 0.3) 0%, transparent 100%)',
                  opacity: 0.35,
                  filter: 'blur(1px)',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
