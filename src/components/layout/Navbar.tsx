import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { YearKey, themeContent } from '../../lib/themeData';
import { MagneticWrapper } from '../animations/MagneticWrapper';
import { useSound } from '../../hooks/useSound';
import { useLenis } from 'lenis/react';
import { useGamification } from '../../context/GamificationContext';

interface NavbarProps {
  year: YearKey;
  setYear: (y: YearKey) => void;
}

export const Navbar = ({ year, setYear }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { soundEnabled, toggleSound, playHover, analyser } = useSound();
  const theme = themeContent[year];
  const lenis = useLenis();
  const { discoverFrog, foundFrogs } = useGamification();
  const barRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!soundEnabled || !analyser) return;

    let animId: number;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateBars = () => {
      analyser.getByteFrequencyData(dataArray);

      // Select indices to represent sub-bands (bass, low-mids, mids, highs)
      const targetIndices = [2, 5, 8, 12];

      barRefs.current.forEach((bar, idx) => {
        if (!bar) return;
        const rawValue = dataArray[targetIndices[idx]] || 0;
        const scaleFactor = Math.max(0.18, Math.min(1.0, rawValue / 200));
        bar.style.transform = `scaleY(${scaleFactor})`;
      });

      animId = requestAnimationFrame(updateBars);
    };

    animId = requestAnimationFrame(updateBars);
    return () => cancelAnimationFrame(animId);
  }, [soundEnabled, analyser]);

  const navLinks = [
    { label: 'EVENTS', id: 'events' },
    { label: 'WORKFORCE', id: 'workforce' },
    { label: 'CREATIVES', id: 'creatives' },
    { label: 'AFTERMOVIE', id: 'gallery' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { offset: -50, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-bg-main)]/70 backdrop-blur-xl border-b border-[var(--color-border-main)]/20 py-4 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="relative group no-cursor-scale z-50">
          <div className="flex items-center gap-2">
            <div className="text-[var(--color-text-highlight)] font-['Alexandria'] uppercase font-semibold tracking-widest text-sm border border-[var(--color-border-main)] p-2 shadow-[2px_2px_0px_var(--color-border-main)] cursor-pointer hover:bg-[var(--color-bg-secondary)] transition-colors whitespace-nowrap">
              {theme.year} · {theme.title} · malhar
            </div>
            {!foundFrogs.includes('frog1') && (
              <button 
                onClick={() => discoverFrog('frog1')}
                className="text-lg transition-all duration-300 opacity-0 hover:opacity-100 hover:scale-125 filter grayscale hover:grayscale-0"
                title="You found a frog!"
              >
                🐸
              </button>
            )}
          </div>
          
          <div className="absolute left-0 mt-2 min-w-[300px] bg-[var(--color-bg-secondary)] border border-[var(--color-border-main)] rounded-none shadow-[2px_2px_0px_var(--color-border-main)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            {(['2023', '2024', '2025'] as YearKey[]).map(y => {
              const yTheme = themeContent[y];
              return (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`w-full text-left px-3 py-3 text-xs font-['Alexandria'] font-bold uppercase tracking-widest hover:bg-[var(--color-accent-primary)] hover:text-[var(--color-bg-main)] transition-colors border-b border-[var(--color-border-main)]/20 last:border-0 ${y === year ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-main)]'}`}
                >
                  {y} · {yTheme.title}
                </button>
              );
            })}
          </div>
        </div>

        <div 
          className="hidden md:flex gap-2 items-center"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map(link => (
            <MagneticWrapper key={link.id}>
              <div
                className="relative px-4 py-2"
                onMouseEnter={() => {
                  setHoveredLink(link.id);
                  playHover();
                }}
              >
                {hoveredLink === link.id && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-[var(--color-bg-secondary)]/80 backdrop-blur-md rounded-full -z-10 border border-[var(--color-border-main)]/30"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`relative z-10 transition-colors duration-200 text-sm tracking-widest font-bold uppercase ${
                    hoveredLink === link.id ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-highlight)]'
                  }`}
                >
                  {link.label}
                </button>
              </div>
            </MagneticWrapper>
          ))}

          <div className="w-[1px] h-6 bg-[var(--color-border-main)]/30 mx-4" />

          <button
            onClick={toggleSound}
            onMouseEnter={playHover}
            className="p-2 rounded-full border border-[var(--color-border-main)] text-[var(--color-text-highlight)] hover:text-[var(--color-accent-primary)] hover:border-[var(--color-accent-primary)] transition-colors"
          >
            {soundEnabled ? (
              <span className="flex items-end gap-[2.5px] h-[16px] w-[16px] justify-center px-[1px] overflow-hidden">
                <span ref={el => { barRefs.current[0] = el; }} className="w-[2px] h-full bg-current rounded-full origin-bottom will-change-transform transition-transform duration-75" style={{ transform: 'scaleY(0.2)' }} />
                <span ref={el => { barRefs.current[1] = el; }} className="w-[2px] h-full bg-current rounded-full origin-bottom will-change-transform transition-transform duration-75" style={{ transform: 'scaleY(0.2)' }} />
                <span ref={el => { barRefs.current[2] = el; }} className="w-[2px] h-full bg-current rounded-full origin-bottom will-change-transform transition-transform duration-75" style={{ transform: 'scaleY(0.2)' }} />
                <span ref={el => { barRefs.current[3] = el; }} className="w-[2px] h-full bg-current rounded-full origin-bottom will-change-transform transition-transform duration-75" style={{ transform: 'scaleY(0.2)' }} />
              </span>
            ) : (
              <VolumeX size={16} />
            )}
          </button>

        </div>
      </div>
    </motion.nav>
  );
};
