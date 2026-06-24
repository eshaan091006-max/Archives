import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useInView, animate } from 'framer-motion';
import { useGamification } from '../../context/GamificationContext';

const AnimatedCounter = ({ value, suffix = '', duration = 2 }: { value: number, suffix?: string, duration?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (val) => {
          setDisplayValue(Math.floor(val));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

export const Stats = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { discoverFrog, foundFrogs } = useGamification();

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section className="relative z-20 -mt-16 px-6 max-w-7xl mx-auto pointer-events-none mb-24">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="group grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-auto"
      >
        
        {/* Large Feature Stat */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, type: "spring" }}
          className="md:col-span-2 relative flex flex-col justify-center p-10 md:p-14 bg-gradient-to-br from-[var(--color-bg-secondary)]/90 to-[var(--color-bg-secondary)]/50 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-[var(--color-border-main)]/30 group/card hover:border-[var(--color-accent-primary)]/50 transition-colors duration-500"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)] shadow-[0_0_10px_var(--color-accent-primary)]" />
                <h4 className="text-[var(--color-text-main)]/80 font-['Inter'] font-bold tracking-[0.3em] uppercase text-sm">Total Footfall</h4>
                {!foundFrogs.includes('frog3') && (
                  <button
                    onClick={() => discoverFrog('frog3')}
                    className="ml-2 text-xl transition-all duration-300 opacity-0 hover:opacity-100 hover:scale-125 filter grayscale hover:grayscale-0 inline-block"
                    title="You found a frog!"
                  >
                    🐸
                  </button>
                )}
              </div>
              <div className="text-7xl md:text-8xl lg:text-9xl font-['Boldonse'] text-[var(--color-text-main)] drop-shadow-lg tracking-tight group-hover/card:text-[var(--color-accent-primary)] transition-colors duration-500">
                <AnimatedCounter value={30} suffix="k+" duration={2.5} />
              </div>
            </div>
            
            <div className="hidden md:flex shrink-0 w-40 h-40 rounded-full border border-[var(--color-border-main)]/40 items-center justify-center relative overflow-hidden group-hover/card:border-[var(--color-accent-primary)]/50 transition-colors duration-500 bg-[var(--color-bg-main)]/20 shadow-inner">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border-t-2 border-[var(--color-accent-primary)] rounded-full opacity-60"
               />
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-4 border-b-2 border-r-2 border-[var(--color-accent-secondary)] rounded-full opacity-40"
               />
               <div className="text-center relative z-10 group/frog">
                 <span className="block font-['Inter'] text-[10px] tracking-[0.3em] text-[var(--color-text-main)]/50 uppercase mb-1">Since</span>
                 <span className="block font-['Boldonse'] text-[var(--color-text-main)] text-2xl tracking-widest text-[var(--color-accent-primary)]">1979</span>
               </div>
            </div>
          </div>

          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  600px circle at ${mouseX}px ${mouseY}px,
                  rgba(255,255,255,0.06),
                  transparent 40%
                )
              `,
            }}
          />
        </motion.div>

        {/* Small Stat 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
          className="relative flex flex-col items-center justify-center text-center p-10 bg-gradient-to-b from-[var(--color-accent-primary)]/10 to-transparent backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-xl border border-[var(--color-accent-primary)]/30 hover:border-[var(--color-accent-primary)]/60 hover:bg-[var(--color-accent-primary)]/20 transition-all duration-500 group/card"
        >
          <h4 className="text-[var(--color-text-main)]/70 font-['Inter'] font-bold tracking-[0.2em] uppercase text-xs mb-4">Total Events</h4>
          <div className="text-6xl md:text-7xl font-['Boldonse'] text-[var(--color-accent-primary)] drop-shadow-[0_0_20px_rgba(var(--color-accent-primary-rgb),0.4)] group-hover/card:scale-105 transition-transform duration-500">
            <AnimatedCounter value={58} suffix="+" duration={2} />
          </div>
          
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  400px circle at ${mouseX}px ${mouseY}px,
                  rgba(255,255,255,0.1),
                  transparent 40%
                )
              `,
            }}
          />
        </motion.div>

        {/* Small Stat 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="relative flex flex-col items-center justify-center text-center p-10 bg-gradient-to-br from-[var(--color-bg-secondary)]/80 to-[var(--color-bg-secondary)]/30 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-xl border border-[var(--color-border-main)]/20 hover:border-[var(--color-accent-secondary)]/50 transition-all duration-500 group/card"
        >
          <h4 className="text-[var(--color-text-main)]/60 font-['Inter'] font-bold tracking-[0.2em] uppercase text-xs mb-4">Workforce</h4>
          <div className="text-5xl md:text-6xl lg:text-7xl font-['Boldonse'] text-[var(--color-text-main)] group-hover/card:text-[var(--color-accent-secondary)] transition-colors duration-500">
            <AnimatedCounter value={1200} suffix="+" duration={3} />
          </div>
          
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  400px circle at ${mouseX}px ${mouseY}px,
                  rgba(255,255,255,0.06),
                  transparent 40%
                )
              `,
            }}
          />
        </motion.div>

        {/* Small Stat 3 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
          className="md:col-span-2 relative flex flex-col items-center justify-center text-center p-8 bg-[var(--color-bg-main)]/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-[var(--color-border-main)]/20 hover:border-[var(--color-accent-primary)]/40 transition-colors duration-500"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="text-6xl md:text-7xl font-['Boldonse'] text-[var(--color-accent-secondary)] drop-shadow-md">
              <AnimatedCounter value={3} duration={1} />
            </div>
            <div className="h-12 w-[1px] bg-[var(--color-border-main)]/30 hidden sm:block" />
            <h4 className="text-[var(--color-text-main)]/90 font-['Inter'] font-bold tracking-[0.3em] uppercase text-sm sm:text-base">Action-Packed Days</h4>
          </div>

          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  600px circle at ${mouseX}px ${mouseY}px,
                  rgba(255,255,255,0.04),
                  transparent 40%
                )
              `,
            }}
          />
        </motion.div>

      </div>
    </section>
  );
};
