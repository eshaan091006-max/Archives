import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { ArrowLeft, Users, Star, Award } from 'lucide-react';

const TeamTiltCard = ({
  children,
  className = '',
  glowOpacity = '0.08',
}: {
  children: React.ReactNode;
  className?: string;
  glowOpacity?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
    spotlightX.set(mouseX);
    spotlightY.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative group/tilt transition-all duration-300 rounded-[2rem] border overflow-hidden ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 group-hover/tilt:opacity-100 transition duration-300 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${spotlightX}px ${spotlightY}px,
              rgba(255, 255, 255, ${glowOpacity}),
              transparent 50%
            )
          `,
        }}
      />
      <div style={{ transform: 'translateZ(10px)' }} className="relative z-10 w-full h-full flex flex-col items-center">
        {children}
      </div>
    </motion.div>
  );
};
import { useSound } from '../../hooks/useSound';
import { getTeamData } from '../../lib/teamData';

import { YearKey } from '../../lib/themeData';

interface TeamPageProps {
  department: string;
  year: YearKey;
  onBack: () => void;
}

export const TeamPage = ({ department, year, onBack }: TeamPageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { playTransition, playHover } = useSound();
  const teamData = getTeamData(department);
  const [activeTab, setActiveTab] = useState<'core' | 'workforce'>('core');

  useEffect(() => {
    playTransition();
  }, [playTransition]);

  return (
    <motion.div
      ref={containerRef}
      layoutId={`team-${department}`}
      exit={{
        opacity: 0,
        scale: 0.95,
        filter: 'blur(10px)',
        transition: { duration: 0.4, ease: 'easeOut' },
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
      className="fixed inset-0 z-[300] bg-[var(--color-bg-main)] overflow-y-auto overflow-x-hidden"
      data-lenis-prevent="true"
    >
      {/* Background ambient light */}
      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-[var(--color-accent-primary)]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[var(--color-accent-secondary)]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Back Button */}
      <div className="fixed top-8 left-8 md:top-12 md:left-12 z-50">
        <button
          onClick={onBack}
          onMouseEnter={playHover}
          className="group flex items-center gap-4 bg-[var(--color-bg-secondary)]/80 backdrop-blur-md px-6 py-3 rounded-full border border-[var(--color-border-main)]/50 hover:border-[var(--color-accent-primary)] transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_rgba(var(--color-accent-primary-rgb),0.2)] no-cursor-scale"
        >
          <ArrowLeft className="w-5 h-5 text-[var(--color-accent-primary)] group-hover:-translate-x-1 transition-transform" />
          <span className="font-['Inter'] tracking-widest uppercase text-xs font-bold text-[var(--color-text-main)]">
            Back
          </span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--color-accent-primary)]/50 bg-[var(--color-bg-secondary)]/80 backdrop-blur-xl mb-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <Users className="w-5 h-5 text-[var(--color-accent-primary)] relative z-10" />
            <span className="font-['Inter'] uppercase tracking-[0.3em] text-[var(--color-accent-primary)] text-sm font-bold relative z-10 drop-shadow-md">
              Core Team
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-[8rem] text-center font-['Britannic_Bold'] text-[var(--color-text-main)] uppercase tracking-[0.1em] leading-[1.1] mb-12 drop-shadow-2xl"
          >
            {teamData.department}
          </motion.h1>

          {/* Department Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, type: 'spring' }}
            className="w-full max-w-6xl h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden relative shadow-[0_0_50px_rgba(var(--color-accent-primary-rgb),0.1)] border border-[var(--color-border-main)]/30 group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-main)]/80 via-transparent to-transparent z-10" />
            <img 
              src={teamData.photo} 
              alt={`${teamData.department} Team`} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out" 
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-4 mt-16 mb-8 relative z-10 px-6">
          <button
            onClick={() => setActiveTab('core')}
            className={`px-8 py-3 rounded-full font-['Inter'] font-bold tracking-widest uppercase transition-all duration-300 ${
              activeTab === 'core'
                ? 'bg-[var(--color-accent-primary)] text-[var(--color-bg-main)] shadow-[0_0_20px_rgba(var(--color-accent-primary-rgb),0.4)]'
                : 'border border-[var(--color-border-main)] text-[var(--color-text-main)]/60 hover:text-[var(--color-text-main)] hover:border-[var(--color-accent-primary)]/50'
            }`}
          >
            Core
          </button>
          <button
            onClick={() => setActiveTab('workforce')}
            className={`px-8 py-3 rounded-full font-['Inter'] font-bold tracking-widest uppercase transition-all duration-300 ${
              activeTab === 'workforce'
                ? 'bg-[var(--color-accent-primary)] text-[var(--color-bg-main)] shadow-[0_0_20px_rgba(var(--color-accent-primary-rgb),0.4)]'
                : 'border border-[var(--color-border-main)] text-[var(--color-text-main)]/60 hover:text-[var(--color-text-main)] hover:border-[var(--color-accent-primary)]/50'
            }`}
          >
            Workforce
          </button>
        </div>

        {/* Core Tab */}
        {activeTab === 'core' && (
          <div className="max-w-5xl mx-auto pb-12 mt-8 px-6">
            {/* OC Section */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
              <div className="relative cursor-default">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] rounded-[2rem] blur-xl opacity-20 group-hover/tilt:opacity-40 transition-opacity duration-700" />
                <TeamTiltCard
                  glowOpacity="0.1"
                  className="w-full min-w-[320px] md:min-w-[450px] p-12 bg-[var(--color-bg-secondary)]/80 backdrop-blur-2xl border-[var(--color-accent-primary)]/40 text-center shadow-2xl flex flex-col items-center gap-5 hover:border-[var(--color-accent-primary)]/70 transition-colors"
                >
                  <span className="text-xs font-['Inter'] uppercase tracking-[0.3em] text-[var(--color-accent-primary)] font-bold flex items-center gap-2">
                    Organizer in Charge (OC)
                  </span>
                  <p className="text-5xl font-['Boldonse'] text-[var(--color-text-main)]">{teamData.oc}</p>
                </TeamTiltCard>
              </div>
            </motion.div>

            {/* OGs Section */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col items-center mt-24">
              <div className="flex items-center gap-6 mb-12">
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[var(--color-accent-secondary)]" />
                <h2 className="text-2xl font-['Boldonse'] uppercase text-[var(--color-text-main)] tracking-[0.15em]">Organizers (OGs)</h2>
                <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[var(--color-accent-secondary)]" />
              </div>
              <div className="flex flex-wrap justify-center gap-8 w-full">
                {teamData.ogs.map((og, idx) => (
                  <div key={idx} className="relative min-w-[260px]">
                    <div className="absolute inset-0 bg-[var(--color-accent-secondary)]/15 rounded-[2rem] blur-lg opacity-0 hover:opacity-100 transition-opacity duration-500" />
                    <TeamTiltCard
                      glowOpacity="0.08"
                      className="px-8 py-10 bg-[var(--color-bg-secondary)]/60 backdrop-blur-md border-[var(--color-border-main)]/30 hover:border-[var(--color-accent-secondary)]/50 text-center flex flex-col items-center gap-4 hover:shadow-2xl transition-colors"
                    >
                      <p className="text-xl font-['Inter'] text-[var(--color-text-main)]/90 font-medium tracking-wide">{og}</p>
                    </TeamTiltCard>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Coordis Section */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col items-center mt-24">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--color-border-main)]" />
                <h2 className="text-xs font-['Inter'] uppercase text-[var(--color-text-main)]/50 tracking-[0.25em] font-bold">Coordinators (Coordis)</h2>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--color-border-main)]" />
              </div>
              <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl">
                {teamData.coordis.map((coordi, idx) => (
                  <div key={idx} className="px-8 py-3 rounded-full border border-[var(--color-border-main)]/20 bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm text-center hover:bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-main)]/50 transition-colors duration-300 cursor-default">
                    <p className="text-sm font-['Inter'] text-[var(--color-text-main)]/70 tracking-wide">{coordi}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Workforce Tab */}
        {activeTab === 'workforce' && (
          <div className="max-w-4xl mx-auto pb-24 relative mt-8 px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 relative z-10"
            >
              <div className="flex justify-between items-center mb-6 text-[#F5A623] font-serif text-sm tracking-widest uppercase">
                <span>MALHAR {year}</span>
                <span>{department}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-['Inter'] font-bold text-[var(--color-text-main)] uppercase tracking-wide">
                THE WORKFORCE
              </h2>
              <p className="text-[var(--color-text-main)]/60 font-serif italic mt-2 text-lg">
                The people who made it happen.
              </p>
            </motion.div>

            {/* Diagonal Line Separator */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="w-full h-1 bg-[#F5A623] origin-left rotate-[-2deg] mb-16 relative z-10"
            />

            {/* Watermark Dynamic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] md:text-[500px] font-serif text-white/5 pointer-events-none select-none z-0">
              {year.slice(-2)}
            </div>

            {/* Scrollable Workforce List */}
            <div className="max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-[var(--color-accent-primary)]/50 scrollbar-track-transparent">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-10 gap-x-16 relative z-10 pl-4 md:pl-12">
                {teamData.workforce.map((name, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-6 group"
                  >
                    <span className="text-xl md:text-2xl font-serif text-white/50 w-8 text-right group-hover:text-[#F5A623] transition-colors">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-lg md:text-xl font-['Boldonse'] text-white tracking-widest uppercase group-hover:text-[#F5A623] transition-colors">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
