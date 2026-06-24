import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Network, Briefcase, Ticket } from 'lucide-react';
import { AnimatedDivider } from '../animations/AnimatedDivider';
import { useSound } from '../../hooks/useSound';
import { Marquee } from '../animations/Marquee';

const domains = [
  {
    id: 'networking',
    title: 'Networking',
    icon: Network,
    image: 'https://images.unsplash.com/photo-1511649475669-e288648b2339?auto=format&fit=crop&q=80',
    description: 'Building connections and fostering relationships across the festival ecosystem.',
    departments: [
      'Public Relations',
      'Creatives',
      'Conclave',
      'Decor & Merchandise',
      'Filming & Documentation',
      'Computers',
    ],
  },
  {
    id: 'management',
    title: 'Management',
    icon: Briefcase,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80',
    description: 'The backbone of operations, ensuring seamless execution of every detail.',
    departments: [
      'Logistics',
      'Assistance',
      'Hospitality',
      'Security',
      'Finance',
      'Technicals',
      'Marketing',
    ],
  },
  {
    id: 'events',
    title: 'Events',
    icon: Ticket,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
    description:
      'Curating unforgettable experiences through spectacular performances and competitions.',
    departments: [
      'Fine Arts',
      'Admin',
      'Indian Performing Arts',
      'Western Performing Arts',
      'ETCW',
      'Literary Arts',
    ],
  },
];

const TiltCard = ({
  domain,
  index,
  onClick,
}: {
  domain: (typeof domains)[0];
  index: number;
  onClick: (domain: any) => void;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const { playHover } = useSound();

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    <motion.button
      layoutId={`domain-${domain.id}`}
      onClick={() => onClick(domain)}
      data-cursor="explore"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        layout: { type: 'spring', stiffness: 400, damping: 35 },
        default: { delay: index * 0.1 },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHover}
      className="relative flex flex-col p-8 bg-[var(--color-bg-secondary)]/80 backdrop-blur-md border border-[var(--color-border-main)] rounded-3xl hover:border-[var(--color-accent-secondary)] transition-colors duration-500 min-h-[300px] text-left group no-cursor-scale"
    >
      <div
        style={{ transform: 'translateZ(50px)' }}
        className="w-16 h-16 rounded-2xl bg-[var(--color-bg-main)] border border-[var(--color-border-main)] flex items-center justify-center mb-8 group-hover:bg-[var(--color-accent-secondary)] transition-colors duration-500"
      >
        <domain.icon className="w-8 h-8 text-[var(--color-accent-secondary)] group-hover:text-[var(--color-bg-main)] transition-colors duration-500" />
      </div>

      <div style={{ transform: 'translateZ(30px)' }}>
        <h3 className="text-3xl font-['Boldonse'] text-[var(--color-text-main)] mb-4 uppercase">
          {domain.title}
        </h3>
        <p className="text-[var(--color-text-highlight)] font-['Inter'] leading-relaxed mb-6">
          {domain.description}
        </p>
      </div>
      <div className="pt-6 border-t border-[var(--color-border-main)]/20 mt-auto relative z-10">
        <h4 className="text-[var(--color-text-main)]/60 font-['Inter'] uppercase tracking-[0.2em] text-xs font-bold mb-4">
          Departments
        </h4>
        <div className="flex flex-wrap gap-2">
          {domain.departments.map((dept: string, i: number) => (
            <span
              key={i}
              className="px-4 py-2 bg-[var(--color-bg-main)]/50 backdrop-blur-md rounded-full text-xs font-['Inter'] font-semibold tracking-wider text-[var(--color-text-main)] border border-[var(--color-border-main)]/30 hover:border-[var(--color-accent-primary)]/50 transition-colors shadow-sm"
            >
              {dept}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
};

export const Domains = ({ onNavigateDomain }: { onNavigateDomain: (domain: any) => void }) => {
  return (
    <section
      id="domains"
      className="relative py-32 bg-[var(--color-bg-secondary)] overflow-hidden transition-colors duration-500"
    >
      {/* Background Marquee */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-0 pointer-events-none flex flex-col gap-4 md:gap-0">
        <Marquee text="DOMAINS" direction="right" speed={40} />
        <div className="md:hidden flex flex-col gap-4">
          <Marquee text="DOMAINS" speed={35} direction="left" />
          <Marquee text="DOMAINS" speed={45} direction="right" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" style={{ perspective: '1000px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-[var(--color-accent-secondary)] text-5xl md:text-8xl font-['Britannic_Bold'] tracking-[0.2em] uppercase mb-6 bg-clip-text text-transparent bg-gradient-to-br from-[var(--color-text-main)] to-[var(--color-text-main)]/50">
            Domains
          </h2>
          <AnimatedDivider className="text-[var(--color-border-main)]/30" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {domains.map((domain, index) => (
            <TiltCard
              key={domain.id}
              domain={domain}
              index={index}
              onClick={onNavigateDomain || (() => {})}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
