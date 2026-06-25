import React, { useState } from 'react';
import { motion } from 'framer-motion';

const lineupData = [
  { id: 1, name: 'Placeholder Name', role: 'Placeholder Role', desc: 'Placeholder description for the conclave lineup speaker goes here. This text can be updated later.', image: 'https://placehold.co/800x1200/1a1a1a/e0e0e0?text=Placeholder+Image' },
  { id: 2, name: 'Placeholder Name', role: 'Placeholder Role', desc: 'Placeholder description for the conclave lineup speaker goes here. This text can be updated later.', image: 'https://placehold.co/800x1200/1a1a1a/e0e0e0?text=Placeholder+Image' },
  { id: 3, name: 'Placeholder Name', role: 'Placeholder Role', desc: 'Placeholder description for the conclave lineup speaker goes here. This text can be updated later.', image: 'https://placehold.co/800x1200/1a1a1a/e0e0e0?text=Placeholder+Image' },
  { id: 4, name: 'Placeholder Name', role: 'Placeholder Role', desc: 'Placeholder description for the conclave lineup speaker goes here. This text can be updated later.', image: 'https://placehold.co/800x1200/1a1a1a/e0e0e0?text=Placeholder+Image' },
  { id: 5, name: 'Placeholder Name', role: 'Placeholder Role', desc: 'Placeholder description for the conclave lineup speaker goes here. This text can be updated later.', image: 'https://placehold.co/800x1200/1a1a1a/e0e0e0?text=Placeholder+Image' },
  { id: 6, name: 'Placeholder Name', role: 'Placeholder Role', desc: 'Placeholder description for the conclave lineup speaker goes here. This text can be updated later.', image: 'https://placehold.co/800x1200/1a1a1a/e0e0e0?text=Placeholder+Image' },
];

export const ConclaveLineup = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Duplicating the array twice to ensure seamless infinite scroll
  const scrollData = [...lineupData, ...lineupData, ...lineupData];

  return (
    <>
      <style>
        {`
          @keyframes scroll-infinite {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% / 3)); }
          }
          .animate-scroll-infinite {
            animation: scroll-infinite 45s linear infinite;
            will-change: transform;
          }
          .group-hover\\/marquee:hover .animate-scroll-infinite {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="w-full overflow-hidden py-12 relative group/marquee">
        
        {/* Massive edge gradients for seamless fading */}
        <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-[var(--color-bg-main)] via-[var(--color-bg-main)]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-[var(--color-bg-main)] via-[var(--color-bg-main)]/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex gap-6 w-max animate-scroll-infinite" style={{ paddingLeft: '1.5rem' }}>
          {scrollData.map((person, index) => {
            const isHovered = hoveredId === person.id;
            
            return (
              <motion.div
                key={`${person.id}-${index}`}
                onMouseEnter={() => setHoveredId(person.id)}
                onMouseLeave={() => setHoveredId(null)}
                layout
                transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 1 }}
                className={`relative h-[450px] md:h-[600px] rounded-[2rem] overflow-hidden cursor-pointer bg-[var(--color-bg-secondary)] border border-[var(--color-border-main)]/20 shadow-2xl shrink-0 group ${
                  isHovered ? 'w-[400px] md:w-[650px]' : 'w-[280px] md:w-[350px]'
                }`}
              >
                <img 
                  src={person.image} 
                  alt={person.name} 
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
                  loading="lazy"
                />
                
                {/* Glowing Overlay that activates on hover */}
                <div className={`absolute inset-0 bg-[var(--color-accent-primary)]/20 mix-blend-overlay transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                
                {/* Deep bottom gradient for text readability */}
                <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-700 ${
                  isHovered 
                    ? 'from-[var(--color-bg-main)] via-[var(--color-bg-main)]/80 to-transparent' 
                    : 'from-[var(--color-bg-main)] via-[var(--color-bg-main)]/40 to-transparent'
                }`} />

                {/* Normal State Name (Unhovered) */}
                <div className={`absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full transition-all duration-500 ${isHovered ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                  <h3 className="text-2xl md:text-3xl font-['Britannic_Bold'] text-[var(--color-text-main)] uppercase tracking-widest drop-shadow-lg">
                    {person.name}
                  </h3>
                  <div className="w-10 h-[2px] bg-[var(--color-accent-primary)] mt-3" />
                </div>

                {/* Expanded Content (Hovered state) */}
                <div className={`absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end h-full transition-all duration-700 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                  <motion.div 
                    initial={false}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-[2px] bg-[var(--color-accent-primary)] shadow-[0_0_10px_var(--color-accent-primary)]" />
                      <p className="text-[var(--color-accent-primary)] font-['Inter'] font-black tracking-[0.3em] uppercase text-xs md:text-sm drop-shadow-md">
                        {person.role}
                      </p>
                    </div>
                    
                    <h3 className="text-3xl md:text-5xl font-['Britannic_Bold'] text-[var(--color-text-main)] uppercase tracking-[0.1em] mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                      {person.name}
                    </h3>
                    
                    <p className="text-[var(--color-text-main)]/90 font-['Inter'] text-sm md:text-lg leading-[1.8] font-medium max-w-[90%] drop-shadow-md">
                      {person.desc}
                    </p>
                  </motion.div>
                </div>
                
                {/* Decorative glowing border on hover */}
                <div className={`absolute inset-0 border-2 rounded-[2rem] transition-colors duration-500 pointer-events-none ${isHovered ? 'border-[var(--color-accent-primary)]/50 shadow-[inset_0_0_30px_rgba(var(--color-accent-primary-rgb),0.2)]' : 'border-transparent'}`} />

              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};
