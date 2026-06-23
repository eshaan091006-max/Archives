import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Star, Award } from 'lucide-react';
import { useSound } from '../../hooks/useSound';
import { getTeamData } from '../../lib/teamData';

interface TeamPageProps {
  department: string;
  onBack: () => void;
}

export const TeamPage = ({ department, onBack }: TeamPageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { playTransition, playHover } = useSound();
  const teamData = getTeamData(department);

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
            />
          </motion.div>
        </div>

        {/* Team Members Section */}
        <div className="max-w-5xl mx-auto pb-12">
          
          {/* OC Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="relative group cursor-default">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] rounded-[2rem] blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-700" />
              <div className="relative w-full min-w-[320px] md:min-w-[450px] p-12 rounded-[2rem] bg-[var(--color-bg-secondary)]/80 backdrop-blur-2xl border border-[var(--color-accent-primary)]/40 text-center shadow-2xl flex flex-col items-center gap-5 hover:-translate-y-2 transition-transform duration-500">
                <div className="w-20 h-20 rounded-full bg-[var(--color-bg-main)] border border-[var(--color-accent-primary)] flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(var(--color-accent-primary-rgb),0.3)]">
                  <Award className="w-8 h-8 text-[var(--color-accent-primary)]" />
                </div>
                <span className="text-xs font-['Inter'] uppercase tracking-[0.3em] text-[var(--color-accent-primary)] font-bold flex items-center gap-2">
                  <Award className="w-4 h-4" /> Organizer in Charge (OC)
                </span>
                <p className="text-5xl font-['Boldonse'] text-[var(--color-text-main)]">
                  {teamData.oc}
                </p>
              </div>
            </div>
          </motion.div>

          {/* OGs Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col items-center mt-24"
          >
            <div className="flex items-center gap-6 mb-12">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[var(--color-accent-secondary)]" />
              <h2 className="text-2xl font-['Boldonse'] uppercase text-[var(--color-text-main)] tracking-[0.15em]">
                Organizers (OGs)
              </h2>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[var(--color-accent-secondary)]" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 w-full">
              {teamData.ogs.map((og, idx) => (
                <div key={idx} className="group relative min-w-[260px]">
                  <div className="absolute inset-0 bg-[var(--color-accent-secondary)]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative px-8 py-10 rounded-2xl bg-[var(--color-bg-secondary)]/60 backdrop-blur-md border border-[var(--color-border-main)]/30 group-hover:border-[var(--color-accent-secondary)]/50 text-center transition-all duration-500 flex flex-col items-center gap-4 hover:-translate-y-3 hover:shadow-2xl">
                    <Star className="w-8 h-8 text-[var(--color-accent-secondary)] opacity-40 group-hover:opacity-100 transition-opacity duration-500 mb-2" />
                    <p className="text-xl font-['Inter'] text-[var(--color-text-main)]/90 font-medium tracking-wide">
                      {og}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Coordis Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center mt-24"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--color-border-main)]" />
              <h2 className="text-xs font-['Inter'] uppercase text-[var(--color-text-main)]/50 tracking-[0.25em] font-bold">
                Coordinators (Coordis)
              </h2>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--color-border-main)]" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl">
              {teamData.coordis.map((coordi, idx) => (
                <div key={idx} className="px-8 py-3 rounded-full border border-[var(--color-border-main)]/20 bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm text-center hover:bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-main)]/50 transition-colors duration-300 cursor-default">
                  <p className="text-sm font-['Inter'] text-[var(--color-text-main)]/70 tracking-wide">
                    {coordi}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};
