import React from 'react';

const BackgroundGrid = () => (
  <div 
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      '--grid-color': 'rgba(255, 255, 255, 0.03)',
      '--grid-size': '40px',
      backgroundImage: 'linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)',
      backgroundSize: 'var(--grid-size) var(--grid-size)',
      maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%,rgba(0,0,0,0.5) 50%,rgba(0,0,0,0) 100%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%,rgba(0,0,0,0.5) 50%,rgba(0,0,0,0) 100%)',
    } as React.CSSProperties}
  />
);

export default BackgroundGrid;
