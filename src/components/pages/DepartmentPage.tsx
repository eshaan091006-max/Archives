import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowLeft, Sparkles, BookOpen, Feather } from 'lucide-react';
import { useSound } from '../../hooks/useSound';
import { YearKey } from '../../lib/themeData';
import { eventsData } from '../../lib/eventsData';

interface DepartmentPageProps {
  id: string;
  name: string;
  year: YearKey;
  onBack: () => void;
}

// Sound effects URLs for writing
const INK_SPLASH_SOUND = 'https://actions.google.com/sounds/v1/water/liquid_drip_plop.ogg';
const QUILL_SCRIBBLE_SOUND = 'https://actions.google.com/sounds/v1/office/typing_medium.ogg'; // fallback typewriter clack

// Liquid Ink Bleeding Physics Simulation
const LiquidInkBackground = ({ isInkActive }: { isInkActive: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blotsRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    maxSize: number;
    opacity: number;
    color: string;
    bleedFactor: number;
    points: Array<{ angle: number; length: number; speed: number; limit: number }>;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const spawnBlot = (x: number, y: number, size = 5, maxSize = 20, isSatellite = false) => {
      // Main blots have more points for realistic spiked tendrils; satellites are rounder speckles
      const points: Array<{ angle: number; length: number; speed: number; limit: number }> = [];
      const numPoints = isSatellite ? 8 : 24;
      
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        // Natural organic variance without sharp geometric spikes
        const limit = maxSize * (Math.random() * 0.45 + 0.75);
        const speed = Math.random() * 0.6 + 0.3;

        points.push({
          angle,
          length: size,
          speed,
          limit
        });
      }

      blotsRef.current.push({
        x,
        y,
        size,
        maxSize,
        opacity: 0.96,
        color: Math.random() > 0.4 ? '#4E270A' : '#7C360B', // Ink colors (sepia/burnt wood)
        bleedFactor: Math.random() * 0.3 + 0.1,
        points
      });

      // Play ink splash sound
      const audio = new Audio(INK_SPLASH_SOUND);
      audio.volume = 0.05;
      audio.play().catch(() => {});
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isInkActive && Math.random() < 0.12) {
        spawnBlot(e.clientX, e.clientY, Math.random() * 1.5 + 0.5, Math.random() * 6 + 3, true);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!isInkActive) return;
      
      // Big primary impact drop
      spawnBlot(e.clientX, e.clientY, 8, Math.random() * 25 + 18);
      
      // Micro satellite droplets spraying around the impact area
      const satelliteCount = Math.floor(Math.random() * 6) + 6;
      for (let i = 0; i < satelliteCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 60 + 12;
        spawnBlot(
          e.clientX + Math.cos(angle) * dist,
          e.clientY + Math.sin(angle) * dist,
          Math.random() * 2 + 0.5,
          Math.random() * 9 + 4,
          true
        );
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      blotsRef.current.forEach((blot) => {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = blot.color;
        ctx.globalAlpha = blot.opacity;

        // Shadow blur simulates capillary bleeding texture (absorbing into paper fibers)
        ctx.shadowColor = blot.color;
        ctx.shadowBlur = 1.8;

        const pointsCount = blot.points.length;
        
        // Find starting midpoint between last and first point to make a closed smooth loop
        const startP = blot.points[0];
        const lastP = blot.points[pointsCount - 1];
        
        const startX = blot.x + Math.cos(startP.angle) * startP.length;
        const startY = blot.y + Math.sin(startP.angle) * startP.length;
        const lastX = blot.x + Math.cos(lastP.angle) * lastP.length;
        const lastY = blot.y + Math.sin(lastP.angle) * lastP.length;
        
        ctx.moveTo((startX + lastX) / 2, (startY + lastY) / 2);

        // Render smooth quadratic curves between control points
        for (let i = 0; i < pointsCount; i++) {
          const p = blot.points[i];
          const nextP = blot.points[(i + 1) % pointsCount];
          
          const currX = blot.x + Math.cos(p.angle) * p.length;
          const currY = blot.y + Math.sin(p.angle) * p.length;
          const nextX = blot.x + Math.cos(nextP.angle) * nextP.length;
          const nextY = blot.y + Math.sin(nextP.angle) * nextP.length;

          const midX = (currX + nextX) / 2;
          const midY = (currY + nextY) / 2;

          ctx.quadraticCurveTo(currX, currY, midX, midY);

          // Bleed outwards up to its specific organic limit
          if (p.length < p.limit) {
            p.length += p.speed;
            p.length += (Math.random() - 0.5) * 0.15; // paper fiber resistance wobble
          }
        }

        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Slow fade out
        blot.opacity -= 0.002;
      });

      blotsRef.current = blotsRef.current.filter((b) => b.opacity > 0);
    };

    const loop = () => {
      draw();
      animationId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationId);
    };
  }, [isInkActive]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
};

