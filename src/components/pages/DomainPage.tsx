import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

interface DomainPageProps {
  id: string;
  title: string;
  description: string;
  departments: string[];
  onBack: () => void;
}

const CoverflowCarousel = ({ departments, playHover }: { departments: string[], playHover: () => void }) => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(departments.length / 2));

  return (
    <div className="relative w-full h-[60vh] flex items-center justify-center mt-12" style={{ perspective: "1500px" }}>
      {departments.map((dept, index) => {
        const offset = index - activeIndex;
        const absOffset = Math.abs(offset);
        const isActive = offset === 0;
        
        // Match the 3D angle from the reference image
        let rotateY = 0;
        if (offset < 0) rotateY = 35;
        if (offset > 0) rotateY = -35;

        // Ensure proper z-index layering
        const zIndex = 100 - absOffset;

        return (
          <motion.div
            key={dept}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={playHover}
            data-cursor="explore"
            animate={{
              rotateY: isActive ? 0 : rotateY,
              z: isActive ? 100 : -absOffset * 200,
              x: offset * 280,
              scale: isActive ? 1.1 : 0.9,
              opacity: absOffset > 3 ? 0 : 1 - (absOffset * 0.3)
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`absolute w-[240px] md:w-[320px] h-[360px] md:h-[480px] flex items-center justify-center p-8 cursor-pointer transition-colors duration-500 ${
              isActive 
                ? 'border-[2px] border-[var(--color-accent-primary)] bg-gradient-to-b from-[var(--color-accent-primary)]/20 to-[var(--color-bg-main)]/90 shadow-[0_0_50px_rgba(var(--color-accent-primary-rgb),0.3)]' 
                : 'border border-[var(--color-accent-secondary)]/40 bg-[var(--color-bg-secondary)]/80 hover:border-[var(--color-accent-secondary)]'
            }`}
            style={{ 
              transformStyle: 'preserve-3d',
              zIndex: zIndex
            }}
          >
            {/* The text inside the card */}
            <h3 className={`text-2xl md:text-4xl font-['Boldonse'] uppercase tracking-widest text-center transition-colors duration-500 drop-shadow-xl ${
              isActive ? 'text-[var(--color-text-main)]' : 'text-[var(--color-text-main)]/40'
            }`}>
              {dept}
            </h3>
          </motion.div>
        );
      })}
    </div>
  );
};

export const DomainPage = ({ id, title, description, departments, onBack }: DomainPageProps) => {
  const { playTransition, playHover } = useSound();

  useEffect(() => {
    playTransition();
  }, [playTransition]);

  return (
    <motion.div 
      layoutId={`domain-${id}`}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      className="fixed inset-0 z-[200] bg-[#0A1016] overflow-y-auto overflow-x-hidden"
      data-lenis-prevent="true"
    >
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-[var(--color-accent-primary)]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[var(--color-accent-secondary)]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Very minimalist Top-Left Back Button to match reference style */}
      <div className="fixed top-8 left-8 md:top-12 md:left-12 z-50">
        <button 
          onClick={onBack}
          onMouseEnter={playHover}
          className="group flex flex-col items-start gap-1 no-cursor-scale"
        >
          <ArrowLeft className="w-6 h-6 text-white/50 group-hover:text-white transition-colors duration-500" />
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-24 pb-24 relative z-10 w-full min-h-screen flex flex-col justify-center">
        
        {/* Header exact match to reference */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full mb-12 pl-12 md:pl-24"
        >
          <h1 className="text-3xl md:text-5xl font-['Boldonse'] text-[#F2C94C] uppercase tracking-widest mb-4">
            {title} DEPARTMENTS
          </h1>
          <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-[#F2C94C] to-transparent opacity-50" />
        </motion.div>

        {/* 3D Coverflow component replacing the grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full"
        >
          <CoverflowCarousel departments={departments} playHover={playHover} />
        </motion.div>

      </div>
    </motion.div>
  );
};
