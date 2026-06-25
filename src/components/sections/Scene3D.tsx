import React from 'react';
import { motion } from 'framer-motion';
import { usePerformance } from '../../hooks/usePerformance';

export const Scene3D = ({ accentColor }: { accentColor: string }) => {
  const { isLowEnd } = usePerformance();
  // A clean SVG noise texture to make the gradient look premium (stops color banding)
  const noiseData =
    "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen">
      {/* Blob 1: Theme Accent Color */}
      <motion.div
        animate={
          isLowEnd
            ? { x: '-20%', y: '-20%' }
            : {
                x: ['-20%', '20%', '-20%'],
                y: ['-20%', '20%', '-20%'],
                rotate: [0, 90, 0],
                scale: [1, 1.3, 1],
              }
        }
        transition={isLowEnd ? { duration: 0 } : { duration: 25, repeat: Infinity, ease: 'linear' }}
        className={`absolute -top-[50%] -left-[50%] w-[200%] h-[200%] rounded-[100%] ${isLowEnd ? 'opacity-30' : 'blur-[120px] opacity-40'} md:opacity-50`}
        style={{
          background: `radial-gradient(circle at center, ${accentColor}, transparent 60%)`,
          willChange: 'transform',
        }}
      />

      {/* Blob 2: Secondary Background Color */}
      <motion.div
        animate={
          isLowEnd
            ? { x: '20%', y: '20%' }
            : {
                x: ['20%', '-20%', '20%'],
                y: ['20%', '-20%', '20%'],
                rotate: [0, -90, 0],
                scale: [1, 1.5, 1],
              }
        }
        transition={isLowEnd ? { duration: 0 } : { duration: 30, repeat: Infinity, ease: 'linear' }}
        className={`absolute -bottom-[50%] -right-[50%] w-[200%] h-[200%] rounded-[100%] ${isLowEnd ? 'opacity-30' : 'blur-[140px] opacity-40'} md:opacity-50`}
        style={{
          background: `radial-gradient(circle at center, var(--color-bg-tertiary), transparent 60%)`,
          willChange: 'transform',
        }}
      />

      {/* Blob 3: Secondary Accent Color */}
      <motion.div
        animate={
          isLowEnd
            ? { x: '-10%', y: '10%' }
            : {
                x: ['-10%', '10%', '-10%'],
                y: ['10%', '-10%', '10%'],
                scale: [1, 1.2, 1],
              }
        }
        transition={isLowEnd ? { duration: 0 } : { duration: 20, repeat: Infinity, ease: 'linear' }}
        className={`absolute top-[10%] left-[10%] w-[150%] h-[150%] rounded-[100%] ${isLowEnd ? 'opacity-20' : 'blur-[100px] opacity-30'} md:opacity-40`}
        style={{
          background: `radial-gradient(circle at center, var(--color-accent-secondary), transparent 70%)`,
          willChange: 'transform',
        }}
      />

      {/* Noise Overlay for premium matte finish */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${noiseData}")` }}
      />
    </div>
  );
};
