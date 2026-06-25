import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { YearKey, themeContent } from '../../lib/themeData';

interface ThemeSweepProps {
  currentYear: YearKey;
  targetYear: YearKey | null;
  onTransitionHalfway: () => void;
  onTransitionComplete: () => void;
}

export const ThemeSweepTransition = ({
  currentYear,
  targetYear,
  onTransitionHalfway,
  onTransitionComplete,
}: ThemeSweepProps) => {
  const [animating, setAnimating] = useState(false);
  const [activeSweepColor, setActiveSweepColor] = useState<string>('');

  useEffect(() => {
    if (targetYear && targetYear !== currentYear) {
      setAnimating(true);
      const incomingColor = themeContent[targetYear]?.accentColor || '#ffffff';
      setActiveSweepColor(incomingColor);
    }
  }, [targetYear, currentYear]);

  if (!animating || !targetYear) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Diagonal curtain sweep using clipPath */}
        <motion.div
          className="absolute inset-0 pointer-events-auto"
          style={{
            backgroundColor: activeSweepColor,
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
              onTransitionHalfway();
            } else if (definition === 'exit') {
              setAnimating(false);
              onTransitionComplete();
            }
          }}
        />
        
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
