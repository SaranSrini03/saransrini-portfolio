'use client';

import { useEffect, useRef } from 'react';

type TrailPoint = { x: number; y: number; size: number };
type Comet = {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  curve: number;
  trail: TrailPoint[];
  hue: number;
  brightness: number;
};

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const stars = useRef<{x: number, y: number, size: number, speed: number}[]>([]);
  const comets = useRef<Comet[]>([]);
  const lastTime = useRef<number>(0);
  const cometSpawnTime = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize stars
    const initStars = () => {
      const starCount = Math.floor((window.innerWidth * window.innerHeight) / 14000);
      stars.current = Array(starCount).fill(0).map(() => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        size: Math.random() * 1.5,
        speed: 0.1 + Math.random() * 0.5
      }));
    };

    // Create a new comet with more interesting paths
    const createComet = () => {
      // Choose between different types of comets
      const cometType = Math.floor(Math.random() * 3);
      let x: number, y: number, angle: number;

      // Base comet properties
      const size = 1 + Math.random() * 1.5;
      const speed = 1.5 + Math.random() * 3; // slower for infrequent, gentle motion
      
      // Different spawn and angle patterns based on comet type
      switch(cometType) {
        case 0: // Horizontal comet
          x = -50;
          y = Math.random() * canvas!.height;
          angle = Math.random() * 0.5 - 0.25; // Slight angle variation
          break;
          
        case 1: // Vertical comet
          x = Math.random() * canvas!.width;
          y = -50;
          angle = Math.PI/2 + (Math.random() * 0.5 - 0.25);
          break;
          
        default: // Diagonal comet
          if (Math.random() > 0.5) {
            x = -50;
            y = Math.random() * canvas!.height * 0.5;
            angle = Math.PI/4 + (Math.random() * 0.5 - 0.25);
          } else {
            x = canvas!.width + 50;
            y = Math.random() * canvas!.height * 0.5;
            angle = (3 * Math.PI/4) + (Math.random() * 0.5 - 0.25);
          }
      }

      // Add some curve to the path
      const curveAmount = (Math.random() * 0.1) - 0.05;
      
      comets.current.push({
        x,
        y,
        size,
        speed,
        angle,
        curve: curveAmount,
        trail: [],
        hue: 0, // Grayscale
        brightness: 0.8 + Math.random() * 0.2 // Slightly brighter for visibility
      });
    };

    // Animation loop
    const animate = (time: number) => {
      if (!ctx || !canvas) return;
      
      const deltaTime = time - lastTime.current;
      lastTime.current = time;
      
      // Clear canvas with black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars in white
      stars.current.forEach(star => {
        // Twinkling effect
        const twinkle = Math.sin(time * 0.001 * star.speed) * 0.5 + 0.5;
        
        // All stars are white with different brightness
        const brightness = 0.5 + (Math.random() * 0.5); // 0.5 to 1.0
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        
        ctx.globalAlpha = 0.7 + (twinkle * 0.3);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Update and draw comets
      ctx.globalAlpha = 1;
      const currentTime = time * 0.001; // Convert to seconds
      
      // Spawn new comets more frequently
      if (currentTime - cometSpawnTime.current > 4 + Math.random() * 3) {
        createComet();
        cometSpawnTime.current = currentTime;
      }
      
      // Update and draw comets
      for (let i = comets.current.length - 1; i >= 0; i--) {
        const comet = comets.current[i];
        
        // Update position with curve
        comet.angle += comet.curve * (deltaTime * 0.01);
        const moveX = Math.cos(comet.angle) * comet.speed * (deltaTime * 0.1);
        const moveY = Math.sin(comet.angle) * comet.speed * (deltaTime * 0.1);
        
        comet.x += moveX;
        comet.y += moveY;
        
        // Add current position to trail
        comet.trail.push({ 
          x: comet.x, 
          y: comet.y,
          size: comet.size * (1 - (comet.trail.length / 30))
        });
        
        // Limit trail length with variable size
        if (comet.trail.length > 30) {
          comet.trail.shift();
        }
        
        // Draw trail with gradient and varying width
        if (comet.trail.length > 1) {
          // Create gradient for trail
          const gradient = ctx.createLinearGradient(
            comet.trail[0].x, 
            comet.trail[0].y, 
            comet.x, 
            comet.y
          );
          
          // Set white color for comet trails
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)'); // White with opacity
          gradient.addColorStop(1, 'rgba(200, 200, 200, 0)');
          
          // Draw the trail with varying width
          for (let j = 1; j < comet.trail.length; j++) {
            const start = comet.trail[j - 1];
            const end = j < comet.trail.length - 1 ? comet.trail[j] : { x: comet.x, y: comet.y };
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * (j / comet.trail.length)})`; // White with varying opacity
            ctx.lineWidth = start.size || 1;
            ctx.lineCap = 'round';
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
          }
        }
        
        // Draw comet head with glow
        const gradient = ctx.createRadialGradient(
          comet.x, 
          comet.y, 
          0, 
          comet.x, 
          comet.y, 
          comet.size * 2
        );
        
        gradient.addColorStop(0, 'rgba(192, 132, 252, 1)'); // Solid purple
        gradient.addColorStop(0.5, 'rgba(192, 132, 252, 0.5)'); // Semi-transparent purple
        gradient.addColorStop(1, 'rgba(192, 132, 252, 0)'); // Fade to transparent
        
        // Draw glow
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, comet.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw core with white center
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, comet.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        // Purple glow around the white core
        ctx.fillStyle = 'rgba(192, 132, 252, 0.5)';
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, comet.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
        
        // Remove comets that are far outside the viewport
        if (comet.x < -100 || comet.x > canvas.width + 100 || 
            comet.y < -100 || comet.y > canvas.height + 100) {
          comets.current.splice(i, 1);
        }
      }
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    // Initial setup
    resizeCanvas();
    initStars();
    
    // Start animation
    animationFrameId.current = requestAnimationFrame(animate);
    
    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
      initStars();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default SpaceBackground;
