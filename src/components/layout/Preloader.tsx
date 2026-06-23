import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('ARCHIVES');
  const targetText = 'ARCHIVES';

  useEffect(() => {
    // Progress interval
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 600); // Wait a bit before fading out
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 5;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Scramble effect
  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setText(prev =>
        prev
          .split('')
          .map((letter, index) => {
            if (index < iterations) {
              return targetText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iterations >= targetText.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [targetText]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-[var(--color-bg-main)] flex flex-col items-center justify-center transition-colors duration-500 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-12 pointer-events-none opacity-20">
        <div className="flex justify-between font-['Inter'] text-xs tracking-widest text-[var(--color-text-main)]">
          <span>SYS.BOOT.V1.4.2</span>
          <span>INITIATING</span>
        </div>
        <div className="flex justify-between font-['Inter'] text-xs tracking-widest text-[var(--color-text-main)]">
          <span>{progress.toString().padStart(3, '0')}%</span>
          <span>LOADING ASSETS</span>
        </div>
      </div>

      <div className="text-center relative z-10 w-full px-6">
        <motion.h1 className="text-6xl md:text-8xl lg:text-[120px] font-['Britannic_Bold'] text-[var(--color-accent-primary)] mb-8 tracking-widest uppercase transition-colors duration-500">
          {text}
        </motion.h1>

        {/* Progress bar container */}
        <div className="w-full max-w-2xl h-[1px] bg-[var(--color-border-main)]/30 mx-auto overflow-hidden relative">
          {/* Animated fill */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-[var(--color-accent-primary)] transition-colors duration-500"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear', duration: 0.1 }}
          />
        </div>

        <div className="mt-8 overflow-hidden h-6">
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: progress === 100 ? 0 : 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="text-[var(--color-text-main)]/50 font-['Inter'] tracking-[0.3em] text-sm uppercase"
          >
            SYSTEM READY
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
