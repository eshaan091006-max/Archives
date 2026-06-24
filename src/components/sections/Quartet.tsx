import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue, useMotionValueEvent, useSpring } from 'framer-motion';
import { YearKey } from '../../lib/themeData';

interface Member {
  id: number;
  role: string;
  name: string;
  alias: string;
  description: string;
  quote: string;
  gradient: string;
  borderColor: string;
  glowColor: string;
}

const QUARTET_MEMBERS: Member[] = [
  {
    id: 1,
    role: 'Chairperson',
    name: 'Placeholder',
    alias: 'The Architect',
    description: 'Steering the vision of Malhar, keeping the storm contained and the energy boundless.',
    quote: '"Chaos is just art waiting for a frame. We build the frame."',
    gradient: 'from-[var(--color-accent-primary)]/20 via-black/95 to-black',
    borderColor: 'border-[var(--color-accent-primary)]/30',
    glowColor: 'rgba(25, 186, 241, 0.25)',
  },
  {
    id: 2,
    role: 'Vice Chairperson (Networking)',
    name: 'Placeholder',
    alias: 'The Maestro',
    description: 'Connecting resources, maintaining relationships, and managing outreach for the festival.',
    quote: '"Building networks that support creative visions and spark partnerships."',
    gradient: 'from-[var(--color-text-highlight)]/20 via-black/95 to-black',
    borderColor: 'border-[var(--color-text-highlight)]/30',
    glowColor: 'rgba(247, 178, 73, 0.25)',
  },
  {
    id: 3,
    role: 'Vice Chairperson (Events)',
    name: 'Placeholder',
    alias: 'The Catalyst',
    description: 'Curating the stages, spotlighting talent, and executing the creative soul of the festival.',
    quote: '"Every stage is a story. My job is to make sure it is told beautifully."',
    gradient: 'from-[var(--color-accent-secondary)]/20 via-black/95 to-black',
    borderColor: 'border-[var(--color-accent-secondary)]/30',
    glowColor: 'rgba(19, 186, 241, 0.25)',
  },
  {
    id: 4,
    role: 'Vice Chairperson (Management)',
    name: 'Placeholder',
    alias: 'The Engine',
    description: 'Powering the logistics, operations, and infrastructure that brings the digital and physical worlds together.',
    quote: '"Precision behind the scenes enables magic in the spotlight."',
    gradient: 'from-[var(--color-text-main)]/20 via-black/95 to-black',
    borderColor: 'border-[var(--color-text-main)]/20',
    glowColor: 'rgba(255, 255, 255, 0.1)',
  },
];

// ── Stage thresholds ──────────────────────────────────────────────────────
const S0_END  = 0.20;  // stacked → fan begins
const S1_END  = 0.50;  // fan fully open
const S2_END  = 0.70;  // spread fully open (no overlap)
const S3_END  = 1.00;  // all cards flipped

// Geometry metrics
const FAN_ANGLES = [-26, -9, 9, 26];
const FAN_X      = [-110, -38, 38, 110];
const FAN_Y      = [20, 0, 0, 20]; // Slight arc for fan

