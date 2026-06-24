import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { useGamification } from '../../context/GamificationContext';

const funFacts = [
  { id: 1, title: 'Legacy Since 1979', fact: "Malhar has been a cornerstone of cultural expression for over four decades, growing from a local college fest to one of Asia's largest." },
  { id: 2, title: '30,000+ Footfall', fact: 'Every year, our campus transforms to welcome tens of thousands of enthusiastic visitors from across the country.' },
  { id: 3, title: '1200+ Workforce', fact: 'The entire festival is conceptualized, planned, and executed by a dedicated, entirely student-run workforce.' },
  { id: 4, title: 'Theme Magic', fact: 'Every single year brings a completely fresh theme, totally transforming the aesthetic and vibe of the campus.' },
  { id: 5, title: 'Global Conclave', fact: 'Our flagship Conclave event consistently brings world-renowned speakers and visionaries to our historic halls.' },
  { id: 6, title: 'Social Cause', fact: 'Malhar is deeply rooted in giving back, consistently supporting local NGOs and social impact initiatives.' }
];

const FlipCard = ({ fact, idx }: { fact: any, idx: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { discoverFrog, foundFrogs } = useGamification();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
      className="relative w-full h-[320px] perspective-1000 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d duration-300 shadow-2xl"
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.8 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of Card (Obsidian Monolith) */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border-main)]/20 p-8 md:p-10 rounded-[2rem] overflow-hidden flex flex-col justify-center items-center text-center transition-all duration-500"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Noise and Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-secondary)] via-[var(--color-bg-main)] to-[var(--color-bg-main)]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
          
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <HelpCircle className="w-12 h-12 text-[var(--color-accent-primary)]/80 mb-8 drop-shadow-[0_0_15px_rgba(var(--color-accent-primary-rgb),0.5)] group-hover:scale-110 transition-transform duration-500 relative z-10" />
          
          <h4 className="text-2xl md:text-3xl font-['Britannic_Bold'] text-[var(--color-text-main)] uppercase tracking-[0.2em] drop-shadow-lg relative z-10">
            {fact.title}
          </h4>
          
          <span className="text-[var(--color-accent-primary)] font-['Boldonse'] text-8xl md:text-9xl opacity-[0.03] absolute -bottom-8 right-2 pointer-events-none z-0">
            {`0${fact.id}`}
          </span>
          
          {/* Inner glowing border */}
          <div className="absolute inset-0 border-[1px] border-white/5 rounded-[2rem] m-2 pointer-events-none" />
        </div>

        {/* Back of Card (Glowing Reveal) */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden bg-[var(--color-accent-primary)] border border-[var(--color-accent-primary)] p-8 md:p-10 rounded-[2rem] overflow-hidden flex flex-col justify-center shadow-[0_0_30px_rgba(var(--color-accent-primary-rgb),0.3)]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Deep inner shadow to make text pop */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay" />
          
          <div className="relative z-10">
            <h4 className="text-sm font-['Inter'] font-black tracking-[0.3em] text-[var(--color-bg-main)]/70 uppercase mb-6 flex items-center gap-4">
              <div className="h-[2px] w-8 bg-[var(--color-bg-main)]/50" />
              Did you know
            </h4>
            <p className="text-[var(--color-bg-main)] font-['Inter'] leading-[1.8] text-base md:text-lg font-semibold drop-shadow-md">
              {fact.fact}
            </p>
          </div>
          
          {/* Inner reflection */}
          <div className="absolute inset-0 border-2 rounded-[2rem] border-white/20 pointer-events-none m-2" />
          
          {fact.id === 6 && !foundFrogs.includes('frog5') && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                discoverFrog('frog5');
              }}
              className="absolute bottom-6 right-6 z-50 text-3xl transition-all duration-300 opacity-0 hover:opacity-100 hover:scale-125 filter grayscale hover:grayscale-0 animate-pulse"
              title="You found a frog!"
            >
              🐸
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const FunFacts = () => {
  return (
    <section className="relative w-full py-24 bg-[var(--color-bg-main)] overflow-hidden">
      <div className="w-[95vw] max-w-[1800px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16 border-b border-[var(--color-text-main)]/30 pb-4">
          <h2 className="text-[var(--color-accent-secondary)] font-['Inter'] tracking-[0.3em] mb-2 text-sm font-bold uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            Did You Know?
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-['Boldonse'] text-[var(--color-text-main)] uppercase tracking-wider drop-shadow-md">
            Fun Facts
          </h3>
        </div>

        {/* Content Container */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {funFacts.map((fact, idx) => (
              <FlipCard key={fact.id} fact={fact} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
