import React from 'react';

interface Props {
  x: number;
  y: number;
  size?: number;
  color?: string;
  rotation?: number;
}

export const DroneIcon: React.FC<Props> = ({ x, y, size = 60, color = '#ff4422', rotation = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: 'absolute', left: x - size / 2, top: y - size / 2, transform: `rotate(${rotation}deg)` }}>
    {/* Body */}
    <rect x={35} y={35} width={30} height={30} rx={6} fill={color} />
    {/* Arms */}
    <line x1={10} y1={10} x2={40} y2={40} stroke={color} strokeWidth={4} />
    <line x1={90} y1={10} x2={60} y2={40} stroke={color} strokeWidth={4} />
    <line x1={10} y1={90} x2={40} y2={60} stroke={color} strokeWidth={4} />
    <line x1={90} y1={90} x2={60} y2={60} stroke={color} strokeWidth={4} />
    {/* Rotors */}
    {[[10, 10], [90, 10], [10, 90], [90, 90]].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r={12} fill="none" stroke={color} strokeWidth={3} opacity={0.8} />
    ))}
    {/* Camera */}
    <circle cx={50} cy={50} r={6} fill="#111" />
  </svg>
);