// Premium Interactive Quill Pointer Component
const QuillCursor = ({ isInkActive }: { isInkActive: boolean }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isInkActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      
      // Calculate quill tilt angle based on drag velocity
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        const targetRot = Math.atan2(dy, dx) * (180 / Math.PI) - 45;
        // Smooth rotation shift
        setRotation((prev) => prev + (targetRot - prev) * 0.15);
      }

      setPosition({ x: e.clientX, y: e.clientY });
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsPressing(true);
    const handleMouseUp = () => setIsPressing(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isInkActive]);

  if (!isInkActive) return null;

  return (
    <motion.div
      className="hidden md:block fixed pointer-events-none z-[99999]"
      style={{
        left: position.x,
        top: position.y,
        x: '-10%',
        y: '-90%',
        rotate: rotation,
        scale: isPressing ? 0.85 : 1,
        transformOrigin: 'bottom left',
        fontSize: '40px',
        lineHeight: 1,
        filter: 'sepia(1) saturate(6) hue-rotate(10deg) brightness(0.85) drop-shadow(0 2px 4px rgba(78,39,10,0.4))'
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      🖋️
    </motion.div>
  );
};

// Premium Interactive Card with Watercolor Bleed Reveal
const PremiumManuscriptCard = ({ event, index, playHover, isInkActive }: { event: any; index: number; playHover: () => void; isInkActive: boolean }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoverPosition({ x, y });

    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;
    setTilt({ x: -yPct * 12, y: xPct * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => {
        setIsHovered(true);
        playHover();
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 85 }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
      className={`group relative p-8 md:p-10 rounded-[32px] border transition-all duration-700 shadow-xl overflow-hidden cursor-none ${
        isInkActive
          ? "bg-[#FAF6EE] border-[#D0C2A7] text-[#2B2315] hover:border-[#4E270A]"
          : "bg-[var(--color-bg-secondary)]/40 border-[var(--color-border-main)]/30 text-[var(--color-text-main)] hover:border-[var(--color-accent-primary)] hover:bg-[var(--color-bg-secondary)]/60"
      }`}
    >
      {/* Real-time Ink Bleed Overlay (Fills card on hover from cursor entry point) */}
      {isInkActive && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
          style={{
            background: `radial-gradient(circle 200px at ${hoverPosition.x}px ${hoverPosition.y}px, rgba(78,39,10,0.06) 0%, transparent 100%)`,
          }}
        />
      )}

      {/* Gold Foil/Sheen Sweep Animation on hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
        <div 
          className="absolute top-0 left-0 w-[50%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/4 -translate-x-[150%] rotate-[35deg] group-hover:animate-[sheen_1.5s_ease-in-out_infinite]"
        />
      </div>

      {/* Inset Inner Elegant Border Frame (Manuscript border) */}
      <div 
        className={`absolute inset-3 rounded-[24px] pointer-events-none border transition-all duration-500 z-10 ${
          isInkActive 
            ? "border-[#D0C2A7]/40 group-hover:border-[#4E270A]/30 group-hover:scale-[1.01]" 
            : "border-[var(--color-border-main)]/10 group-hover:border-[var(--color-accent-primary)]/20 group-hover:scale-[1.01]"
        }`} 
      />

      {/* Retro book ruled lines */}
      {isInkActive && (
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[linear-gradient(rgba(43,35,21,0.2)_1px,transparent_1px)] bg-[size:100%_30px] mt-10" />
      )}

      {/* Giant Sequential Index behind content */}
      <span className={`absolute bottom-6 right-8 text-9xl font-['Bona_Nova_SC'] font-bold select-none opacity-[0.03] transition-all duration-700 group-hover:opacity-[0.07] group-hover:scale-105 ${
        isInkActive ? 'text-[#4E270A]' : 'text-[var(--color-accent-primary)]'
      }`}>
        {(index + 1).toString().padStart(2, '0')}
      </span>

      <div className="relative z-20 space-y-4" style={{ transform: 'translateZ(30px)' }}>
        {/* Title */}
        <h3 className={`text-2xl md:text-3xl font-bold transition-all duration-700 leading-snug ${
          isInkActive 
            ? "font-['Kaushan_Script'] text-[#4E270A] group-hover:text-[#7C360B]" 
            : "font-['Boldonse'] uppercase tracking-wider text-[var(--color-text-main)] group-hover:text-[var(--color-accent-primary)]"
        }`}>
          {event.title}
        </h3>

        {/* Description */}
        <p className={`text-sm md:text-base leading-relaxed transition-all duration-500 ${
          isInkActive 
            ? "font-['Bona_Nova_SC'] text-[#4E3E27]/90" 
            : "font-['Inter'] text-[var(--color-text-main)]/70 font-light"
        }`}>
          {event.description}
        </p>

        {/* Badges / Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {event.tags.map((tag: string) => (
            <span 
              key={tag} 
              className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold tracking-wider uppercase border transition-all duration-500 ${
                isInkActive 
                  ? "border-[#4E270A]/20 bg-[#4E270A]/5 text-[#4E270A] font-['Bona_Nova_SC'] group-hover:border-[#4E270A]/40" 
                  : "border-[var(--color-accent-secondary)]/20 bg-[var(--color-accent-secondary)]/5 text-[var(--color-accent-secondary)] group-hover:border-[var(--color-accent-primary)]/50 group-hover:text-[var(--color-accent-primary)] font-['Inter']"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const DepartmentPage = ({ id, name, year, onBack }: DepartmentPageProps) => {
  const { playTransition, playHover } = useSound();
  const [isInkActive, setIsInkActive] = useState(true);

  // Sync body class to hide the global dot cursor when ink mode is active
  useEffect(() => {
    if (isInkActive) {
      document.body.classList.add('hide-global-cursor');
    } else {
      document.body.classList.remove('hide-global-cursor');
    }
    return () => {
      document.body.classList.remove('hide-global-cursor');
    };
  }, [isInkActive]);

  // Play transition sound on enter
  useEffect(() => {
    playTransition();
  }, [playTransition]);

  const departmentEvents = eventsData[year]?.[id] || [];

  return (
    <motion.div 
      layoutId={`dept-${id}`}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      className={`fixed inset-0 z-[200] overflow-y-auto transition-colors duration-1000 ${
        isInkActive 
          ? 'bg-[#F2ECD8] text-[#2B2315] cursor-none' 
          : 'bg-[var(--color-bg-main)] text-[var(--color-text-main)]'
      }`}
      data-lenis-prevent="true"
    >
      {/* Quill Custom Cursor Pointer */}
      <QuillCursor isInkActive={isInkActive} />

      {/* Dynamic chromatography ink bleeds canvas */}
      <LiquidInkBackground isInkActive={isInkActive} />

      {/* Background Decorative Neon Glow (Hidden in Ink Mode) */}
      {!isInkActive && (
        <>
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[var(--color-accent-primary)]/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-accent-secondary)]/10 rounded-full blur-[120px] pointer-events-none" />
        </>
      )}

      {/* Parchment/Manuscript Textured Fiber Overlays */}
      {isInkActive && (
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[radial-gradient(#2b2315_1px,transparent_1px)] bg-[size:12px_12px] mix-blend-multiply" />
      )}

      {/* Ink & Quill Toggle Button */}
      <div className="fixed top-8 right-8 z-50">
        <button
          onClick={() => {
            setIsInkActive(!isInkActive);
            playTransition();
          }}
          onMouseEnter={playHover}
          className={`flex items-center gap-3 px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-widest transition-all duration-500 shadow-2xl hover:scale-105 no-cursor-scale ${
            isInkActive
              ? 'bg-[#4E270A] border-[#4E270A] text-[#FAF6EE] shadow-[#4E270A]/30 hover:bg-[#3D1E08]'
              : 'bg-[var(--color-bg-secondary)]/80 border-[var(--color-border-main)]/50 text-[var(--color-text-main)] hover:border-[var(--color-accent-primary)] hover:shadow-[0_0_20px_rgba(var(--color-accent-primary-rgb),0.3)]'
          }`}
        >
          <Feather className={`w-4 h-4 ${isInkActive ? 'animate-bounce text-[#FAF6EE]' : 'text-[var(--color-accent-primary)]'}`} />
          <span>{isInkActive ? 'DRY MANUSCRIPT' : 'DIP QUILL IN INK'}</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-20">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          onMouseEnter={playHover}
          className={`group flex items-center gap-4 transition-colors mb-16 no-cursor-scale ${
            isInkActive ? 'text-[#4E270A] hover:text-[#3D1E08]' : 'text-[var(--color-text-main)] hover:text-[var(--color-accent-primary)]'
          }`}
        >
          <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isInkActive 
              ? 'border-[#D0C2A7] bg-[#FAF6EE] group-hover:bg-[#4E270A]/10 group-hover:scale-110' 
              : 'border-[var(--color-border-main)]/30 bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm group-hover:border-[var(--color-accent-primary)] group-hover:scale-110'
          }`}>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="font-['Inter'] tracking-widest uppercase text-xs font-bold">Back to Home</span>
        </button>

        {/* Title Header Block */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b pb-8 transition-colors duration-500 ${
          isInkActive ? 'border-[#D0C2A7]' : 'border-[var(--color-border-main)]/20'
        }`}>
          <div>
            <div className={`flex items-center gap-3 uppercase tracking-[0.25em] text-xs font-bold mb-3 ${
              isInkActive ? 'text-[#4E270A] font-["Bona_Nova_SC"]' : 'text-[var(--color-accent-secondary)] font-["Inter"]'
            }`}>
              <Sparkles className="w-4 h-4" />
              <span>Malhar {year} &bull; {isInkActive ? 'Manuscript Mode' : 'Departmental Events'}</span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-5xl md:text-8xl leading-none transition-all duration-750 ${
                isInkActive 
                  ? "font-['Kaushan_Script'] text-[#4E270A]" 
                  : "font-['Britannic_Bold'] text-[var(--color-accent-primary)] uppercase tracking-[0.05em]"
              }`}
            >
              {name}
            </motion.h1>
          </div>
          
          <div className={`text-sm max-w-sm transition-all duration-500 ${
            isInkActive ? "font-['Bona_Nova_SC'] text-[#4E3E27]" : "font-['Inter'] text-[var(--color-text-main)]/50"
          }`}>
            {isInkActive 
              ? 'Move your quill cursor across the parchment to draw. Click anywhere to splatter fresh wet ink.' 
              : 'Discover the creative battles, expressions, and highlights designed to push limits and inspire passion.'}
          </div>
        </div>

        {/* Grid / Layout Section */}
        {departmentEvents.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className={`p-8 rounded-[32px] border backdrop-blur-md transition-all duration-700 shadow-2xl ${
                isInkActive 
                  ? 'bg-[#FAF6EE] border-[#D0C2A7] text-[#4E3E27]' 
                  : 'bg-[var(--color-bg-secondary)]/30 border-[var(--color-border-main)]/20'
              }`}>
                <BookOpen className={`w-8 h-8 mb-6 ${isInkActive ? 'text-[#4E270A]' : 'text-[var(--color-accent-secondary)]'}`} />
                <h3 className={`text-xl font-bold uppercase tracking-wider mb-4 ${isInkActive ? "font-['Kaushan_Script'] text-[#4E270A]" : "font-['Boldonse']"}`}>
                  Department Info
                </h3>
                <p className={`text-sm leading-relaxed mb-6 ${isInkActive ? "font-['Bona_Nova_SC']" : "font-['Inter']"}`}>
                  Welcome to {name}. Here we showcase some of the finest showdowns, original works, and live improvisations of the festival.
                </p>

              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {departmentEvents.map((event, idx) => (
                  <PremiumManuscriptCard 
                    key={event.id} 
                    event={event} 
                    index={idx} 
                    playHover={playHover} 
                    isInkActive={isInkActive} 
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[400px] rounded-3xl bg-[var(--color-bg-secondary)]/30 border border-[var(--color-border-main)]/20 backdrop-blur-md flex items-center justify-center">
            <span className="text-[var(--color-text-main)]/30 font-['Boldonse'] text-3xl uppercase tracking-widest text-center px-8">Coming Soon</span>
          </div>
        )}

      </div>
    </motion.div>
  );
};
