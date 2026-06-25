import React, { useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { AnimatedDivider } from '../animations/AnimatedDivider';
import { useSound } from '../../hooks/useSound';
import { Marquee } from '../animations/Marquee';
import { ConclaveLineup } from './ConclaveLineup';

const departments = [
  { id: 'wpa', name: 'World Performing Arts' },
  { id: 'ipa', name: 'Indian Performing Arts' },
  { id: 'etcw', name: 'ETCW' },
  { id: 'fa', name: 'Fine Arts' },
  { id: 'la', name: 'Literary Arts' },
];

const SpotlightCard = ({
  dept,
  index,
  onClick,
}: {
  dept: (typeof departments)[0];
  index: number;
  onClick: (dept: any) => void;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { playHover } = useSound();

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.button
      layoutId={`dept-${dept.id}`}
      onClick={() => onClick(dept)}
      onMouseEnter={playHover}
      data-cursor="explore"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      viewport={{ once: true }}
      transition={{
        layout: { type: 'spring', stiffness: 400, damping: 35 },
        default: { delay: index * 0.1 },
      }}
      onMouseMove={handleMouseMove}
      className={`relative group flex flex-col justify-between p-8 md:p-12 min-h-[300px] bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm border border-[var(--color-border-main)]/30 rounded-3xl overflow-hidden hover:border-[var(--color-accent-primary)]/50 transition-colors duration-500 text-left ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 40%
            )
          `,
        }}
      />
      <div className="flex justify-between items-start w-full mb-8 relative z-10">
        <div className="w-16 h-16 rounded-full border border-[var(--color-border-main)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-accent-primary)] group-hover:border-[var(--color-accent-primary)] transition-all duration-500">
          <ArrowUpRight className="w-8 h-8 text-[var(--color-accent-primary)] group-hover:text-[var(--color-bg-main)] transition-colors" />
        </div>
      </div>

      <h3 className="text-4xl md:text-5xl font-['Boldonse'] text-[var(--color-text-main)] transition-colors uppercase leading-[1.1] relative z-10">
        {dept.name}
      </h3>
    </motion.button>
  );
};

export const Events = ({ onNavigate }: { onNavigate: (dept: any) => void }) => {
  const [activeTab, setActiveTab] = useState<'events' | 'conclave'>('events');

  return (
    <section
      id="events"
      className="relative py-32 bg-[var(--color-bg-main)] overflow-hidden transition-colors duration-500 min-h-screen"
    >
      {/* Background Marquee */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-0 pointer-events-none flex flex-col gap-4 md:gap-0 opacity-40">
        <Marquee text="EVENTS" speed={30} />
        <div className="md:hidden flex flex-col gap-4">
          <Marquee text="EVENTS" speed={35} direction="right" />
          <Marquee text="EVENTS" speed={25} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="text-center md:text-left">
            <h2 className="text-5xl md:text-8xl font-['Britannic_Bold'] tracking-[0.2em] uppercase mb-6 text-metallic-gradient">
              Events
            </h2>
            <AnimatedDivider className="text-[var(--color-border-main)]/30" />
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-[var(--color-bg-secondary)]/50 backdrop-blur-md border border-[var(--color-border-main)]/30 rounded-full p-1.5 self-start md:self-auto shadow-lg overflow-x-auto max-w-full hide-scrollbar">
            <button
              onClick={() => setActiveTab('events')}
              className={`whitespace-nowrap px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-['Inter'] font-bold tracking-widest uppercase transition-all duration-300 ${
                activeTab === 'events'
                  ? 'bg-[var(--color-accent-primary)] text-[var(--color-bg-main)] shadow-md'
                  : 'text-[var(--color-text-main)]/60 hover:text-[var(--color-text-main)]'
              }`}
            >
              Departments
            </button>
            <button
              onClick={() => setActiveTab('conclave')}
              className={`whitespace-nowrap px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-['Inter'] font-bold tracking-widest uppercase transition-all duration-300 ${
                activeTab === 'conclave'
                  ? 'bg-[var(--color-accent-primary)] text-[var(--color-bg-main)] shadow-md'
                  : 'text-[var(--color-text-main)]/60 hover:text-[var(--color-text-main)]'
              }`}
            >
              Conclave Lineup
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <div className="flex-1">
          {activeTab === 'events' ? (
            <motion.div 
              key="events-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {departments.map((dept, index) => (
                <SpotlightCard key={dept.id} dept={dept} index={index} onClick={onNavigate} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="conclave-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ConclaveLineup />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
