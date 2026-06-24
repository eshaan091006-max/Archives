import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GamificationContextType {
  foundFrogs: string[];
  poemUnlocked: boolean;
  showProgress: boolean;
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
    <GamificationContext.Provider value={{ foundFrogs, poemUnlocked, showProgress, discoverFrog, unlockPoem, closePoem }}>
      {children}
    </GamificationContext.Provider>
  );
};
export const GamificationNotification = () => {
  const { showProgress, foundFrogs } = useGamification();

  return (
    <AnimatePresence>
      {showProgress && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-8 left-8 z-[100] pointer-events-none"
        >
          <div className="bg-[var(--color-bg-secondary)]/90 backdrop-blur-xl border-2 border-[var(--color-accent-primary)]/50 rounded-2xl p-4 shadow-[0_0_20px_rgba(var(--color-accent-primary-rgb),0.3)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--color-accent-primary)]/20 border-2 border-[var(--color-accent-primary)]/50 flex items-center justify-center text-2xl">
              🐸
            </div>
            <div>
              <p className="text-[var(--color-text-main)] font-['Inter'] font-extrabold text-sm tracking-widest uppercase drop-shadow-md">
                {foundFrogs.length === 5 ? "Secret Unlocked!" : "Frog Discovered"}
              </p>
              <p className="text-[var(--color-accent-primary)] font-['Boldonse'] text-2xl drop-shadow-lg">
                {foundFrogs.length} / 5 Found
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};
