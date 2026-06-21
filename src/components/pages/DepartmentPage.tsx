import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

interface DepartmentPageProps {
  id: string;
  name: string;
  onBack: () => void;
}

export const DepartmentPage = ({ id, name, onBack }: DepartmentPageProps) => {
  const { playTransition } = useSound();

  useEffect(() => {
    playTransition();
  }, [playTransition]);

  return (
    <motion.div 
      layoutId={`dept-${id}`}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      className="fixed inset-0 z-[200] bg-[var(--color-bg-secondary)] overflow-y-auto"
      data-lenis-prevent="true"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <button 
          onClick={onBack}
          className="group flex items-center gap-4 text-[var(--color-text-main)] hover:text-[var(--color-accent-primary)] transition-colors mb-16"
        >
          <div className="w-12 h-12 rounded-full border border-[var(--color-border-main)] flex items-center justify-center group-hover:border-[var(--color-accent-primary)] transition-colors bg-[var(--color-bg-main)]">
            <ArrowLeft className="w-6 h-6" />
          </div>
          <span className="font-['Inter'] tracking-widest uppercase text-sm">Back to Home</span>
        </button>

        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-[6rem] font-['Britannic_Bold'] text-[var(--color-accent-primary)] uppercase tracking-[0.1em] leading-none mb-12"
        >
          {name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <div className="space-y-8 text-[var(--color-text-main)]/70 font-['Inter'] text-lg leading-relaxed">
            <p>
              Welcome to the official {name} department page. Here we orchestrate the finest events and competitions of the entire festival.
            </p>
            <p>
              Stay tuned! More information, specific event schedules, and registration portals will be populated here shortly as we approach the final dates.
            </p>
          </div>
          
          <div className="h-[400px] rounded-3xl bg-[var(--color-bg-main)] border border-[var(--color-border-main)]/30 flex items-center justify-center">
            <span className="text-[var(--color-text-main)]/30 font-['Boldonse'] text-3xl uppercase tracking-widest text-center px-8">Coming Soon</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
