import React from 'react';
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';
import { TextReveal } from '../components/TextReveal';
import { DroneIcon } from '../components/DroneIcon';

export const Scene3Result: React.FC = () => {
  const frame = useCurrentFrame();

  const droneX = interpolate(frame, [80, 200], [960, 820], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const droneY = interpolate(frame, [80, 200], [50, 400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad) });

  const explodeStart = 200;
  const explosionScale = frame >= explodeStart
    ? interpolate(frame, [explodeStart, explodeStart + 30], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1)) })
    : 0;
  const explosionOpacity = frame >= explodeStart
    ? interpolate(frame, [explodeStart + 20, explodeStart + 60], [1, 0], { extrapolateRight: 'clamp' })
    : 0;

  const vehicle1Opacity = interpolate(frame, [0, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const buildingOpacity = interpolate(frame, [20, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Soldiers appear after explosion — faster fade-in, higher final opacity
  const soldiersOpacity = frame >= 240
    ? interpolate(frame, [240, 280], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;

  const finalCardOpacity = frame >= 380
    ? interpolate(frame, [380, 430], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;
  const finalCardScale = frame >= 380
    ? interpolate(frame, [380, 430], [0.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) })
    : 0.8;

  const droneVisible = frame < explodeStart;

  // Interior warm glow pulse (life inside vehicles/building)
  const glowPulse = 0.7 + 0.15 * Math.sin(frame * 0.12);

  return (
    <AbsoluteFill style={{ backgroundColor: '#050a05', overflow: 'hidden' }}>

      {/* Smoky battlefield ground */}
      <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 300, background: 'linear-gradient(to top, #111a08, #050a05)' }} />

      {/* "EMPTY BATTLEFIELD" label */}
      <div style={{ position: 'absolute', top: 80, width: '100%', textAlign: 'center' }}>
        <TextReveal text="EMPTY BATTLEFIELD" startFrame={0} color="#00cc44" fontSize={28} letterSpacing="0.4em" />
      </div>

      {/* ── ARMORED VEHICLE — left ── */}
      <svg width={380} height={200} viewBox="0 0 380 200"
        style={{ position: 'absolute', left: 30, bottom: 180, opacity: vehicle1Opacity }}>

        {/* Hull */}
        <rect x={20} y={80} width={340} height={95} rx={10} fill="#3a4a2a" />
        {/* Sloped front armor */}
        <polygon points="20,175 20,100 60,80 60,175" fill="#2e3d20" />
        {/* Turret base */}
        <rect x={110} y={44} width={150} height={55} rx={8} fill="#4a5c3a" />
        {/* Gun barrel */}
        <rect x={225} y={60} width={130} height={14} rx={4} fill="#2a3a1a" />
        <rect x={340} y={63} width={20} height={8} rx={2} fill="#1a2a0a" />
        {/* Wheels */}
        {[45, 100, 155, 210, 265, 320].map((cx, i) => (
          <g key={i}>
            <circle cx={cx} cy={178} r={22} fill="#181818" stroke="#333" strokeWidth={3} />
            <circle cx={cx} cy={178} r={11} fill="#222" />
            <circle cx={cx} cy={178} r={4} fill="#444" />
          </g>
        ))}
        {/* Track */}
        <rect x={23} y={168} width={334} height={14} rx={4} fill="#222" />

        {/* ── BIG WINDOWS with visible soldiers ── */}

        {/* Window 1 — left */}
        <rect x={68} y={50} width={55} height={48} rx={5}
          fill={`rgba(30,60,20,${glowPulse * soldiersOpacity * 0.8 + 0.15})`}
          stroke="#00cc44" strokeWidth={2} />
        {soldiersOpacity > 0 && (
          <g opacity={soldiersOpacity}>
            {/* Warm interior glow */}
            <rect x={69} y={51} width={53} height={46} rx={4} fill={`rgba(80,160,60,${glowPulse * 0.12})`} />
            {/* Soldier silhouette — head + shoulders + helmet */}
            <ellipse cx={90} cy={81} rx={13} ry={10} fill="#3a4a28" />
            <circle cx={90} cy={69} r={9} fill="#4a5c3a" />
            <ellipse cx={90} cy={65} rx={11} ry={6} fill="#2a3a18" />
            {/* Second soldier peeking */}
            <circle cx={112} cy={72} r={7} fill="#4a5c3a" />
            <ellipse cx={112} cy={68} rx={9} ry={5} fill="#2a3a18" />
          </g>
        )}

        {/* Window 2 — center */}
        <rect x={148} y={50} width={55} height={48} rx={5}
          fill={`rgba(30,60,20,${glowPulse * soldiersOpacity * 0.8 + 0.15})`}
          stroke="#00cc44" strokeWidth={2} />
        {soldiersOpacity > 0 && (
          <g opacity={soldiersOpacity}>
            <rect x={149} y={51} width={53} height={46} rx={4} fill={`rgba(80,160,60,${glowPulse * 0.12})`} />
            <ellipse cx={175} cy={81} rx={13} ry={10} fill="#3a4a28" />
            <circle cx={175} cy={69} r={9} fill="#4a5c3a" />
            <ellipse cx={175} cy={65} rx={11} ry={6} fill="#2a3a18" />
          </g>
        )}

        {/* Window 3 — right */}
        <rect x={228} y={50} width={55} height={48} rx={5}
          fill={`rgba(30,60,20,${glowPulse * soldiersOpacity * 0.8 + 0.15})`}
          stroke="#00cc44" strokeWidth={2} />
        {soldiersOpacity > 0 && (
          <g opacity={soldiersOpacity}>
            <rect x={229} y={51} width={53} height={46} rx={4} fill={`rgba(80,160,60,${glowPulse * 0.12})`} />
            <circle cx={255} cy={69} r={9} fill="#4a5c3a" />
            <ellipse cx={255} cy={65} rx={11} ry={6} fill="#2a3a18" />
            <circle cx={273} cy={72} r={7} fill="#4a5c3a" />
          </g>
        )}

        {/* SECURED badge */}
        {soldiersOpacity > 0 && (
          <g opacity={soldiersOpacity}>
            <rect x={60} y={22} width={170} height={22} rx={4} fill="rgba(0,30,0,0.7)" />
            <text x={75} y={37} fill="#00ff66" fontSize={14} fontFamily="Arial" fontWeight="bold">✓ SOLDIERS SECURED</text>
          </g>
        )}
      </svg>

      {/* ── FORTIFIED BUILDING — right ── */}
      <svg width={360} height={340} viewBox="0 0 360 340"
        style={{ position: 'absolute', right: 50, bottom: 160, opacity: buildingOpacity }}>

        {/* Main structure */}
        <rect x={20} y={80} width={320} height={240} rx={4} fill="#252525" />
        {/* Darker concrete texture */}
        <rect x={20} y={80} width={320} height={8} fill="#1e1e1e" />
        <rect x={20} y={180} width={320} height={6} fill="#1e1e1e" />
        <rect x={20} y={270} width={320} height={6} fill="#1e1e1e" />
        {/* Vertical seams */}
        {[80, 140, 200, 260, 300].map((x, i) => (
          <line key={i} x1={x} y1={80} x2={x} y2={320} stroke="#1e1e1e" strokeWidth={2} />
        ))}
        {/* Battlements */}
        {[20, 65, 110, 155, 200, 245, 290].map((x, i) => (
          <rect key={i} x={x} y={52} width={35} height={36} fill="#252525" />
        ))}
        {/* Reinforcement strips */}
        <rect x={15} y={78} width={330} height={6} rx={2} fill="#333" />
        <rect x={15} y={178} width={330} height={5} rx={2} fill="#333" />

        {/* ── WINDOWS row 1 — bigger, with soldiers ── */}
        {[[30, 96], [120, 96], [210, 96], [300, 96]].map(([wx, wy], i) => (
          <g key={i}>
            <rect x={wx} y={wy} width={58} height={58} rx={4}
              fill={`rgba(20,50,15,${glowPulse * soldiersOpacity * 0.9 + 0.1})`}
              stroke="#00cc44" strokeWidth={2} />
            {soldiersOpacity > 0 && (
              <g opacity={soldiersOpacity}>
                {/* Interior glow */}
                <rect x={wx + 1} y={wy + 1} width={56} height={56} rx={3}
                  fill={`rgba(60,140,40,${glowPulse * 0.15})`} />
                {/* Soldier — head + helmet + shoulders */}
                <ellipse cx={wx + 29} cy={wy + 50} rx={20} ry={12} fill="#3a4a28" />
                <circle cx={wx + 29} cy={wy + 36} r={13} fill="#4a5c3a" />
                <ellipse cx={wx + 29} cy={wy + 30} rx={15} ry={9} fill="#2a3a18" />
                {/* Night vision goggles */}
                <rect x={wx + 20} y={wy + 29} width={18} height={6} rx={2} fill="#1a2a10" />
              </g>
            )}
          </g>
        ))}

        {/* ── WINDOWS row 2 ── */}
        {[[30, 192], [120, 192], [210, 192], [300, 192]].map(([wx, wy], i) => (
          <g key={i}>
            <rect x={wx} y={wy} width={58} height={58} rx={4}
              fill={`rgba(20,50,15,${glowPulse * soldiersOpacity * 0.9 + 0.1})`}
              stroke="#00cc44" strokeWidth={2} />
            {soldiersOpacity > 0 && i % 2 === 0 && (
              <g opacity={soldiersOpacity}>
                <rect x={wx + 1} y={wy + 1} width={56} height={56} rx={3}
                  fill={`rgba(60,140,40,${glowPulse * 0.15})`} />
                <ellipse cx={wx + 29} cy={wy + 50} rx={20} ry={12} fill="#3a4a28" />
                <circle cx={wx + 29} cy={wy + 36} r={13} fill="#4a5c3a" />
                <ellipse cx={wx + 29} cy={wy + 30} rx={15} ry={9} fill="#2a3a18" />
              </g>
            )}
          </g>
        ))}

        {/* Door */}
        <rect x={145} y={272} width={70} height={48} rx={3} fill="#1a1a1a" stroke="#333" strokeWidth={2} />
        <rect x={175} y={285} width={8} height={20} rx={2} fill="#444" />

        {/* FORTIFIED badge */}
        {soldiersOpacity > 0 && (
          <g opacity={soldiersOpacity}>
            <rect x={60} y={28} width={240} height={22} rx={4} fill="rgba(0,30,0,0.75)" />
            <text x={80} y={43} fill="#00ff66" fontSize={14} fontFamily="Arial" fontWeight="bold">✓ POSITION FORTIFIED</text>
          </g>
        )}
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
