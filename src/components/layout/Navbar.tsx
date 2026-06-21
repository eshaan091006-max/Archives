import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { YearKey, themeContent } from '../../lib/themeData';
import { MagneticWrapper } from '../animations/MagneticWrapper';
import { useSound } from '../../hooks/useSound';

interface NavbarProps {
  year: YearKey;
  setYear: (y: YearKey) => void;
}

export const Navbar = ({ year, setYear }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const { soundEnabled, toggleSound, playHover } = useSound();
  const theme = themeContent[year];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'EVENTS', id: 'events' },
    { label: 'WORKFORCE', id: 'workforce' },
    { label: 'CREATIVES', id: 'creatives' },
    { label: 'AFTERMOVIE', id: 'gallery' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[var(--color-bg-main)]/80 backdrop-blur-md border-b border-[var(--color-border-main)]/20 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-[var(--color-text-highlight)] font-['Alexandria'] uppercase font-semibold tracking-widest text-sm border border-[var(--color-border-main)] p-2 shadow-[2px_2px_0px_var(--color-border-main)]">
          {theme.year} · {theme.title} · malhar
        </div>
        
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <MagneticWrapper key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                onMouseEnter={playHover}
                className="text-[var(--color-text-highlight)] hover:text-[var(--color-text-main)] transition-colors duration-200 text-sm tracking-wider font-semibold uppercase"
              >
                {link.label}
              </button>
            </MagneticWrapper>
          ))}

          <button 
            onClick={toggleSound}
            onMouseEnter={playHover}
            className="p-2 rounded-full border border-[var(--color-border-main)] text-[var(--color-text-highlight)] hover:text-[var(--color-accent-primary)] hover:border-[var(--color-accent-primary)] transition-colors"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          
          <div className="relative group ml-4 no-cursor-scale">
            <MagneticWrapper>
              <button className="px-6 py-2 rounded-full border border-[var(--color-accent-secondary)] text-[var(--color-text-main)] font-['Britannic_Bold'] tracking-widest text-sm hover:bg-[var(--color-accent-secondary)] hover:text-[var(--color-bg-main)] transition-all duration-500 uppercase">
                THEME: {year}
              </button>
            </MagneticWrapper>
            
            <div className="absolute right-0 mt-2 w-32 bg-[var(--color-bg-secondary)] border border-[var(--color-border-main)]/30 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {(['2023', '2024', '2025'] as YearKey[]).map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`w-full text-left px-4 py-2 text-sm font-bold uppercase tracking-widest hover:bg-[var(--color-accent-primary)] hover:text-[var(--color-bg-main)] transition-colors ${y === year ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-main)]'}`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
