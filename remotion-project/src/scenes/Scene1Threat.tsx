import React from 'react';
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';
import { TextReveal } from '../components/TextReveal';
import { DroneIcon } from '../components/DroneIcon';

export const Scene1Threat: React.FC = () => {
  const frame = useCurrentFrame();

  // Soldier silhouettes positions
  const soldiers = [
    { x: 300, y: 580 },
    { x: 500, y: 600 },
    { x: 700, y: 570 },
  ];

  // Drone moves from top-right toward soldiers
  const droneX = interpolate(frame, [180, 540], [1600, 600], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad) });
  const droneY = interpolate(frame, [180, 540], [100, 500], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const droneVisible = frame >= 180;

  // Red flash on attack
  const flashOpacity = frame >= 510 ? interpolate(frame, [510, 530, 560, 600], [0, 0.7, 0.3, 0], { extrapolateRight: 'clamp' }) : 0;

  // Soldiers panic — shake effect
  const shake = frame >= 480 ? Math.sin(frame * 1.2) * 4 : 0;

  // Ground fog
  const fogOpacity = interpolate(frame, [0, 60], [0, 0.4], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0a', overflow: 'hidden' }}>

      {/* Stars / night sky */}
      {[...Array(40)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${(i * 137.5) % 100}%`,
          top: `${(i * 97.3) % 45}%`,
          width: 2, height: 2,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          opacity: 0.4 + (i % 3) * 0.2,
        }} />
      ))}

      {/* Ground */}
      <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 280, background: 'linear-gradient(to top, #1a1a0a, #0a0a0a)' }} />

      {/* Ground fog */}
      <div style={{ position: 'absolute', bottom: 200, width: '100%', height: 120, background: 'linear-gradient(to top, rgba(80,70,20,0.3), transparent)', opacity: fogOpacity }} />

      {/* Soldiers */}
      {soldiers.map((s, i) => {
        const soldierOpacity = interpolate(frame, [i * 20, i * 20 + 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        return (
          <svg key={i} width={40} height={80} viewBox="0 0 40 80"
            style={{ position: 'absolute', left: s.x + shake, top: s.y, opacity: soldierOpacity }}>
            {/* Head */}
            <circle cx={20} cy={12} r={10} fill="#4a5c3a" />
            {/* Helmet */}
            <ellipse cx={20} cy={8} rx={13} ry={8} fill="#3a4a2a" />
            {/* Body */}
            <rect x={10} y={22} width={20} height={30} rx={3} fill="#4a5c3a" />
            {/* Legs */}
            <rect x={11} y={50} width={8} height={22} rx={2} fill="#3a4a2a" />
            <rect x={21} y={50} width={8} height={22} rx={2} fill="#3a4a2a" />
            {/* Rifle */}
            <rect x={28} y={25} width={4} height={28} rx={1} fill="#222" />
          </svg>
        );
      })}

      {/* Drone */}
      {droneVisible && <DroneIcon x={droneX} y={droneY} size={70} color="#cc2200" rotation={135} />}

      {/* Drone trajectory line */}
      {droneVisible && frame < 510 && (
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <line x1={1600} y1={100} x2={droneX} y2={droneY} stroke="#cc220044" strokeWidth={2} strokeDasharray="8,8" />
        </svg>
      )}

      {/* Red flash */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#ff0000', opacity: flashOpacity }} />

      {/* Text overlays */}
      <div style={{ position: 'absolute', top: 80, width: '100%', textAlign: 'center' }}>
        <TextReveal text="THE THREAT" startFrame={30} color="#cc2200" fontSize={28} letterSpacing="0.4em" />
      </div>

      <div style={{ position: 'absolute', top: 160, width: '100%', textAlign: 'center' }}>
        <TextReveal text="FIBER OPTIC DRONES" startFrame={80} color="#ffffff" fontSize={64} fontWeight={900} />
      </div>

      <div style={{ position: 'absolute', top: 250, width: '100%', textAlign: 'center' }}>
        <TextReveal text="Silent. Precise. Lethal." startFrame={120} color="#aaaaaa" fontSize={28} letterSpacing="0.15em" />
      </div>

      {frame >= 480 && (
        <div style={{ position: 'absolute', bottom: 140, width: '100%', textAlign: 'center' }}>
          <TextReveal text="NO WARNING. NO TIME." startFrame={480} color="#ff4422" fontSize={36} letterSpacing="0.25em" />
        </div>
      )}
    </AbsoluteFill>
  );
};
