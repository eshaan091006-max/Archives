import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

interface GamificationContextType {
  foundFrogs: string[];
  poemUnlocked: boolean;
  discoverFrog: (id: string) => void;
  unlockPoem: () => void;
  closePoem: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const [foundFrogs, setFoundFrogs] = useState<string[]>([]);
  const [poemUnlocked, setPoemUnlocked] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    if (foundFrogs.length > 0 && foundFrogs.length < 5) {
      setShowProgress(true);
      const timer = setTimeout(() => setShowProgress(false), 3000);
      return () => clearTimeout(timer);
    }
    
    if (foundFrogs.length === 5) {
      setShowProgress(true);
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
      
      const timer = setTimeout(() => setShowProgress(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [foundFrogs.length]);

  const discoverFrog = (id: string) => {
    setFoundFrogs((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const unlockPoem = () => {
    setPoemUnlocked(true);
  };

  const closePoem = () => {
    setPoemUnlocked(false);
  };

  return (
    <GamificationContext.Provider value={{ foundFrogs, poemUnlocked, discoverFrog, unlockPoem, closePoem }}>
      {children}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 left-8 z-[100] pointer-events-none"
          >
            <div className="bg-[var(--color-bg-secondary)]/90 backdrop-blur-md border border-[var(--color-border-main)]/30 rounded-2xl p-4 shadow-2xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent-primary)]/10 border border-[var(--color-accent-primary)]/30 flex items-center justify-center text-xl">
                🐸
              </div>
              <div>
                <p className="text-[var(--color-text-main)] font-['Inter'] font-bold text-sm tracking-widest uppercase">
                  {foundFrogs.length === 5 ? "Secret Unlocked!" : "Frog Discovered"}
                </p>
                <p className="text-[var(--color-accent-primary)] font-['Boldonse'] text-xl">
                  {foundFrogs.length} / 5 Found
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};
