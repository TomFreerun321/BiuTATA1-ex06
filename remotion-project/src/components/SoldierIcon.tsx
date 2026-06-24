import React from 'react';

interface Props {
  x: number;
  y: number;
  size?: number;
  color?: string;
  opacity?: number;
}

export const SoldierIcon: React.FC<Props> = ({ x, y, size = 80, color = '#4a5c3a', opacity = 1 }) => (
  <svg width={size} height={size * 2} viewBox="0 0 40 80"
    style={{ position: 'absolute', left: x - size / 2, top: y - size, opacity }}>
    <circle cx={20} cy={12} r={10} fill={color} />
    <ellipse cx={20} cy={8} rx={13} ry={8} fill="#3a4a2a" />
    <rect x={10} y={22} width={20} height={30} rx={3} fill={color} />
    <rect x={11} y={50} width={8} height={22} rx={2} fill="#3a4a2a" />
    <rect x={21} y={50} width={8} height={22} rx={2} fill="#3a4a2a" />
    <rect x={28} y={25} width={4} height={28} rx={1} fill="#222" />
  </svg>
);