// We create a wrapper component for a single card so we can cleanly use the transforms
const QuartetCard = ({ member, idx, scrollYProgress, isMobile, year }: { member: Member, idx: number, scrollYProgress: MotionValue<number>, isMobile: boolean, year: YearKey }) => {
  
  // Desktop math
  const CARD_W = 280;
  const GAP = 28;
  const totalW = 4 * CARD_W + 3 * GAP;
  const desktopSpreadX = -totalW / 2 + idx * (CARD_W + GAP) + CARD_W / 2;

  // Mobile math (spread vertically)
  const CARD_H = 420;
  const MOBILE_GAP = 20;
  const totalH = 4 * CARD_H + 3 * MOBILE_GAP;
  const mobileSpreadY = -totalH / 2 + idx * (CARD_H + MOBILE_GAP) + CARD_H / 2;
  const mobileSpreadX = 0;

  const finalSpreadX = isMobile ? mobileSpreadX : desktopSpreadX;
  const finalSpreadY = isMobile ? mobileSpreadY : 0;
  
  // Spring config to add layout animation feel to scroll scrubbing
  const springConfig = { stiffness: 100, damping: 20, mass: 1 };

  // Transform X
  const rawX = useTransform(
    scrollYProgress,
    [0, S0_END, S1_END, S2_END, S3_END],
    [idx * 2, idx * 2, FAN_X[idx], finalSpreadX, finalSpreadX]
  );
  const x = useSpring(rawX, springConfig);

  // Transform Y
  const rawY = useTransform(
    scrollYProgress,
    [0, S0_END, S1_END, S2_END, S3_END],
    [idx * -2, idx * -2, 0, finalSpreadY, finalSpreadY]
  );
  const y = useSpring(rawY, springConfig);

  // Transform Z-Rotation
  const rawRotateZ = useTransform(
    scrollYProgress,
    [0, S0_END, S1_END, S2_END, S3_END],
    [0, 0, FAN_ANGLES[idx], 0, 0]
  );
  const rotateZ = useSpring(rawRotateZ, springConfig);

  // Discrete flip state
  const [isFlipped, setIsFlipped] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsFlipped(latest >= S2_END);
  });

  // Z-Index control
  const zIndex = useTransform(
    scrollYProgress,
    [0, S2_END, S3_END],
    [4 - idx, 4 - idx, 10]
  );

  const flipTransitionDelay = `${idx * 0.06}s`;

  return (
    // .cardWrap
    <motion.div
      className="absolute top-0 left-1/2 w-[280px] h-[420px] -translate-x-1/2 cursor-pointer"
      style={{ 
        x, 
        y, 
        rotateZ, 
        zIndex, 
        transformOrigin: 'bottom center',
      }}
      whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.2 } }}
    >
      {/* .cardInner */}
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.65s cubic-bezier(0.65, 0, 0.35, 1)',
          transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
          transitionDelay: flipTransitionDelay,
          willChange: 'transform'
        }}
      >
        {/* .cardFace .cardBack (Visible initially at 0deg) */}
        <div 
          className="absolute inset-0 w-full h-full rounded-[1.5rem] shadow-2xl overflow-hidden flex items-center justify-center"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <img 
            src={`/assets/cards/${year}-back.svg`} 
            alt={`Malhar ${year} Card Back`}
            className="w-full h-full object-cover scale-[1.06]"
          />

        </div>

        {/* .cardFace .cardFront (Info side natively at 180deg) */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-3xl border-2 ${member.borderColor} bg-gradient-to-b ${member.gradient} p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between`}
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
        <div>
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] md:text-xs font-['Inter'] font-semibold tracking-widest text-[var(--color-accent-primary)] uppercase">
              {member.role}
            </span>
            <span className="text-[9px] font-['Inter'] font-medium text-[var(--color-text-main)]/40 tracking-[0.25em] uppercase">
              {member.alias}
            </span>
          </div>
          
          <h3 className="text-2xl font-['Boldonse'] text-[var(--color-text-main)] uppercase tracking-wide mb-3">
            {member.name}
          </h3>
          
          <p className="text-xs md:text-sm font-['Inter'] text-[var(--color-text-main)]/60 tracking-wide leading-relaxed">
            {member.description}
          </p>
        </div>

        <div className="border-t border-[var(--color-border-main)]/10 pt-4">
          <p className="text-xs font-['Inter'] italic text-[var(--color-text-main)]/50 tracking-wider leading-relaxed">
            {member.quote}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
  );
};

export const Quartet = ({ year }: { year: YearKey }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "center center"]
  });

  return (
    <section 
      id="workforce"
      ref={containerRef} 
      className="relative w-full min-h-screen py-24 flex flex-col items-center overflow-hidden bg-[var(--color-bg-main)]"
    >
        {/* Background Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[var(--color-accent-primary)]/5 rounded-full blur-[140px] pointer-events-none z-0" />

        {/* Header */}
        <div className="text-center mb-12 relative z-10 shrink-0">
          <h2 className="text-4xl md:text-6xl font-['Boldonse'] tracking-tight text-[var(--color-text-main)] uppercase mb-4">
            The Quartet
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-base font-['Inter'] text-[var(--color-text-main)]/60 tracking-wider leading-relaxed uppercase">
            the big four behind malhar
          </p>
        </div>

        {/* Cards Scene */}
        <div className="relative w-full flex-1 flex items-center justify-center mt-8" style={{ perspective: '2000px' }}>
          <div className="relative w-[280px] h-[420px]">
            {QUARTET_MEMBERS.map((member, idx) => (
              <QuartetCard 
                key={member.id} 
                member={member} 
                idx={idx} 
                scrollYProgress={scrollYProgress} 
                isMobile={isMobile}
                year={year}
              />
            ))}
          </div>
        </div>

    </section>
  );
};
