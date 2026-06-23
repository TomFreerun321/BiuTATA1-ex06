import React from 'react';
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';
import { TextReveal } from '../components/TextReveal';
import { DroneIcon } from '../components/DroneIcon';

export const Scene3Result: React.FC = () => {
  const frame = useCurrentFrame();

  // Drone approaches from top
  const droneX = interpolate(frame, [80, 200], [960, 820], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const droneY = interpolate(frame, [80, 200], [50, 400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad) });

  // Explosion after impact
  const explodeStart = 200;
  const explosionScale = frame >= explodeStart ? interpolate(frame, [explodeStart, explodeStart + 30], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1)) }) : 0;
  const explosionOpacity = frame >= explodeStart ? interpolate(frame, [explodeStart + 20, explodeStart + 60], [1, 0], { extrapolateRight: 'clamp' }) : 0;

  // Armored vehicle — left side
  const vehicle1Opacity = interpolate(frame, [0, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Building — right side
  const buildingOpacity = interpolate(frame, [20, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Safe soldiers visible in windows (appear after explosion)
  const soldiersOpacity = frame >= 260 ? interpolate(frame, [260, 300], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0;

  // Final card
  const finalCardOpacity = frame >= 380 ? interpolate(frame, [380, 430], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0;
  const finalCardScale = frame >= 380 ? interpolate(frame, [380, 430], [0.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }) : 0.8;

  const droneVisible = frame < explodeStart;

  return (
    <AbsoluteFill style={{ backgroundColor: '#050a05', overflow: 'hidden' }}>

      {/* Smoky battlefield ground */}
      <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 300, background: 'linear-gradient(to top, #111a08, #050a05)' }} />

      {/* "EMPTY BATTLEFIELD" label */}
      <div style={{ position: 'absolute', top: 80, width: '100%', textAlign: 'center' }}>
        <TextReveal text="EMPTY BATTLEFIELD" startFrame={0} color="#00cc44" fontSize={28} letterSpacing="0.4em" />
      </div>

      {/* Armored vehicle — left */}
      <svg width={320} height={160} viewBox="0 0 320 160"
        style={{ position: 'absolute', left: 60, bottom: 200, opacity: vehicle1Opacity }}>
        {/* Hull */}
        <rect x={20} y={60} width={280} height={80} rx={8} fill="#3a4a2a" />
        {/* Turret */}
        <rect x={100} y={30} width={120} height={50} rx={6} fill="#4a5c3a" />
        {/* Gun */}
        <rect x={200} y={48} width={100} height={12} rx={3} fill="#2a3a1a" />
        {/* Wheels */}
        {[40, 90, 140, 190, 240, 280].map((cx, i) => (
          <circle key={i} cx={cx} cy={145} r={20} fill="#222" stroke="#444" strokeWidth={3} />
        ))}
        {/* Window with soldier */}
        <rect x={110} y={38} width={30} height={22} rx={3} fill="#1a2a1a" stroke="#00cc44" strokeWidth={1.5} />
        <circle cx={125} cy={49} r={7} fill="#4a5c3a" opacity={soldiersOpacity} />
        <text x={60} y={28} fill="#00cc44" fontSize={12} fontFamily="Arial" opacity={soldiersOpacity}>✓ SECURED</text>
      </svg>

      {/* Fortified building — right */}
      <svg width={300} height={280} viewBox="0 0 300 280"
        style={{ position: 'absolute', right: 80, bottom: 180, opacity: buildingOpacity }}>
        {/* Main structure */}
        <rect x={20} y={60} width={260} height={200} rx={4} fill="#2a2a2a" />
        {/* Battlements */}
        {[20, 60, 100, 140, 180, 220].map((x, i) => (
          <rect key={i} x={x} y={40} width={30} height={30} fill="#2a2a2a" />
        ))}
        {/* Windows */}
        {[[50, 100], [130, 100], [210, 100], [50, 170], [130, 170], [210, 170]].map(([wx, wy], i) => (
          <rect key={i} x={wx} y={wy} width={40} height={40} rx={3} fill="#1a2a1a" stroke="#00cc44" strokeWidth={1.5} />
        ))}
        {/* Soldiers visible */}
        {soldiersOpacity > 0 && [50, 130, 210].map((wx, i) => (
          <circle key={i} cx={wx + 20} cy={120} r={8} fill="#4a5c3a" opacity={soldiersOpacity} />
        ))}
        <text x={70} y={38} fill="#00cc44" fontSize={13} fontFamily="Arial" opacity={soldiersOpacity}>✓ FORTIFIED</text>
      </svg>

      {/* Drone approaching */}
      {droneVisible && <DroneIcon x={droneX} y={droneY} size={65} color="#cc2200" rotation={135} />}

      {/* Explosion */}
      {frame >= explodeStart && (
        <div style={{
          position: 'absolute', left: 760, top: 340,
          width: 120, height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #ffcc00, #ff4400, transparent)',
          transform: `scale(${explosionScale})`,
          opacity: explosionOpacity,
        }} />
      )}

      {/* DRONE NEUTRALIZED */}
      {frame >= explodeStart + 30 && (
        <div style={{ position: 'absolute', top: 420, width: '100%', textAlign: 'center' }}>
          <TextReveal text="DRONE: NEUTRALIZED" startFrame={explodeStart + 30} color="#ff4422" fontSize={32} letterSpacing="0.25em" />
        </div>
      )}

      {/* Final card */}
      {frame >= 380 && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundColor: '#000000',
          opacity: finalCardOpacity,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          transform: `scale(${finalCardScale})`,
        }}>
          <div style={{ fontSize: 96, fontWeight: 900, color: '#ffffff', fontFamily: 'Arial, sans-serif', letterSpacing: '0.2em' }}>
            DRONE<span style={{ color: '#00aaff' }}>WATCH</span>
          </div>
          <div style={{ fontSize: 24, color: '#00ff88', letterSpacing: '0.3em', marginTop: 20 }}>
            BECAUSE EVERY SECOND COUNTS
          </div>
          <div style={{ fontSize: 16, color: '#666666', letterSpacing: '0.2em', marginTop: 40 }}>
            PROTECTING THOSE WHO PROTECT US
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
