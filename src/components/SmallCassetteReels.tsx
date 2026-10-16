import React from 'react';

interface SmallCassetteReelsProps {
  frame: number;
  totalFrames: number;
}

export const SmallCassetteReels: React.FC<SmallCassetteReelsProps> = ({
  frame,
  totalFrames,
}) => {
  // Continuous smooth rotation speeds
  const leftRotation = (frame * 1.8) % 360;
  const rightRotation = (frame * 2.0) % 360;

  // Real tape spool transfer: left unwinds from full to empty, right winds from empty to full
  const progress = Math.min(1, Math.max(0, frame / totalFrames));
  const minRadius = 10;
  const maxRadius = 21;
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
          width: 2.5,
          height: 4.5,
          backgroundColor: '#eae5dc',
          borderRadius: 1,
          boxShadow: '0 0.5px 1px rgba(0,0,0,0.6)',
          transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-6px)`,
        }}
      />
    ));
  };

  return (
    <div
      style={{
        position: 'relative',
        width: 135,
        height: 52,
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow:
          'inset 0 2px 6px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(255, 255, 255, 0.08)',
        border: '1px solid #232730',
        backgroundColor: '#0c0e12',
      }}
    >
      {/* Interior mechanical chamber */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 50%, #181d26 0%, #0a0c10 85%, #050608 100%)',
        }}
      />

      {/* Internal magnetic tape path */}
      <div
        style={{
          position: 'absolute',
          bottom: 5,
          left: 22,
          right: 22,
          height: 3,
          backgroundColor: '#1b140e',
          boxShadow: '0 0.5px 1px rgba(0,0,0,0.8)',
          borderTop: '0.5px solid rgba(255,255,255,0.08)',
        }}
      />

      {/* Left Tape Roll (Supply Reel) */}
      <div
        style={{
          position: 'absolute',
          top: 26,
          left: 33,
          width: leftTapeRadius * 2,
          height: leftTapeRadius * 2,
          borderRadius: '50%',
          backgroundColor: '#221912',
          backgroundImage:
            'radial-gradient(circle, #2d2219 25%, #1c140e 65%, #100b07 100%)',
          boxShadow: '0 0 4px rgba(0,0,0,0.95)',
          transform: 'translate(-50%, -50%)',
          border: '0.5px solid #16100c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />

      {/* Right Tape Roll (Take-up Reel) */}
      <div
        style={{
          position: 'absolute',
          top: 26,
          left: 102,
          width: rightTapeRadius * 2,
          height: rightTapeRadius * 2,
          borderRadius: '50%',
          backgroundColor: '#221912',
          backgroundImage:
            'radial-gradient(circle, #2d2219 25%, #1c140e 65%, #100b07 100%)',
          boxShadow: '0 0 4px rgba(0,0,0,0.95)',
          transform: 'translate(-50%, -50%)',
          border: '0.5px solid #16100c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />

      {/* Left 6-teeth Hub */}
      <div
        style={{
          position: 'absolute',
          top: 26,
          left: 33,
          width: 17,
          height: 17,
          borderRadius: '50%',
          backgroundColor: '#f3efe6',
          boxShadow:
            '0 1px 3px rgba(0,0,0,0.85), inset 0 0.5px 1px rgba(255,255,255,0.95)',
          border: '1px solid #dad3c7',
          transform: `translate(-50%, -50%) rotate(${leftRotation}deg)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        {renderHubTeeth()}
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: '#0c0e12',
            border: '0.5px solid #2c3038',
          }}
        />
      </div>

      {/* Right 6-teeth Hub */}
      <div
        style={{
          position: 'absolute',
          top: 26,
          left: 102,
          width: 17,
          height: 17,
          borderRadius: '50%',
          backgroundColor: '#f3efe6',
          boxShadow:
            '0 1px 3px rgba(0,0,0,0.85), inset 0 0.5px 1px rgba(255,255,255,0.95)',
          border: '1px solid #dad3c7',
          transform: `translate(-50%, -50%) rotate(${rightRotation}deg)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        {renderHubTeeth()}
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: '#0c0e12',
            border: '0.5px solid #2c3038',
          }}
        />
      </div>

      {/* Clear Acrylic Viewing Overlay with Measurement Gauge */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        {/* Scale Markings in the Center */}
        <div
          style={{
            position: 'absolute',
            top: 7,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 5,
              color: 'rgba(240, 235, 225, 0.75)',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 5.5,
              fontWeight: 600,
            }}
          >
            <span>100</span>
            <span>50</span>
            <span>0</span>
          </div>
          <div style={{ display: 'flex', gap: 2.5, height: 4 }}>
            {[-2, -1, 0, 1, 2].map((tick) => (
              <div
                key={tick}
                style={{
                  width: 0.8,
                  height: tick === 0 ? 4 : 2.5,
                  backgroundColor:
                    tick === 0 ? '#d8a93e' : 'rgba(240, 235, 225, 0.5)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Diagonal Acrylic Reflection */}
        <div
          style={{
            position: 'absolute',
            top: -10,
            left: -20,
            width: '140%',
            height: 35,
            background:
              'linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.15) 48%, rgba(255, 255, 255, 0.28) 50%, rgba(255, 255, 255, 0.1) 52%, transparent 60%)',
            transform: 'rotate(-25deg)',
          }}
        />
      </div>
    </div>
  );
};
