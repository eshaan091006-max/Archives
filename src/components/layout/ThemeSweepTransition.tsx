import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { YearKey } from '../../lib/themeData';

interface ThemeSweepProps {
  currentYear: YearKey;
  targetYear: YearKey | null;
  onTransitionHalfway: () => void;
  onTransitionComplete: () => void;
}

const sweepGradients: Record<YearKey, string> = {
  '2023': 'linear-gradient(135deg, #090715 0%, #27143c 50%, #19baf1 100%)',
  '2024': 'linear-gradient(135deg, #0e0f11 0%, #41060a 50%, #f7b249 100%)',
  '2025': 'linear-gradient(135deg, #030f1b 0%, #021e34 50%, #c9a84c 100%)',
};

export const ThemeSweepTransition = ({
  currentYear,
  targetYear,
  onTransitionHalfway,
  onTransitionComplete,
}: ThemeSweepProps) => {
  const [phase, setPhase] = useState<'hidden' | 'visible' | 'exit'>('hidden');
  const [activeSweepGradient, setActiveSweepGradient] = useState<string>('');

  useEffect(() => {
    if (targetYear && targetYear !== currentYear) {
      setPhase('visible');
      const grad = sweepGradients[targetYear] || 'linear-gradient(135deg, #000000 0%, #333333 100%)';
      setActiveSweepGradient(grad);
    }
  }, [targetYear, currentYear]);

  if (phase === 'hidden' || !targetYear) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
        initial="hidden"
        animate={phase}
      >
        {/* Diagonal curtain sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-auto overflow-hidden"
          style={{
            background: activeSweepGradient,
          }}
          variants={{
            hidden: {
              clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
            },
            visible: {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              transition: {
                duration: 0.65,
                ease: [0.76, 0, 0.24, 1],
              },
            },
            exit: {
              clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
              transition: {
                duration: 0.65,
                ease: [0.76, 0, 0.24, 1],
              },
            },
          }}
          onAnimationComplete={(definition) => {
            if (definition === 'visible') {
              // Halfway: change the theme
              onTransitionHalfway();
              // Immediately start the exit phase
              setPhase('exit');
            } else if (definition === 'exit') {
              setPhase('hidden');
              onTransitionComplete();
            }
          }}
        >
          {/* Animated Film Grain Overlay inside the sweep curtain */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-difference select-none overflow-hidden w-full h-full">
            <svg className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] animate-[sweepGrain_8s_steps(10)_infinite]" xmlns="http://www.w3.org/2000/svg">
              <filter id="sweepNoise">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.8"
                  numOctaves="3"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#sweepNoise)" />
            </svg>
            <style>
              {`
                @keyframes sweepGrain {
                  0%, 100% { transform: translate(0, 0); }
                  10% { transform: translate(-5%, -10%); }
                  20% { transform: translate(-15%, 5%); }
                  30% { transform: translate(7%, -25%); }
                  40% { transform: translate(-5%, 25%); }
                  50% { transform: translate(-15%, 10%); }
                  60% { transform: translate(15%, 0%); }
                  70% { transform: translate(0%, 15%); }
                  80% { transform: translate(3%, 35%); }
                  90% { transform: translate(-10%, 10%); }
                }
              `}
            </style>
          </div>
        </motion.div>
        
        {/* Central themed glass container */}
        <motion.div
          className="relative z-10 w-64 h-64 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center shadow-2xl"
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: { 
              scale: 1, 
              opacity: 1, 
              transition: { delay: 0.25, duration: 0.4, type: 'spring', stiffness: 150, damping: 15 } 
            },
            exit: { 
              scale: 1.5, 
              opacity: 0, 
              transition: { duration: 0.3 } 
            }
          }}
        >
          <span className="text-[10px] tracking-[0.4em] font-semibold text-white/50 uppercase mb-2">ENTERING</span>
          <span className="text-4xl font-['Britannic_Bold'] text-white tracking-widest uppercase mb-1">
            MALHAR
          </span>
          <span className="text-2xl font-['Britannic_Bold'] text-white/90">
            {targetYear}
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
