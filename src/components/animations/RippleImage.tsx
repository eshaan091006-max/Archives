import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface RippleImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const RippleImage = ({ src, alt, className = '' }: RippleImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [id] = useState(() => Math.random().toString(36).substr(2, 9));
  
  // Spring physics for the displacement intensity
  const springConfig = { damping: 20, stiffness: 80, mass: 0.5 };
  const filterScale = useSpring(0, springConfig);

  const handleMouseMove = () => {
    if (!ref.current) return;
    
    // Ramp up displacement when moving
    filterScale.set(100);
    
    // Auto reset to 0 after movement stops to let the ripple settle
    clearTimeout((ref.current as any)._timeoutId);
    (ref.current as any)._timeoutId = setTimeout(() => {
      filterScale.set(0);
    }, 150);
  };

  const handleMouseLeave = () => {
    filterScale.set(0);
  };

  return (
    <div 
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg className="hidden w-0 h-0 absolute">
        <filter id={`ripple-${id}`}>
          {/* Generate base liquid noise */}
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
          {/* Displace the image using the noise */}
          <motion.feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale={filterScale} 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
      </svg>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
        style={{ filter: `url(#ripple-${id})` }}
      />
    </div>
  );
};
