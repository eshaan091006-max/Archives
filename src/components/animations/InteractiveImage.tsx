import React, { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

interface InteractiveImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const InteractiveImage = ({ src, alt, className = '' }: InteractiveImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <div 
      ref={ref}
      className={`relative overflow-hidden group bg-black ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Base Grayscale/Muted Image */}
      <img 
        src={src} 
        alt={alt} 
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 transition-opacity duration-500"
      />
      
      {/* Full Color Spotlight Image */}
      <motion.div
        className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              black 10%,
              transparent 80%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              black 10%,
              transparent 80%
            )
          `,
        }}
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover scale-105 transition-transform duration-[2s] ease-out group-hover:scale-110" 
        />
      </motion.div>
    </div>
  );
};
