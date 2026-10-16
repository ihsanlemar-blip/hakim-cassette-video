import React from 'react';

interface CassetteReelsProps {
  frame: number;
  totalFrames: number;
}

export const CassetteReels: React.FC<CassetteReelsProps> = ({
  frame,
  totalFrames,
}) => {
  // Continuous rotation at believable speeds
  const leftRotation = (frame * 1.8) % 360;
  const rightRotation = (frame * 2.0) % 360;

  // Real tape spool transfer: left unwinds from full to empty, right winds from empty to full
  const progress = Math.min(1, Math.max(0, frame / totalFrames));
  const minRadius = 32;
  const maxRadius = 66;
  const leftTapeRadius = maxRadius - progress * (maxRadius - minRadius);
  const rightTapeRadius = minRadius + progress * (maxRadius - minRadius);

  // 6-teeth hub generator
  const renderHubTeeth = () => {
    return [0, 60, 120, 180, 240, 300].map((deg) => (
      <div
        key={deg}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 7,
          height: 12,
          backgroundColor: '#eae5dc',
          borderRadius: 2,
          boxShadow: '0 1px 2px rgba(0,0,0,0.6)',
          transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-17px)`,
        }}
      />
    ));
  };

  return (
    <div
      style={{
        position: 'relative',
        width: 450,
        height: 175,
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow:
          'inset 0 4px 16px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(255, 255, 255, 0.05)',
        border: '2.5px solid #232730',
        backgroundColor: '#0c0e12',
      }}
    >
      {/* Dark interior chamber with mechanical depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 50%, #181d26 0%, #0a0c10 85%, #050608 100%)',
        }}
      />

      {/* Internal magnetic tape ribbon path connecting the two reels */}
      <div
        style={{
          position: 'absolute',
          bottom: 18,
          left: 80,
          right: 80,
          height: 8,
          backgroundColor: '#1b140e',
          boxShadow: '0 1px 3px rgba(0,0,0,0.8)',
          borderTop: '0.5px solid rgba(255,255,255,0.08)',
        }}
      />

      {/* Left Tape Roll (Supply Reel) */}
      <div
        style={{
          position: 'absolute',
          top: 87,
          left: 110,
          width: leftTapeRadius * 2,
          height: leftTapeRadius * 2,
          borderRadius: '50%',
          backgroundColor: '#221912',
          backgroundImage:
            'radial-gradient(circle, #2d2219 25%, #1c140e 65%, #100b07 100%)',
          boxShadow:
            '0 0 10px rgba(0,0,0,0.95), inset 0 0 6px rgba(255,255,255,0.08)',
          transform: 'translate(-50%, -50%)',
          border: '1px solid #16100c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 4,
            borderRadius: '50%',
            border: '0.8px dashed rgba(255,255,255,0.08)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 10,
            borderRadius: '50%',
            border: '0.6px dashed rgba(255,255,255,0.05)',
          }}
        />
      </div>

      {/* Right Tape Roll (Take-up Reel) */}
      <div
        style={{
          position: 'absolute',
          top: 87,
          left: 340,
          width: rightTapeRadius * 2,
          height: rightTapeRadius * 2,
          borderRadius: '50%',
          backgroundColor: '#221912',
          backgroundImage:
            'radial-gradient(circle, #2d2219 25%, #1c140e 65%, #100b07 100%)',
          boxShadow:
            '0 0 10px rgba(0,0,0,0.95), inset 0 0 6px rgba(255,255,255,0.08)',
          transform: 'translate(-50%, -50%)',
          border: '1px solid #16100c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 4,
            borderRadius: '50%',
            border: '0.8px dashed rgba(255,255,255,0.08)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 10,
            borderRadius: '50%',
            border: '0.6px dashed rgba(255,255,255,0.05)',
          }}
        />
      </div>

      {/* Left 6-teeth Hub */}
      <div
        style={{
          position: 'absolute',
          top: 87,
          left: 110,
          width: 52,
          height: 52,
          borderRadius: '50%',
          backgroundColor: '#f3efe6',
          boxShadow:
            '0 2px 6px rgba(0,0,0,0.85), inset 0 1px 3px rgba(255,255,255,0.95)',
          border: '2px solid #dad3c7',
          transform: `translate(-50%, -50%) rotate(${leftRotation}deg)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        {renderHubTeeth()}
        {/* Central Spindle Hole */}
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            backgroundColor: '#0c0e12',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)',
            border: '1.5px solid #2c3038',
          }}
        />
      </div>

      {/* Right 6-teeth Hub */}
      <div
        style={{
          position: 'absolute',
          top: 87,
          left: 340,
          width: 52,
          height: 52,
          borderRadius: '50%',
          backgroundColor: '#f3efe6',
          boxShadow:
            '0 2px 6px rgba(0,0,0,0.85), inset 0 1px 3px rgba(255,255,255,0.95)',
          border: '2px solid #dad3c7',
          transform: `translate(-50%, -50%) rotate(${rightRotation}deg)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        {renderHubTeeth()}
        {/* Central Spindle Hole */}
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            backgroundColor: '#0c0e12',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)',
            border: '1.5px solid #2c3038',
          }}
        />
      </div>

      {/* Lower Corner Tape Guide Rollers */}
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          left: 36,
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: '#c4bcaf',
          boxShadow: '0 1px 3px rgba(0,0,0,0.7)',
          border: '1px solid #7a7368',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          right: 36,
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: '#c4bcaf',
          boxShadow: '0 1px 3px rgba(0,0,0,0.7)',
          border: '1px solid #7a7368',
        }}
      />

      {/* Clear Acrylic Viewing Window Overlay with Gauge Marks */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        {/* Measurement Scale Markings in the Center (100 ... 50 ... 0) */}
        <div
          style={{
            position: 'absolute',
            top: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              color: 'rgba(240, 235, 225, 0.8)',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: 1.5,
            }}
          >
            <span>100</span>
            <span>50</span>
            <span>0</span>
          </div>
          {/* Gauge ruler ticks */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 7,
              height: 12,
            }}
          >
            {[-3, -2, -1, 0, 1, 2, 3].map((tick) => (
              <div
                key={tick}
                style={{
                  width: tick === 0 || Math.abs(tick) === 3 ? 1.5 : 1,
                  height: tick === 0 || Math.abs(tick) === 3 ? 10 : 6,
                  backgroundColor:
                    tick === 0
                      ? '#d8a93e'
                      : 'rgba(240, 235, 225, 0.55)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Diagonal Gloss / Acrylic Glass Reflection Streak */}
        <div
          style={{
            position: 'absolute',
            top: -30,
            left: -50,
            width: '140%',
            height: 100,
            background:
              'linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.12) 48%, rgba(255, 255, 255, 0.22) 50%, rgba(255, 255, 255, 0.08) 52%, transparent 60%)',
            transform: 'rotate(-25deg)',
          }}
        />
      </div>
    </div>
  );
};
