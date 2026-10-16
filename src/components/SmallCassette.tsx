import React from 'react';
import { Img } from 'remotion';
import { SmallCassetteReels } from './SmallCassetteReels';
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
  totalFrames,
  energy,
  bass,
  pulse,
}) => {
  const { artist, song, media, layout } = PROJECT_CONFIG;
  const { cassette } = layout;

  const fps = 30;

  // Gentle 3D sway cycles (independent from singer)
  const yaw = Math.sin((frame * 2 * Math.PI) / (fps * 11)) * cassette.yawDegrees;
  const pitch = Math.cos((frame * 2 * Math.PI) / (fps * 8)) * cassette.pitchDegrees;
  const roll = Math.sin((frame * 2 * Math.PI) / (fps * 14)) * cassette.rollDegrees;

  // Subtle hovering
  const hoverY = Math.sin((frame * 2 * Math.PI) / (fps * 6)) * cassette.swayAmplitude;

  // Music reactivity (micro-pulse scale 1.00 - 1.025)
  const scale = 1.0 + pulse * (cassette.bassPulseScale - 1.0);

  // Subtle edge glow
  const edgeGlow = 0.25 + bass * 0.35;

  const renderScrew = (x: number, y: number) => (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: '#717885',
        backgroundImage:
          'radial-gradient(circle, #8a93a3 30%, #464c58 70%, #2a2e36 100%)',
        boxShadow:
          'inset 0 0.5px 1px rgba(255,255,255,0.7), 0 1px 2px rgba(0,0,0,0.85)',
        border: '0.8px solid #1a1c22',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: 4,
          height: 1,
          backgroundColor: '#1b1d22',
          position: 'absolute',
          transform: 'rotate(45deg)',
        }}
      />
      <div
        style={{
          width: 4,
          height: 1,
          backgroundColor: '#1b1d22',
          position: 'absolute',
          transform: 'rotate(135deg)',
        }}
      />
    </div>
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: cassette.leftPx,
        bottom: cassette.bottomPx,
        width: cassette.widthPx,
        height: cassette.heightPx,
        zIndex: 15, // In front of background, alongside singer
        transform: `perspective(900px) translateY(${hoverY}px) rotateY(${yaw}deg) rotateX(${pitch}deg) rotateZ(${roll}deg) scale(${scale})`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.06s ease-out',
        pointerEvents: 'none',
      }}
    >
      {/* Outer Shell - Dark Graphite & Charcoal with Gold Rim Accent */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: 10,
          backgroundColor: '#121418',
          backgroundImage:
            'radial-gradient(circle at 50% 25%, #1f232b 0%, #13151a 50%, #0a0b0e 100%)',
          boxShadow: `
            0 16px 36px rgba(0, 0, 0, 0.95),
            0 6px 16px rgba(0, 0, 0, 0.8),
            0 0 ${12 + bass * 16}px rgba(216, 169, 62, ${edgeGlow * 0.4}),
            inset 0 1px 2px rgba(255, 255, 255, 0.15),
            inset 0 -3px 6px rgba(0, 0, 0, 0.9)
          `,
          border: '1.5px solid #282d38',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Top Edge Specular Reflection */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1.5,
            background:
              'linear-gradient(90deg, transparent 5%, rgba(255, 255, 255, 0.28) 50%, transparent 95%)',
          }}
        />

        {/* 5 Hardware Screws */}
        {renderScrew(8, 8)}
        {renderScrew(344, 8)}
        {renderScrew(8, 200)}
        {renderScrew(344, 200)}
        {renderScrew(176, 200)}

        {/* Side Grip Ridges */}
        <div
          style={{
            position: 'absolute',
            left: 3,
            top: 40,
            bottom: 45,
            width: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '100%',
                height: 2,
                backgroundColor: '#1f232c',
                borderRadius: 1,
              }}
            />
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            right: 3,
            top: 40,
            bottom: 45,
            width: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '100%',
                height: 2,
                backgroundColor: '#1f232c',
                borderRadius: 1,
              }}
            />
          ))}
        </div>

        {/* ========================================================= */}
        {/* CASSETTE VINTAGE LABEL                                    */}
        {/* ========================================================= */}
        <div
          style={{
            position: 'relative',
            marginTop: 10,
            width: 334,
            height: 146,
            borderRadius: 7,
            backgroundColor: '#0c0f16',
            backgroundImage:
              'radial-gradient(circle at 75% 50%, #151b27 0%, #0d111a 50%, #080a0f 100%)',
            border: '1px solid rgba(216, 169, 62, 0.55)',
            boxShadow: `
              0 0 10px rgba(216, 169, 62, ${0.15 + bass * 0.15}),
              inset 0 0 15px rgba(0, 0, 0, 0.8)
            `,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Top Gold Header Ribbon */}
          <div
            style={{
              width: '100%',
              height: 16,
              background:
                'linear-gradient(90deg, rgba(138, 101, 26, 0.5) 0%, rgba(216, 169, 62, 0.35) 50%, rgba(138, 101, 26, 0.5) 100%)',
              borderBottom: '1px solid rgba(216, 169, 62, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 8px',
              boxSizing: 'border-box',
              zIndex: 3,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span
                style={{
                  backgroundColor: '#d8a93e',
                  color: '#080a0f',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: 7.5,
                  padding: '0.5px 4px',
                  borderRadius: 2,
                }}
              >
                SIDE A
              </span>
              <span
                style={{
                  color: '#e4d3a8',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 6.5,
                  fontWeight: 600,
                }}
              >
                STEREO
              </span>
            </div>

            <div
              style={{
                color: '#e4d3a8',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 6.5,
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              DOLBY B NR • 320 kbps
            </div>
          </div>

          {/* Label Middle Body Content */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '4px 8px',
              position: 'relative',
            }}
          >
            {/* Left Section: Pashto Singer & Song Title */}
            <div
              style={{
                width: 95,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 2,
                zIndex: 4,
              }}
            >
              <div
                dir="rtl"
                style={{
                  fontFamily: "'Noto Naskh Arabic Local', 'Noto Naskh Arabic', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  background:
                    'linear-gradient(135deg, #ffffff 0%, #f7dc96 45%, #d8a93e 85%, #b58524 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {artist.pashto}
              </div>

              <div
                dir="rtl"
                style={{
                  fontFamily: "'Noto Naskh Arabic Local', 'Noto Naskh Arabic', sans-serif",
                  fontSize: 8.5,
                  fontWeight: 600,
                  color: '#ecd599',
                }}
              >
                {song.pashtoTitle}
              </div>

              <div
                style={{
                  width: '90%',
                  height: 0.8,
                  backgroundColor: 'rgba(216, 169, 62, 0.6)',
                  margin: '1px 0',
                }}
              />

              <div
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 5.5,
                  fontWeight: 600,
                  color: '#e5ded1',
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}
              >
                {artist.english}
              </div>
            </div>

            {/* Center Section: Rotating Tape Reels */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 4,
              }}
            >
              <SmallCassetteReels frame={frame} totalFrames={totalFrames} />
            </div>

            {/* Right Section: Mini Singer Album Artwork */}
            <div
              style={{
                width: 82,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 4,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 94,
                  borderRadius: '36px 36px 8px 8px',
                  border: '1px solid rgba(216, 169, 62, 0.65)',
                  boxShadow: '0 0 6px rgba(216, 169, 62, 0.3)',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#0a0d14',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
              >
                {/* Subtle gold glow behind thumbnail */}
                <div
                  style={{
                    position: 'absolute',
                    inset: -5,
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle, rgba(216, 169, 62, 0.35) 0%, transparent 70%)',
                  }}
                />
                <Img
                  src={media.portraitSrc}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 20%',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lower Trapezoid Tape Head Area */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: 220,
            height: 48,
            backgroundColor: '#0c0e12',
            backgroundImage:
              'linear-gradient(to bottom, #13171e 0%, #0a0c10 85%, #050608 100%)',
            clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)',
            borderTop: '1px solid #282d38',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}
        >
          {/* Tape Ribbon */}
          <div
            style={{
              position: 'absolute',
              top: 8,
              left: 12,
              right: 12,
              height: 4,
              backgroundColor: '#1b140e',
              borderTop: '0.5px solid rgba(255,255,255,0.08)',
            }}
          />

          <div
            style={{
              width: 14,
              height: 12,
              borderRadius: 2,
              backgroundColor: '#060709',
              border: '0.8px solid #1f232c',
            }}
          />
          <div
            style={{
              width: 24,
              height: 14,
              borderRadius: 3,
              backgroundColor: '#060709',
              border: '1px solid #282d38',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 9,
                height: 5,
                backgroundColor: '#9c815c',
                borderRadius: 1,
              }}
            />
          </div>
          <div
            style={{
              width: 14,
              height: 12,
              borderRadius: 2,
              backgroundColor: '#060709',
              border: '0.8px solid #1f232c',
            }}
          />
        </div>
      </div>
    </div>
  );
};
