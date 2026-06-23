import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Layers } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

interface DomainPageProps {
  id: string;
  title: string;
  image?: string;
  description: string;
  departments: string[];
  onBack: () => void;
  onNavigateTeam?: (dept: string) => void;
}

const DepartmentCarousel = ({ departments, playHover, onNavigateTeam }: { departments: string[], playHover: () => void, onNavigateTeam?: (dept: string) => void }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const len = departments.length;

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center mt-12" style={{ perspective: '1200px' }}>
      {departments.map((dept, index) => {
        let offset = index - activeIndex;
        // Circular wrap-around to avoid empty space
        if (offset > len / 2) offset -= len;
        if (offset < -len / 2) offset += len;

        const isCenter = offset === 0;
        
        // 3D positioning math
        const x = offset * 260; // horizontal spacing
        const z = Math.abs(offset) * -220; // depth
        const rotateY = offset === 0 ? 0 : offset > 0 ? -40 : 40; // angled inwards
        const opacity = Math.abs(offset) > 3 ? 0 : 1; // hide items far away
        const pointerEvents = opacity === 0 ? 'none' : 'auto';
        const zIndex = 50 - Math.abs(offset);
        
        return (
          <motion.div
            key={dept}
            onClick={() => {
              if (isCenter && onNavigateTeam) {
                onNavigateTeam(dept);
              } else {
                setActiveIndex(index);
              }
              playHover();
            }}
            animate={{
              x,
              z,
              rotateY,
              opacity,
              scale: isCenter ? 1 : 0.85
            }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 150, damping: 20 }}
            className={`absolute w-[340px] h-[480px] rounded-3xl border flex items-center justify-center cursor-pointer transition-colors duration-500 overflow-hidden shadow-2xl ${
              isCenter 
                ? 'bg-[var(--color-bg-secondary)]/90 backdrop-blur-xl border-[var(--color-accent-primary)] shadow-[0_0_40px_rgba(var(--color-accent-primary-rgb),0.3)]' 
                : 'bg-[var(--color-bg-main)]/90 backdrop-blur-md border-[var(--color-border-main)]/40'
            }`}
            style={{ 
              transformStyle: 'preserve-3d', 
              outline: '1px solid transparent',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              zIndex, 
              pointerEvents 
            }}
          >
            {/* Subtle inner gradient */}
            <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-bg-main)]/50 ${isCenter ? 'opacity-50' : 'opacity-80'}`} />
            
            <h3 
              className={`font-['Boldonse'] text-3xl uppercase tracking-widest text-center px-8 relative z-10 transition-colors duration-500 leading-tight ${
                isCenter ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-main)]/40'
              }`}
            >
              {dept}
            </h3>
          </motion.div>
        );
      })}
    </div>
  );
};

export const DomainPage = ({ id, title, image, description, departments, onBack, onNavigateTeam }: DomainPageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { playTransition, playHover } = useSound();

  useEffect(() => {
    playTransition();
  }, [playTransition]);

  return (
    <motion.div
      ref={containerRef}
      layoutId={`domain-${id}`}
      exit={{
        opacity: 0,
        scale: 0.95,
        filter: 'blur(10px)',
        transition: { duration: 0.4, ease: 'easeOut' },
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
      className="fixed inset-0 z-[200] bg-[var(--color-bg-main)] overflow-y-auto overflow-x-hidden"
      data-lenis-prevent="true"
    >
      <div className="absolute top-20 left-0 w-full pointer-events-none select-none opacity-[0.03]">
        <h1 className="text-[25vw] font-['Britannic_Bold'] whitespace-nowrap text-[var(--color-text-main)] text-center leading-none">
          {title}
        </h1>
      </div>

      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-[var(--color-accent-primary)]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[var(--color-accent-secondary)]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="fixed top-8 left-8 md:top-12 md:left-12 z-50">
        <button
          onClick={onBack}
          onMouseEnter={playHover}
          className="group flex items-center gap-4 bg-[var(--color-bg-secondary)]/80 backdrop-blur-md px-6 py-3 rounded-full border border-[var(--color-border-main)]/50 hover:border-[var(--color-accent-primary)] transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_rgba(var(--color-accent-primary-rgb),0.2)] no-cursor-scale"
        >
          <ArrowLeft className="w-5 h-5 text-[var(--color-accent-primary)] group-hover:-translate-x-1 transition-transform" />
          <span className="font-['Inter'] tracking-widest uppercase text-xs font-bold text-[var(--color-text-main)]">
            Return
          </span>
        </button>
      </div>

      <div
        className="max-w-7xl mx-auto px-6 pt-40 pb-24 relative z-10"
        style={{ perspective: '1000px' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
          <div className="lg:col-span-8 lg:col-start-3 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--color-accent-secondary)]/50 bg-[var(--color-bg-secondary)]/80 backdrop-blur-xl mb-10 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-accent-secondary)]/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

              <Layers className="w-5 h-5 text-[var(--color-accent-secondary)] drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] relative z-10" />
              <span className="font-['Inter'] uppercase tracking-[0.3em] text-[var(--color-accent-secondary)] text-sm font-bold relative z-10 drop-shadow-md">
                Domain Overview
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-[8rem] lg:text-[10rem] font-['Britannic_Bold'] text-[var(--color-accent-primary)] uppercase tracking-[0.1em] leading-[0.9] mb-12 drop-shadow-2xl"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-3xl font-['Inter'] text-[var(--color-text-main)]/80 leading-relaxed max-w-4xl mx-auto font-light"
            >
              {description}
            </motion.p>
            
            {image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 1, type: 'spring' }}
                className="w-full max-w-5xl mx-auto h-[300px] md:h-[450px] mt-16 rounded-[2.5rem] overflow-hidden relative shadow-[0_0_50px_rgba(var(--color-accent-primary-rgb),0.1)] border border-[var(--color-border-main)]/30 group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-main)]/80 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-[var(--color-accent-primary)]/10 mix-blend-overlay z-10" />
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out" 
                />
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative w-full"
        >
          <div className="flex items-center justify-center gap-6 mb-16">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[var(--color-accent-secondary)]" />
            <h2 className="text-3xl font-['Boldonse'] uppercase text-[var(--color-text-main)] tracking-widest">
              Departments
            </h2>
            <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[var(--color-accent-secondary)]" />
          </div>

          <div className="w-full">
            <DepartmentCarousel departments={departments} playHover={playHover} onNavigateTeam={onNavigateTeam} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
