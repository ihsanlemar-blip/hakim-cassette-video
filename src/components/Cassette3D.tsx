import React from 'react';
import { CassetteReels } from './CassetteReels';
import { SingerArtwork } from './SingerArtwork';
import { VIDEO_CONFIG } from '../config/videoConfig';

interface Cassette3DProps {
  frame: number;
  totalFrames: number;
  energy: number;
  bass: number;
  pulse: number;
}

export const Cassette3D: React.FC<Cassette3DProps> = ({
  frame,
  totalFrames,
  energy,
  bass,
  pulse,
}) => {
  const { artist, song, media, animation } = VIDEO_CONFIG;

  const fps = 30;
  // 14-second yaw cycle (never too fast, perfectly readable)
  const yaw = Math.sin((frame * 2 * Math.PI) / (fps * 14)) * animation.yawDegrees;
  // 10-second subtle rocking pitch
  const pitch = Math.cos((frame * 2 * Math.PI) / (fps * 10)) * animation.pitchDegrees;
  // 18-second roll
  const roll = Math.sin((frame * 2 * Math.PI) / (fps * 18)) * animation.rollDegrees;

  // Damped music response: audio energy causes subtle bounce and scale pulse (1.00 - 1.035)
  const scale = 1.0 + pulse * 0.032;

  // Gentle vertical hover
  const hoverY = Math.sin((frame * 2 * Math.PI) / (fps * 8)) * 5;

  // Reactive gold edge glow
  const edgeGlow = 0.25 + bass * 0.45;

  // Screw component for authentic hardware look
  const renderScrew = (x: number | string, y: number | string) => (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 13,
        height: 13,
        borderRadius: '50%',
        backgroundColor: '#717885',
        backgroundImage:
          'radial-gradient(circle, #8a93a3 30%, #464c58 70%, #2a2e36 100%)',
        boxShadow:
          'inset 0 1px 2px rgba(255,255,255,0.7), 0 2px 5px rgba(0,0,0,0.85)',
        border: '1px solid #1a1c22',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: 7,
          height: 1.5,
          backgroundColor: '#1b1d22',
          position: 'absolute',
          transform: 'rotate(45deg)',
        }}
      />
      <div
        style={{
          width: 7,
          height: 1.5,
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
        top: '45.5%',
        left: '50%',
        width: 1420,
        height: 800,
        transform: `translate(-50%, -50%) perspective(1800px) translateY(${hoverY}px) rotateY(${yaw}deg) rotateX(${pitch}deg) rotateZ(${roll}deg) scale(${scale})`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.06s ease-out',
        zIndex: 10,
      }}
    >
      {/* Outer Shell - Premium Charcoal / Matte Black with 3D Depth */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: 26,
          backgroundColor: '#121418',
          backgroundImage:
            'radial-gradient(circle at 50% 25%, #1f232b 0%, #13151a 50%, #0a0b0e 100%)',
          boxShadow: `
            0 32px 75px rgba(0, 0, 0, 0.95),
            0 14px 32px rgba(0, 0, 0, 0.8),
            0 0 ${18 + bass * 26}px rgba(216, 169, 62, ${edgeGlow * 0.4}),
            inset 0 2px 4px rgba(255, 255, 255, 0.15),
            inset 0 -6px 12px rgba(0, 0, 0, 0.9)
          `,
          border: '3.5px solid #222630',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Top Edge Specular Highlight & Texture */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background:
              'linear-gradient(90deg, transparent 5%, rgba(255, 255, 255, 0.28) 50%, transparent 95%)',
          }}
        />

        {/* 5 Hardware Screws */}
        {renderScrew(26, 26)}
        {renderScrew(1381, 26)}
        {renderScrew(26, 761)}
        {renderScrew(1381, 761)}
        {renderScrew(703, 761)}

        {/* Tactile Side Grip Ridges (Left & Right) */}
        <div
          style={{
            position: 'absolute',
            left: 10,
            top: 130,
            bottom: 160,
            width: 8,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '100%',
                height: 4,
                backgroundColor: '#1f232c',
                borderRadius: 2,
                boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9), 0 1px 1px rgba(255,255,255,0.08)',
              }}
            />
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            right: 10,
            top: 130,
            bottom: 160,
            width: 8,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '100%',
                height: 4,
                backgroundColor: '#1f232c',
                borderRadius: 2,
                boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9), 0 1px 1px rgba(255,255,255,0.08)',
              }}
            />
          ))}
        </div>

        {/* Top Notch Tabs (Write-Protect Tab Impressions) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 110,
            width: 55,
            height: 15,
            backgroundColor: '#0a0c0f',
            borderRadius: '0 0 6px 6px',
            border: '1.5px solid #1a1d24',
            borderTop: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 110,
            width: 55,
            height: 15,
            backgroundColor: '#0a0c0f',
            borderRadius: '0 0 6px 6px',
            border: '1.5px solid #1a1d24',
            borderTop: 'none',
          }}
        />

        {/* ========================================================= */}
        {/* CASSETTE VINTAGE LABEL                                    */}
        {/* ========================================================= */}
        <div
          style={{
            position: 'relative',
            marginTop: 34,
            width: 1320,
            height: 540,
            borderRadius: 18,
            backgroundColor: '#0c0f16',
            backgroundImage:
              'radial-gradient(circle at 75% 50%, #151b27 0%, #0d111a 50%, #080a0f 100%)',
            border: '2px solid rgba(216, 169, 62, 0.55)',
            boxShadow: `
              0 0 24px rgba(216, 169, 62, ${0.15 + bass * 0.2}),
              inset 0 0 35px rgba(0, 0, 0, 0.8),
              0 6px 20px rgba(0, 0, 0, 0.9)
            `,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Label Outer Gold Foil Filigree Border */}
          <div
            style={{
              position: 'absolute',
              inset: 5,
              borderRadius: 14,
              border: '1px solid rgba(246, 217, 124, 0.35)',
              pointerEvents: 'none',
            }}
          />

          {/* Top Gold Header Ribbon */}
          <div
            style={{
              width: '100%',
              height: 44,
              background:
                'linear-gradient(90deg, rgba(138, 101, 26, 0.45) 0%, rgba(216, 169, 62, 0.3) 50%, rgba(138, 101, 26, 0.45) 100%)',
              borderBottom: '1.5px solid rgba(216, 169, 62, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px',
              boxSizing: 'border-box',
              zIndex: 3,
            }}
          >
            {/* SIDE A BADGE */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  backgroundColor: '#d8a93e',
                  color: '#080a0f',
                  fontFamily: 'Cinzel, Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: 13,
                  padding: '2px 10px',
                  borderRadius: 4,
                  letterSpacing: 2,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.6)',
                }}
              >
                SIDE A
              </div>
              <span
                style={{
                  color: '#e4d3a8',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1.6,
                }}
              >
                TYPE I • NORMAL BIAS (120µs EQ)
              </span>
            </div>

            {/* STEREO / DOLBY SYSTEM */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                color: '#e4d3a8',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1.8,
              }}
            >
              <span>HQ STEREO</span>
              <span style={{ color: '#d8a93e' }}>•</span>
              <span>DOLBY B NR</span>
              <span style={{ color: '#d8a93e' }}>•</span>
              <span>320 kbps</span>
            </div>
          </div>

          {/* Label Body Content */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 24px',
              position: 'relative',
            }}
          >
            {/* ======================================================= */}
            {/* LEFT SECTION: Artist and Song Typography               */}
            {/* ======================================================= */}
            <div
              style={{
                width: 380,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingRight: 16,
                gap: 10,
                zIndex: 3,
              }}
            >
              {/* Pashto Singer Name */}
              <div
                dir="rtl"
                style={{
                  fontFamily: "'Noto Naskh Arabic Local', 'Noto Naskh Arabic', sans-serif",
                  fontSize: 36,
                  fontWeight: 700,
                  lineHeight: 1.25,
                  background:
                    'linear-gradient(135deg, #ffffff 0%, #f7dc96 45%, #d8a93e 85%, #b58524 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.9))',
                }}
              >
                {artist.pashto}
              </div>

              {/* Pashto Song Title */}
              <div
                dir="rtl"
                style={{
                  fontFamily: "'Noto Naskh Arabic Local', 'Noto Naskh Arabic', sans-serif",
                  fontSize: 27,
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: '#ecd599',
                  textShadow: '0 2px 8px rgba(0,0,0,0.85)',
                }}
              >
                {song.pashtoTitle}
              </div>

              {/* Gold Filigree Divider */}
              <div
                style={{
                  width: '92%',
                  height: 1.5,
                  background:
                    'linear-gradient(90deg, rgba(216, 169, 62, 0.8) 0%, rgba(246, 217, 124, 0.4) 60%, transparent 100%)',
                  margin: '2px 0',
                }}
              />

              {/* English Artist & Title */}
              <div
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#e5ded1',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}
              >
                {artist.english}
              </div>
              <div
                style={{
                  fontFamily: 'Cinzel, Montserrat, serif',
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#caa35e',
                  letterSpacing: 2.5,
                  textTransform: 'uppercase',
                }}
              >
                {song.englishTitle}
              </div>

              {/* Nostalgic Cassette Sublabel */}
              <div
                style={{
                  marginTop: 4,
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 9.5,
                  fontWeight: 500,
                  color: '#8b8478',
                  letterSpacing: 1.2,
                }}
              >
                AFGHAN NOSTALGIC CASSETTE EDITION
              </div>
            </div>

            {/* ======================================================= */}
            {/* CENTER SECTION: Window with Rotating Reels             */}
            {/* ======================================================= */}
            <div
              style={{
                width: 450,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 4,
              }}
            >
              <CassetteReels frame={frame} totalFrames={totalFrames} />
            </div>

            {/* ======================================================= */}
            {/* RIGHT SECTION: Hakim Jan Faryadi Portrait Artwork      */}
            {/* ======================================================= */}
            <div
              style={{
                width: 350,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3,
              }}
            >
              <SingerArtwork
                portraitSrc={media.portraitSrc}
                bass={bass}
                energy={energy}
              />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* LOWER TRAPEZOID: Tape Head Mechanism & Guide Area         */}
        {/* ========================================================= */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: 780,
            height: 180,
            backgroundColor: '#0c0e12',
            backgroundImage:
              'linear-gradient(to bottom, #13171e 0%, #0a0c10 85%, #050608 100%)',
            clipPath:
              'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)',
            borderTop: '2.5px solid #282d38',
            boxShadow: 'inset 0 4px 15px rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 45,
          }}
        >
          {/* Exposed Magnetic Tape Ribbon */}
          <div
            style={{
              position: 'absolute',
              top: 32,
              left: 36,
              right: 36,
              height: 13,
              backgroundColor: '#1b140e',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              borderBottom: '1px solid rgba(0,0,0,0.9)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.9)',
            }}
          />

          {/* Tape Head Openings / Cutouts */}
          <div
            style={{
              width: 48,
              height: 42,
              borderRadius: 6,
              backgroundColor: '#060709',
              border: '1.5px solid #1f232c',
              boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.95)',
            }}
          />
          <div
            style={{
              width: 80,
              height: 48,
              borderRadius: 8,
              backgroundColor: '#060709',
              border: '2px solid #282d38',
              boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Center Felt Pressure Pad & Bronze Spring */}
            <div
              style={{
                width: 26,
                height: 16,
                backgroundColor: '#9c815c',
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.8)',
              }}
            />
          </div>
          <div
            style={{
              width: 48,
              height: 42,
              borderRadius: 6,
              backgroundColor: '#060709',
              border: '1.5px solid #1f232c',
              boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.95)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
