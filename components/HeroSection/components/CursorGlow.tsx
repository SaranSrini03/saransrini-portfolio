import React from 'react';

interface CursorGlowProps {
  x: number;
  y: number;
}

const CursorGlow: React.FC<CursorGlowProps> = ({ x, y }) => (
  <div
    className="absolute pointer-events-none z-5 w-96 h-96 rounded-full opacity-30 blur-3xl transition-all duration-300"
    style={{
      background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
      left: `${x}%`,
      top: `${y}%`,
      transform: "translate(-50%, -50%)",
    }}
  />
);

export default CursorGlow;
