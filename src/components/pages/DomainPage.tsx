import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Layers } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

interface DomainPageProps {
  id: string;
  title: string;
  description: string;
  departments: string[];
  onBack: () => void;
}

const MagneticDepartmentCard = ({ dept, index, playHover }: { dept: string, index: number, playHover: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 + (index * 0.1), type: "spring", stiffness: 100 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHover}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative overflow-hidden rounded-3xl bg-[var(--color-bg-secondary)]/40 backdrop-blur-xl border border-[var(--color-border-main)]/50 hover:border-[var(--color-accent-primary)] transition-colors duration-500 cursor-pointer no-cursor-scale shadow-lg"
    >
      {/* 3D Glare Effect */}
      <motion.div 
        style={{ left: glareX, top: glareY, transform: 'translate(-50%, -50%)' }}
        className="absolute w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(var(--color-accent-primary-rgb),0.3)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
      />
      
      <div className="p-8 md:p-10 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6 relative z-10" style={{ transform: "translateZ(30px)" }}>
        <div className="flex items-center gap-6 md:gap-8">
          <span className="text-5xl font-['Britannic_Bold'] text-[var(--color-accent-secondary)]/20 group-hover:text-[var(--color-accent-secondary)]/50 transition-colors duration-500">
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <h3 className="text-2xl md:text-3xl font-['Boldonse'] text-[var(--color-text-main)] uppercase tracking-wide group-hover:text-[var(--color-accent-primary)] transition-colors duration-500 leading-tight">
            {dept}
          </h3>
        </div>
        
        <div style={{ transform: "translateZ(50px)" }} className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-full border border-[var(--color-border-main)] flex items-center justify-center group-hover:bg-[var(--color-accent-primary)] group-hover:border-[var(--color-accent-primary)] transition-all duration-500 group-hover:rotate-45 ml-auto md:ml-0">
          <ArrowUpRight className="w-6 h-6 text-[var(--color-text-main)] group-hover:text-[var(--color-bg-main)] transition-colors duration-500" />
        </div>
      </div>
    </motion.div>
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
          <span className="font-['Inter'] tracking-widest uppercase text-xs font-bold text-[var(--color-text-main)]">Return</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-40 pb-24 relative z-10" style={{ perspective: "1000px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
          <div className="lg:col-span-8 lg:col-start-3 text-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {departments.map((dept, index) => (
              <MagneticDepartmentCard key={dept} dept={dept} index={index} playHover={playHover} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
