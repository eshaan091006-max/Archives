import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, BookOpen, Feather, Theater, Music, Palette, X } from 'lucide-react';
import { useSound } from '../../hooks/useSound';
import { YearKey } from '../../lib/themeData';
import { eventsData } from '../../lib/eventsData';
import { useGamification } from '../../context/GamificationContext';

interface DepartmentPageProps {
  id: string;
  name: string;
  year: YearKey;
  onBack: () => void;
}

// Sound effects URLs
const INK_SPLASH_SOUND = 'https://actions.google.com/sounds/v1/water/liquid_drip_plop.ogg';
const STAGE_CHIME_SOUND =
  'https://actions.google.com/sounds/v1/instruments/electric_piano_chord.ogg';
const PAINT_SPLAT_SOUND = 'https://actions.google.com/sounds/v1/water/splash.ogg';
const SITAR_SOUND = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Sitar_clipping.ogg';
const APPLAUSE_SOUND = 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Applause.ogg';

// Curated artistic colors for WPA and FA
const FA_PALETTE = ['#FF4D4D', '#FFB830', '#3DB2FF', '#05668D', '#9B5DE5', '#F15BB5'];

// ----------------------------------------------------
// 1. LITERARY ARTS: Ink Background Simulation
// ----------------------------------------------------
const LiquidInkBackground = ({ isInkActive }: { isInkActive: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blotsRef = useRef<
    Array<{
      x: number;
      y: number;
      size: number;
      maxSize: number;
      opacity: number;
      color: string;
      bleedFactor: number;
      points: Array<{ angle: number; length: number; speed: number; limit: number }>;
    }>
  >([]);

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
      const points: Array<{ angle: number; length: number; speed: number; limit: number }> = [];
      const numPoints = isSatellite ? 8 : 24;

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const limit = maxSize * (Math.random() * 0.45 + 0.75);
        const speed = Math.random() * 0.6 + 0.3;

        points.push({ angle, length: size, speed, limit });
      }

      blotsRef.current.push({
        x,
        y,
        size,
        maxSize,
        opacity: 0.96,
        color: Math.random() > 0.4 ? '#023E8A' : '#03045E', // Deep ink blues
        bleedFactor: Math.random() * 0.3 + 0.1,
        points,
      });

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
      spawnBlot(e.clientX, e.clientY, 8, Math.random() * 25 + 18);

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

      blotsRef.current.forEach(blot => {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = blot.color;
        ctx.globalAlpha = blot.opacity;
        ctx.shadowColor = blot.color;
        ctx.shadowBlur = 1.8;

        const pointsCount = blot.points.length;
        const startP = blot.points[0];
        const lastP = blot.points[pointsCount - 1];

        const startX = blot.x + Math.cos(startP.angle) * startP.length;
        const startY = blot.y + Math.sin(startP.angle) * startP.length;
        const lastX = blot.x + Math.cos(lastP.angle) * lastP.length;
        const lastY = blot.y + Math.sin(lastP.angle) * lastP.length;

        ctx.moveTo((startX + lastX) / 2, (startY + lastY) / 2);

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

          if (p.length < p.limit) {
            p.length += p.speed;
            p.length += (Math.random() - 0.5) * 0.15;
          }
        }

        ctx.closePath();
        ctx.fill();
        ctx.restore();

        blot.opacity -= 0.002;
      });

      blotsRef.current = blotsRef.current.filter(b => b.opacity > 0);
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

  if (!isInkActive) return null;

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
  );
};

// ----------------------------------------------------
// 2. WORLD PERFORMING ARTS: Stage Lights Background Simulation
// ----------------------------------------------------
const StageLightsBackground = ({ isStageActive }: { isStageActive: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      rotation: number;
      spin: number;
    }>
  >([]);

  const spotlightsRef = useRef<
    Array<{
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      radius: number;
      color: string;
      speed: number;
      originX: number;
    }>
  >([
    {
      x: 200,
      y: 300,
      targetX: 200,
      targetY: 300,
      radius: 240,
      color: 'rgba(25, 186, 241, 0.22)',
      speed: 0.02,
      originX: 0,
    },
    {
      x: 800,
      y: 350,
      targetX: 800,
      targetY: 350,
      radius: 280,
      color: 'rgba(247, 178, 73, 0.22)',
      speed: 0.015,
      originX: 0,
    },
    {
      x: 500,
      y: 400,
      targetX: 500,
      targetY: 400,
      radius: 260,
      color: 'rgba(168, 85, 247, 0.22)',
      speed: 0.025,
      originX: 0,
    },
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    spotlightsRef.current[0].originX = width * 0.15;
    spotlightsRef.current[1].originX = width * 0.85;
    spotlightsRef.current[2].originX = width * 0.5;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      spotlightsRef.current[0].originX = width * 0.15;
      spotlightsRef.current[1].originX = width * 0.85;
      spotlightsRef.current[2].originX = width * 0.5;
    };

    const spawnSparkle = (x: number, y: number, count = 1, isClick = false) => {
      const colors = ['#19BAF1', '#F7B249', '#A855F7', '#FF55B8', '#FFFFFF'];
      for (let i = 0; i < count; i++) {
        const angle = isClick
          ? Math.random() * Math.PI * 2
          : Math.random() * 0.4 - 0.2 - Math.PI / 2;
        const speed = isClick ? Math.random() * 5 + 2 : Math.random() * 1.5 + 0.5;

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * (isClick ? 4 : 2.5) + 1,
          opacity: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          spin: (Math.random() - 0.5) * 5,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isStageActive) return;

      spotlightsRef.current[0].targetX = e.clientX;
      spotlightsRef.current[0].targetY = e.clientY;

      if (Math.random() < 0.25) {
        spawnSparkle(e.clientX, e.clientY, 1, false);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!isStageActive) return;
      spawnSparkle(e.clientX, e.clientY, 20, true);

      const audio = new Audio(STAGE_CHIME_SOUND);
      audio.volume = 0.08;
      audio.play().catch(() => {});
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      spotlightsRef.current.forEach(spot => {
        spot.x += (spot.targetX - spot.x) * spot.speed;
        spot.y += (spot.targetY - spot.y) * spot.speed;

        if (Math.random() < 0.01) {
          spot.targetX = Math.random() * width;
          spot.targetY = Math.random() * height;
        }

        ctx.save();

        // A. Draw Stage Beam Cone with Blur
        ctx.save();
        ctx.filter = 'blur(10px)';
        const beamGrad = ctx.createLinearGradient(spot.originX, 0, spot.x, spot.y);
        beamGrad.addColorStop(0, spot.color.replace('0.22', '0.15'));
        beamGrad.addColorStop(0.5, spot.color.replace('0.22', '0.06'));
        beamGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(spot.originX - 15, 0);
        ctx.lineTo(spot.originX + 15, 0);
        ctx.lineTo(spot.x + spot.radius * 0.35, spot.y);
        ctx.lineTo(spot.x - spot.radius * 0.35, spot.y);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // B. Draw Floor Spotlight Circle Pool
        ctx.save();
        const floorGrad = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.radius);
        floorGrad.addColorStop(0, spot.color.replace('0.22', '0.28'));
        floorGrad.addColorStop(0.5, spot.color.replace('0.22', '0.12'));
        floorGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = floorGrad;
        ctx.beginPath();
        ctx.arc(spot.x, spot.y, spot.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      particlesRef.current.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;

        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          ctx.lineTo(0, -p.size * 2);
          ctx.lineTo(p.size / 2, -p.size / 2);
          ctx.rotate(Math.PI / 2);
        }
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.01;
        p.rotation += p.spin;
        p.opacity -= 0.012;
      });

      particlesRef.current = particlesRef.current.filter(p => p.opacity > 0);
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
  }, [isStageActive]);

  if (!isStageActive) return null;

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
  );
};

// ----------------------------------------------------
// 2B. FINE ARTS: Studio Paint Background Simulation
// ----------------------------------------------------
const FineArtsCanvasBackground = ({
  isPaintActive,
  activeColor,
}: {
  isPaintActive: boolean;
  activeColor: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Keep track of active brush strokes (lines)
  const strokesRef = useRef<
    Array<{
      points: Array<{ x: number; y: number }>;
      color: string;
      opacity: number;
    }>
  >([]);

  // Keep track of splatters and paint drips
  const splattersRef = useRef<
    Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      opacity: number;
      drips: Array<{ currY: number; targetY: number; speed: number; width: number }>;
    }>
  >([]);

  const isDrawing = useRef(false);

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

    const handleMouseDown = (e: MouseEvent) => {
      if (!isPaintActive) return;
      isDrawing.current = true;

      // Start new brush stroke
      strokesRef.current.push({
        points: [{ x: e.clientX, y: e.clientY }],
        color: activeColor,
        opacity: 0.9,
      });
      const splatSize = Math.random() * 12 + 6;
      const dripCount = Math.floor(Math.random() * 4) + 1;
      const dripsList: Array<{ currY: number; targetY: number; speed: number; width: number }> = [];

      for (let i = 0; i < dripCount; i++) {
        dripsList.push({
          currY: e.clientY,
          targetY: e.clientY + Math.random() * 80 + 20,
          speed: Math.random() * 1.5 + 0.5,
          width: Math.random() * 2 + 1,
        });
      }

      splattersRef.current.push({
        x: e.clientX,
        y: e.clientY,
        size: splatSize,
        color: activeColor,
        opacity: 0.95,
        drips: dripsList,
      });

      // Play soft paint splash sound
      const audio = new Audio(PAINT_SPLAT_SOUND);
      audio.volume = 0.05;
      audio.play().catch(() => {});
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPaintActive) return;

      if (isDrawing.current && strokesRef.current.length > 0) {
        const currentStroke = strokesRef.current[strokesRef.current.length - 1];
        currentStroke.points.push({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      isDrawing.current = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw brush strokes (slowly fading)
      strokesRef.current.forEach(stroke => {
        if (stroke.points.length < 2) return;

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = stroke.color;
        ctx.globalAlpha = stroke.opacity;
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();
        ctx.restore();

        // Slow fade for artistic brush trails
        stroke.opacity -= 0.0015;
      });

      // 2. Draw paint splatters & dripping animations
      splattersRef.current.forEach(splat => {
        ctx.save();
        ctx.globalAlpha = splat.opacity;
        ctx.fillStyle = splat.color;

        // Draw main splat blob
        ctx.beginPath();
        ctx.arc(splat.x, splat.y, splat.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw satellite micro droplets around splat
        ctx.beginPath();
        const splashDots = 8;
        for (let i = 0; i < splashDots; i++) {
          const angle = (i / splashDots) * Math.PI * 2;
          const dist = splat.size * (1.2 + Math.random() * 0.8);
          const dotSize = Math.random() * 2 + 0.8;
          ctx.arc(
            splat.x + Math.cos(angle) * dist,
            splat.y + Math.sin(angle) * dist,
            dotSize,
            0,
            Math.PI * 2
          );
        }
        ctx.fill();

        // Draw and animate gravity drips sliding down
        splat.drips.forEach(drip => {
          ctx.beginPath();
          ctx.lineWidth = drip.width;
          ctx.strokeStyle = splat.color;
          ctx.lineCap = 'round';
          ctx.moveTo(splat.x + (Math.random() - 0.5) * splat.size * 0.6, splat.y);
          ctx.lineTo(splat.x + (Math.random() - 0.5) * splat.size * 0.6, drip.currY);
          ctx.stroke();

          // Drip grows downwards slowly
          if (drip.currY < drip.targetY) {
            drip.currY += drip.speed;
          }
        });

        ctx.restore();

        // Slow fade of splatter
        splat.opacity -= 0.001;
      });

      // Filter out invisible strokes/splatters
      strokesRef.current = strokesRef.current.filter(s => s.opacity > 0);
      splattersRef.current = splattersRef.current.filter(s => s.opacity > 0);
    };

    const loop = () => {
      draw();
      animationId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationId);
    };
  }, [isPaintActive, activeColor]);

  if (!isPaintActive) return null;

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
  );
};

// ----------------------------------------------------
// 3. CURSOR COMPONENTS
// ----------------------------------------------------
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

      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        const targetRot = Math.atan2(dy, dx) * (180 / Math.PI) - 45;
        setRotation(prev => prev + (targetRot - prev) * 0.15);
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
        filter:
          'sepia(1) saturate(6) hue-rotate(10deg) brightness(0.85) drop-shadow(0 2px 4px rgba(78,39,10,0.4))',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      🖋️
    </motion.div>
  );
};

const StageCursor = ({ isStageActive }: { isStageActive: boolean }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressing, setIsPressing] = useState(false);

  useEffect(() => {
    if (!isStageActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
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
  }, [isStageActive]);

  if (!isStageActive) return null;

  return (
    <motion.div
      className="hidden md:flex fixed pointer-events-none z-[99999] items-center justify-center"
      style={{
        left: position.x,
        top: position.y,
        x: '-50%',
        y: '-50%',
        width: 32,
        height: 32,
      }}
    >
      <motion.div
        animate={{
          scale: isPressing ? 1.3 : 1,
          borderColor: isPressing ? '#19BAF1' : '#F7B249',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        className="w-full h-full rounded-full border border-amber-400/50 flex items-center justify-center relative bg-black/10 backdrop-blur-[1px]"
      >
        <motion.div
          animate={{
            scale: isPressing ? 1.5 : 1,
            backgroundColor: isPressing ? '#19BAF1' : '#F7B249',
          }}
          className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(247,178,73,0.8)]"
        />

        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-amber-400/20" />
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-amber-400/20" />
      </motion.div>
    </motion.div>
  );
};

const PaintbrushCursor = ({
  isPaintActive,
  activeColor,
}: {
  isPaintActive: boolean;
  activeColor: string;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressing, setIsPressing] = useState(false);

  useEffect(() => {
    if (!isPaintActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
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
  }, [isPaintActive]);

  if (!isPaintActive) return null;

  return (
    <motion.div
      className="hidden md:block fixed pointer-events-none z-[99999]"
      style={{
        left: position.x,
        top: position.y,
        x: '-10%',
        y: '-90%',
        rotate: 0,
        scale: isPressing ? 0.8 : 1,
        transformOrigin: 'bottom left',
        fontSize: '32px',
        lineHeight: 1,
        filter: `drop-shadow(0 4px 8px rgba(0,0,0,0.3)) drop-shadow(0 0 12px ${activeColor})`,
      }}
      transition={{ type: 'spring', stiffness: 450, damping: 28 }}
    >
      🖌️
    </motion.div>
  );
};

const SwarTaalCursor = ({ isIpaActive }: { isIpaActive: boolean }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressing, setIsPressing] = useState(false);

  useEffect(() => {
    if (!isIpaActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
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
  }, [isIpaActive]);

  if (!isIpaActive) return null;

  return (
    <motion.div
      className="hidden md:block fixed pointer-events-none z-[99999]"
      style={{
        left: position.x,
        top: position.y,
        x: '-50%',
        y: '-50%',
        width: 40,
        height: 40,
      }}
    >
      <motion.div
        animate={{
          scale: isPressing ? 1.4 : 1,
        }}
        className="w-full h-full rounded-full border-2 border-amber-500/60 flex items-center justify-center bg-amber-500/5 relative"
      >
        <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_12px_#F59E0B]" />
        <motion.div
          animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full border border-amber-500/40"
        />
      </motion.div>
    </motion.div>
  );
};

const SwarTaalBackground = ({ isIpaActive }: { isIpaActive: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeAudiosRef = useRef<HTMLAudioElement[]>([]);

  const stringsRef = useRef<
    Array<{
      baseY: number;
      nodes: Array<{ y: number; vy: number }>;
    }>
  >([]);

  const ripplesRef = useRef<
    Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      speed: number;
    }>
  >([]);

  const mousePosRef = useRef({ x: 0, y: 0 });
  const lastPluckRef = useRef<number[]>([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    if (!isIpaActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const numStrings = 6;
    const numNodes = 40;
    const initStrings = () => {
      stringsRef.current = [];
      for (let i = 0; i < numStrings; i++) {
        const baseY = height * (0.2 + 0.12 * i);
        const nodes: Array<{ y: number; vy: number }> = [];
        for (let j = 0; j < numNodes; j++) {
          nodes.push({ y: 0, vy: 0 });
        }
        stringsRef.current.push({ baseY, nodes });
      }
    };
    initStrings();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStrings();
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const prevY = mousePosRef.current.y;
      const currY = e.clientY;
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      stringsRef.current.forEach((string, stringIndex) => {
        // Detect if mouse crossed this string
        if (prevY !== 0) {
          const crossed = (prevY < string.baseY && currY >= string.baseY) || 
                          (prevY > string.baseY && currY <= string.baseY);
          
          if (crossed) {
            const now = Date.now();
            if (now - lastPluckRef.current[stringIndex] > 150) {
              lastPluckRef.current[stringIndex] = now;
              // Play sound for this string with pitch based on string index
              const audio = new Audio(SITAR_SOUND);
              audio.volume = 0.3; // Increased to ensure it's audible
              // Top string (0) has highest pitch, bottom string (5) has lowest
              audio.playbackRate = 1.6 - (stringIndex * 0.18); 
              audio.play().catch(() => {});
              
              activeAudiosRef.current.push(audio);
              audio.onended = () => {
                activeAudiosRef.current = activeAudiosRef.current.filter(a => a !== audio);
              };
            }
          }
        }

        const distY = Math.abs(e.clientY - string.baseY);
        if (distY < 60) {
          const forceFactor = (1 - distY / 60) * 8;
          const nodeIdx = Math.floor((e.clientX / width) * (numNodes - 1));
          if (nodeIdx >= 0 && nodeIdx < numNodes) {
            for (let offset = -3; offset <= 3; offset++) {
              const idx = nodeIdx + offset;
              if (idx >= 0 && idx < numNodes) {
                const factor = (4 - Math.abs(offset)) / 4;
                string.nodes[idx].vy +=
                  (e.clientY - (string.baseY + string.nodes[idx].y)) * 0.05 * factor * forceFactor;
              }
            }
          }
        }
      });
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('.no-cursor-scale')) {
        return;
      }

      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.7,
        opacity: 1,
        speed: 10,
      });

      const audio = new Audio(SITAR_SOUND);
      audio.volume = 0.4; // Slightly louder click pulse
      audio.playbackRate = 0.8 + Math.random() * 0.4;
      audio.play().catch(() => {});
      
      activeAudiosRef.current.push(audio);
      audio.onended = () => {
        activeAudiosRef.current = activeAudiosRef.current.filter(a => a !== audio);
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    let animationId: number;

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      ripplesRef.current.forEach(ripple => {
        ripple.radius += ripple.speed;
        ripple.opacity -= 0.015;

        ctx.save();
        ctx.strokeStyle = `rgba(247, 178, 73, ${ripple.opacity * 0.6})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = 'rgba(247, 178, 73, 0.4)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        stringsRef.current.forEach(string => {
          const distY = Math.abs(ripple.y - string.baseY);
          if (ripple.radius > distY) {
            const dx = Math.sqrt(ripple.radius * ripple.radius - distY * distY);
            const x1 = ripple.x - dx;
            const x2 = ripple.x + dx;

            [x1, x2].forEach(x => {
              if (x >= 0 && x <= width) {
                const nodeIdx = Math.floor((x / width) * (numNodes - 1));
                if (nodeIdx >= 0 && nodeIdx < numNodes) {
                  string.nodes[nodeIdx].vy += (Math.random() - 0.5) * ripple.opacity * 12;
                }
              }
            });
          }
        });
      });

      ripplesRef.current = ripplesRef.current.filter(r => r.opacity > 0);

      stringsRef.current.forEach(string => {
        const { baseY, nodes } = string;

        const damping = 0.94;
        const tension = 0.32;
        const k = 0.05;

        const nextNodes = nodes.map(node => ({ ...node }));

        for (let j = 1; j < numNodes - 1; j++) {
          const leftY = nodes[j - 1].y;
          const rightY = nodes[j + 1].y;
          const currY = nodes[j].y;

          const springForce = -k * currY;
          const tensionForce = tension * (leftY + rightY - 2 * currY);

          let vy = nodes[j].vy + springForce + tensionForce;
          vy *= damping;

          nextNodes[j].vy = vy;
          nextNodes[j].y = currY + vy;
        }

        for (let j = 0; j < numNodes; j++) {
          nodes[j] = nextNodes[j];
        }

        ctx.save();
        ctx.beginPath();

        ctx.moveTo(0, baseY + nodes[0].y);
        for (let j = 1; j < numNodes; j++) {
          const ptX = (j / (numNodes - 1)) * width;
          const ptY = baseY + nodes[j].y;

          const prevPtX = ((j - 1) / (numNodes - 1)) * width;
          const prevPtY = baseY + nodes[j - 1].y;
          const midX = (prevPtX + ptX) / 2;
          const midY = (prevPtY + ptY) / 2;

          ctx.quadraticCurveTo(prevPtX, prevPtY, midX, midY);
        }
        ctx.lineTo(width, baseY + nodes[numNodes - 1].y);

        ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
        ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(251, 191, 36, 0.7)';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();
      });

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationId);
      
      // Stop all playing sitar sounds when exiting the page
      activeAudiosRef.current.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      activeAudiosRef.current = [];
    };
  }, [isIpaActive]);

  if (!isIpaActive) return null;

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
  );
};

const EtcwCursor = ({ isEtcwActive }: { isEtcwActive: boolean }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressing, setIsPressing] = useState(false);

  useEffect(() => {
    if (!isEtcwActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
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
  }, [isEtcwActive]);

  if (!isEtcwActive) return null;

  return (
    <motion.div
      className="hidden md:block fixed pointer-events-none z-[99999] rounded-full border-2 border-rose-400"
      style={{
        left: position.x,
        top: position.y,
        width: '24px',
        height: '24px',
        x: '-50%',
        y: '-50%',
        boxShadow: '0 0 15px rgba(244, 63, 94, 0.4), inset 0 0 10px rgba(244, 63, 94, 0.2)',
      }}
      animate={{
        scale: isPressing ? 0.6 : 1,
        borderColor: isPressing ? '#f43f5e' : '#fb7185',
        backgroundColor: isPressing ? 'rgba(244, 63, 94, 0.1)' : 'transparent',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    />
  );
};

const EtcwBackground = ({ isEtcwActive }: { isEtcwActive: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      char: string;
      rotation: number;
      spin: number;
    }>
  >([]);

  const curtainLeftRef = useRef({ widthFactor: 0.15, targetWidthFactor: 0.15 });
  const curtainRightRef = useRef({ widthFactor: 0.15, targetWidthFactor: 0.15 });

  useEffect(() => {
    if (!isEtcwActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const spawnConfetti = (x: number, y: number, count = 15) => {
      const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
      const symbols = ['⭐', '🎭', '🎬', '✨', '🎫'];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          size: Math.random() * 10 + 10,
          opacity: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          char: symbols[Math.floor(Math.random() * symbols.length)],
          rotation: Math.random() * 360,
          spin: (Math.random() - 0.5) * 6,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const leftDist = e.clientX / width;
      const rightDist = 1 - e.clientX / width;

      if (leftDist < 0.25) {
        curtainLeftRef.current.targetWidthFactor = 0.06;
      } else {
        curtainLeftRef.current.targetWidthFactor = 0.15;
      }

      if (rightDist < 0.25) {
        curtainRightRef.current.targetWidthFactor = 0.06;
      } else {
        curtainRightRef.current.targetWidthFactor = 0.15;
      }

      if (Math.random() < 0.4) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -Math.random() * 0.5 - 0.5,
          size: Math.random() * 5 + 3,
          opacity: 0.8,
          color: '#FDA4AF', // glowing rose trail
          char: '', // empty to render as a circle
          rotation: 0,
          spin: 0,
        });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('.no-cursor-scale')) {
        return;
      }
      spawnConfetti(e.clientX, e.clientY, 25);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    let animationId: number;

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const beamGrad = ctx.createLinearGradient(width / 2, 0, width / 2, height);
      beamGrad.addColorStop(0, 'rgba(168, 85, 247, 0.08)');
      beamGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 100, 0);
      ctx.lineTo(width / 2 + 100, 0);
      ctx.lineTo(width / 2 + 350, height);
      ctx.lineTo(width / 2 - 350, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      curtainLeftRef.current.widthFactor +=
        (curtainLeftRef.current.targetWidthFactor - curtainLeftRef.current.widthFactor) * 0.08;
      curtainRightRef.current.widthFactor +=
        (curtainRightRef.current.targetWidthFactor - curtainRightRef.current.widthFactor) * 0.08;

      const drawCurtain = (isLeft: boolean, factor: number) => {
        ctx.save();
        const curtainWidth = width * factor;
        const gradient = ctx.createLinearGradient(
          isLeft ? 0 : width - curtainWidth,
          0,
          isLeft ? curtainWidth : width,
          0
        );
        gradient.addColorStop(0, '#450a0a');
        gradient.addColorStop(0.3, '#7f1d1d');
        gradient.addColorStop(0.7, '#991b1b');
        gradient.addColorStop(1, '#1e0000');

        ctx.fillStyle = gradient;
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 20;

        ctx.beginPath();
        if (isLeft) {
          ctx.rect(0, 0, curtainWidth, height);
        } else {
          ctx.rect(width - curtainWidth, 0, curtainWidth, height);
        }
        ctx.fill();

        ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.lineWidth = 4;
        const numFolds = 5;
        const foldSpacing = curtainWidth / numFolds;
        for (let i = 1; i < numFolds; i++) {
          ctx.beginPath();
          const startX = isLeft ? i * foldSpacing : width - curtainWidth + i * foldSpacing;
          ctx.moveTo(startX, 0);
          ctx.lineTo(startX, height);
          ctx.stroke();
        }

        ctx.restore();
      };

      drawCurtain(true, curtainLeftRef.current.widthFactor);
      drawCurtain(false, curtainRightRef.current.widthFactor);

      particlesRef.current.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.char) {
          ctx.font = `${p.size}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.char, 0, 0);
        } else {
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.vx *= 0.98;
        p.rotation += p.spin;
        p.opacity -= 0.012;
      });

      particlesRef.current = particlesRef.current.filter(p => p.opacity > 0);

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationId);
    };
  }, [isEtcwActive]);

  if (!isEtcwActive) return null;

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
  );
};

// ----------------------------------------------------
// 4. DEPARTMENT PAGES: Premium Cards (Manuscript, Stage, & Paint Studio)
// ----------------------------------------------------
const PremiumManuscriptCard = ({
  event,
  index,
  playHover,
  isInkActive,
  isStageActive,
  isPaintActive,
  isIpaActive,
  isEtcwActive,
  deptId,
}: {
  event: any;
  index: number;
  playHover: () => void;
  isInkActive: boolean;
  isStageActive: boolean;
  isPaintActive: boolean;
  isIpaActive: boolean;
  isEtcwActive: boolean;
  deptId: string;
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

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
  };

  // ETCW (Theatricals & Workshops) style layout
  if (deptId === 'etcw' && isEtcwActive) {
    return (
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={playHover}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 85 }}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
        className="group relative p-8 md:p-10 rounded-[32px] border border-rose-500/20 bg-rose-950/20 backdrop-blur-xl text-rose-100 transition-all duration-700 shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-amber-400/40 cursor-none"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
          style={{
            background: `radial-gradient(circle 200px at ${hoverPosition.x}px ${hoverPosition.y}px, rgba(244,63,94,0.08) 0%, transparent 100%)`,
          }}
        />

        <div className="absolute inset-3 rounded-[24px] pointer-events-none border border-rose-500/10 group-hover:border-amber-400/20 group-hover:scale-[1.01] transition-all duration-500 z-10" />

        <span className="absolute bottom-6 right-8 text-9xl font-['Boldonse'] font-bold select-none opacity-[0.02] transition-all duration-700 group-hover:opacity-[0.06] group-hover:scale-105 text-amber-400">
          {(index + 1).toString().padStart(2, '0')}
        </span>

        <div className="relative z-20 space-y-4" style={{ transform: 'translateZ(30px)' }}>
          <span className="block text-[10px] font-['Inter'] tracking-[0.2em] uppercase text-rose-400 mb-2">
            Stage Call &bull; Malhar Drama
          </span>

          <h3 className="text-2xl md:text-3xl font-bold font-['Boldonse'] uppercase tracking-wider text-rose-100 group-hover:text-amber-400 transition-colors duration-300">
            {event.title}
          </h3>

          <p className="text-sm md:text-base leading-relaxed font-['Inter'] text-rose-200/70 font-light">
            {event.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {event.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold tracking-wider uppercase border border-rose-500/30 bg-rose-950/30 text-rose-300 group-hover:border-amber-400/40 group-hover:text-amber-400 font-['Inter'] transition-colors duration-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {(event.judgeName || event.winnerName) && (
            <div className="border-t border-rose-500/30 pt-4 flex flex-col lg:flex-row gap-4 justify-between mt-6">
              {event.judgeName && (
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-xs font-['Inter'] tracking-wider text-rose-300/60 uppercase">Guest Judge</p>
                    <p className="text-sm font-['Boldonse'] tracking-wide text-rose-100">{event.judgeName}</p>
                  </div>
                </div>
              )}
              {event.winnerName && (
                <div className="lg:text-right">
                  <p className="text-[10px] font-['Inter'] tracking-widest text-rose-300/60 uppercase mb-1">
                    Winner <span className="opacity-50">|</span> {event.winningContingent}
                  </p>
                  <p className="text-sm font-['Boldonse'] tracking-wider text-amber-400 uppercase">{event.winnerName}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // Indian Performing Arts traditional style layout
  if (deptId === 'ipa' && isIpaActive) {
    return (
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={playHover}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 85 }}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
        className="group relative p-8 md:p-10 rounded-[32px] border border-[#B45309]/40 bg-[#2C1910]/70 backdrop-blur-xl text-amber-100 transition-all duration-700 shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:border-[#F59E0B] cursor-none"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
          style={{
            background: `radial-gradient(circle 200px at ${hoverPosition.x}px ${hoverPosition.y}px, rgba(245,158,11,0.08) 0%, rgba(220,38,38,0.04) 60%, transparent 100%)`,
          }}
        />

        <div className="absolute inset-2 rounded-[22px] pointer-events-none border border-[#F59E0B]/20 group-hover:border-[#F59E0B]/40 group-hover:scale-[1.01] transition-all duration-500 z-10" />

        <span className="absolute bottom-6 right-8 text-9xl font-['Alexandria'] font-bold select-none opacity-[0.02] transition-all duration-700 group-hover:opacity-[0.05] group-hover:scale-105 text-[#F59E0B]">
          {(index + 1).toString().padStart(2, '0')}
        </span>

        <div className="relative z-20 space-y-4" style={{ transform: 'translateZ(30px)' }}>
          <span className="block text-[10px] font-['Inter'] tracking-[0.2em] uppercase text-[#F59E0B] mb-2">
            Darbar Performance • Malhar{' '}
            {event.id.includes('23') ? '2023' : event.id.includes('24') ? '2024' : '2025'}
          </span>

          <h3 className="text-2xl md:text-3xl font-bold font-['Boldonse'] uppercase tracking-wider text-amber-200 group-hover:text-[#F59E0B] transition-colors duration-300">
            {event.title}
          </h3>

          <p className="text-sm md:text-base leading-relaxed font-['Inter'] text-amber-100/70 font-light">
            {event.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {event.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold tracking-wider uppercase border border-[#F59E0B]/30 bg-[#F59E0B]/5 text-[#F59E0B]/90 font-['Inter'] transition-colors duration-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {(event.judgeName || event.winnerName) && (
            <div className="border-t border-[#B45309]/40 pt-4 flex flex-col lg:flex-row gap-4 justify-between mt-6">
              {event.judgeName && (
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-xs font-['Inter'] tracking-wider text-[#F59E0B]/60 uppercase">Guest Judge</p>
                    <p className="text-sm font-['Boldonse'] tracking-wide text-amber-200">{event.judgeName}</p>
                  </div>
                </div>
              )}
              {event.winnerName && (
                <div className="lg:text-right">
                  <p className="text-[10px] font-['Inter'] tracking-widest text-[#F59E0B]/60 uppercase mb-1">
                    Winner <span className="opacity-50">|</span> {event.winningContingent}
                  </p>
                  <p className="text-sm font-['Boldonse'] tracking-wider text-[#F59E0B] uppercase">{event.winnerName}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // Fine Arts Studio layout
  if (deptId === 'fa' && isPaintActive) {
    return (
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={playHover}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 85 }}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
        className="group relative p-8 md:p-10 rounded-[32px] border-8 border-[#3D2B1F] bg-[#FCFAF5] text-[#332E24] transition-all duration-700 shadow-[0_15px_35px_rgba(62,39,35,0.15)] hover:border-[#8D6E63] cursor-none"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
          style={{
            background: `radial-gradient(circle 220px at ${hoverPosition.x}px ${hoverPosition.y}px, rgba(25,186,241,0.06) 0%, rgba(247,178,73,0.04) 60%, transparent 100%)`,
          }}
        />

        <div className="absolute inset-2 rounded-[22px] pointer-events-none border border-[#D7CCC8]/40 group-hover:border-[#8D6E63]/30 group-hover:scale-[1.01] transition-all duration-500 z-10" />

        <span className="absolute bottom-6 right-8 text-9xl font-['Alexandria'] font-bold select-none opacity-[0.03] transition-all duration-700 group-hover:opacity-[0.07] group-hover:scale-105 text-[#8D6E63]">
          {(index + 1).toString().padStart(2, '0')}
        </span>

        <div className="relative z-20 space-y-4" style={{ transform: 'translateZ(30px)' }}>
          <span className="block text-[10px] font-['Inter'] tracking-[0.2em] uppercase text-[#8D6E63]/80 mb-2">
            Acrylic on Canvas • Malhar Studio
          </span>

          <h3 className="text-2xl md:text-3xl font-bold font-['Boldonse'] uppercase tracking-wider text-[#332E24] group-hover:text-[#8D6E63] transition-colors duration-300">
            {event.title}
          </h3>

          <p className="text-sm md:text-base leading-relaxed font-['Inter'] text-[#554E41] font-light">
            {event.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {event.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold tracking-wider uppercase border border-[#8D6E63]/30 bg-[#8D6E63]/5 text-[#8D6E63] font-['Inter'] transition-colors duration-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {(event.judgeName || event.winnerName) && (
            <div className="border-t border-[#D7CCC8]/60 pt-4 flex flex-col lg:flex-row gap-4 justify-between mt-6">
              {event.judgeName && (
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-xs font-['Inter'] tracking-wider text-[#8D6E63]/80 uppercase">Guest Judge</p>
                    <p className="text-sm font-['Boldonse'] tracking-wide text-[#332E24]">{event.judgeName}</p>
                  </div>
                </div>
              )}
              {event.winnerName && (
                <div className="lg:text-right">
                  <p className="text-[10px] font-['Inter'] tracking-widest text-[#8D6E63]/80 uppercase mb-1">
                    Winner <span className="opacity-50">|</span> {event.winningContingent}
                  </p>
                  <p className="text-sm font-['Boldonse'] tracking-wider text-[#8D6E63] uppercase">{event.winnerName}</p>
                </div>
              )}
            </div>
          )}

          <div className="border-t border-[#DDD5C3]/60 pt-4 flex justify-between items-center mt-6">
            <span className="text-[10px] font-['Bona_Nova_SC'] italic text-[#8D6E63]">
              Ref. FA-{(index + 1).toString().padStart(2, '0')}
            </span>
            <span className="text-[9px] font-['Inter'] font-semibold tracking-widest text-[#3D2B1F]/60 uppercase">
              Gallery Display
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  // World Performing Arts layout
  if (deptId === 'wpa' && isStageActive) {
    return (
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={playHover}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 85 }}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
        className="group relative p-8 md:p-10 rounded-[32px] border border-violet-500/20 bg-slate-950/40 backdrop-blur-xl text-slate-100 transition-all duration-700 shadow-[0_0_30px_rgba(168,85,247,0.03)] hover:border-amber-400/40 cursor-none"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
          style={{
            background: `radial-gradient(circle 200px at ${hoverPosition.x}px ${hoverPosition.y}px, rgba(247,178,73,0.09) 0%, rgba(168,85,247,0.04) 50%, transparent 100%)`,
          }}
        />

        <div className="absolute inset-3 rounded-[24px] pointer-events-none border border-violet-500/10 group-hover:border-amber-400/20 group-hover:scale-[1.01] transition-all duration-500 z-10" />

        <span className="absolute bottom-6 right-8 text-9xl font-['Boldonse'] font-bold select-none opacity-[0.02] transition-all duration-700 group-hover:opacity-[0.06] group-hover:scale-105 text-amber-400">
          {(index + 1).toString().padStart(2, '0')}
        </span>

        <div className="relative z-20 space-y-4" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-2xl md:text-3xl font-bold font-['Boldonse'] uppercase tracking-wider text-slate-100 group-hover:text-amber-400 transition-colors duration-300">
            {event.title}
          </h3>

          <p className="text-sm md:text-base leading-relaxed font-['Inter'] text-slate-300 font-light">
            {event.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {event.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold tracking-wider uppercase border border-violet-500/30 bg-violet-950/20 text-violet-300 group-hover:border-amber-400/40 group-hover:text-amber-400 font-['Inter'] transition-colors duration-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {(event.judgeName || event.winnerName) && (
            <div className="border-t border-violet-500/30 pt-4 flex flex-col lg:flex-row gap-4 justify-between mt-6">
              {event.judgeName && (
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-xs font-['Inter'] tracking-wider text-violet-300/60 uppercase">Guest Judge</p>
                    <p className="text-sm font-['Boldonse'] tracking-wide text-slate-100">{event.judgeName}</p>
                  </div>
                </div>
              )}
              {event.winnerName && (
                <div className="lg:text-right">
                  <p className="text-[10px] font-['Inter'] tracking-widest text-violet-300/60 uppercase mb-1">
                    Winner <span className="opacity-50">|</span> {event.winningContingent}
                  </p>
                  <p className="text-sm font-['Boldonse'] tracking-wider text-amber-400 uppercase">{event.winnerName}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // Standard/Literary Arts sepia manuscript layout
  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHover}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 85 }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative p-8 md:p-10 rounded-[32px] border transition-all duration-700 shadow-xl overflow-hidden cursor-none ${
        isInkActive
          ? 'bg-white border-blue-200 text-[#0f172a] hover:border-blue-400'
          : 'bg-[var(--color-bg-secondary)]/40 border-[var(--color-border-main)]/30 text-[var(--color-text-main)] hover:border-[var(--color-accent-primary)] hover:bg-[var(--color-bg-secondary)]/60'
      }`}
    >
      {isInkActive && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
          style={{
            background: `radial-gradient(circle 200px at ${hoverPosition.x}px ${hoverPosition.y}px, rgba(59,130,246,0.08) 0%, transparent 100%)`,
          }}
        />
      )}

      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
        <div className="absolute top-0 left-0 w-[50%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/4 -translate-x-[150%] rotate-[35deg] group-hover:animate-[sheen_1.5s_ease-in-out_infinite]" />
      </div>

      <div
        className={`absolute inset-3 rounded-[24px] pointer-events-none border transition-all duration-500 z-10 ${
          isInkActive
            ? 'border-blue-100 group-hover:border-blue-300 group-hover:scale-[1.01]'
            : 'border-[var(--color-border-main)]/10 group-hover:border-[var(--color-accent-primary)]/20 group-hover:scale-[1.01]'
        }`}
      />

      {isInkActive && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(transparent, transparent 27px, #3b82f6 28px)',
            backgroundSize: '100% 28px',
          }}
        />
      )}
      {isInkActive && (
        <div className="absolute top-0 bottom-0 left-8 w-[1px] bg-red-400/40 pointer-events-none" />
      )}

      <span
        className={`absolute bottom-6 right-8 text-9xl font-['Boldonse'] font-bold select-none opacity-[0.03] transition-all duration-700 group-hover:opacity-[0.07] group-hover:scale-105 ${
          isInkActive ? 'text-blue-800' : 'text-[var(--color-accent-primary)]'
        }`}
      >
        {(index + 1).toString().padStart(2, '0')}
      </span>

      <div className="relative z-20 space-y-4" style={{ transform: 'translateZ(30px)' }}>
        <h3
          className={`text-2xl md:text-3xl font-bold transition-all duration-700 leading-snug ${
            isInkActive
              ? "font-['Kaushan_Script'] text-[#1e3a8a] group-hover:text-blue-600"
              : "font-['Boldonse'] uppercase tracking-wider text-[var(--color-text-main)] group-hover:text-[var(--color-accent-primary)]"
          }`}
        >
          {event.title}
        </h3>

        <p
          className={`text-sm md:text-base leading-relaxed transition-all duration-500 ${
            isInkActive
              ? "font-['Inter'] text-slate-700 font-medium"
              : "font-['Inter'] text-[var(--color-text-main)]/70 font-light"
          }`}
        >
          {event.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {event.tags.map((tag: string) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold tracking-wider uppercase border transition-all duration-500 ${
                isInkActive
                  ? "border-blue-200 bg-blue-50 text-blue-700 font-['Inter'] group-hover:border-blue-400"
                  : "border-[var(--color-accent-secondary)]/20 bg-[var(--color-accent-secondary)]/5 text-[var(--color-accent-secondary)] group-hover:border-[var(--color-accent-primary)]/50 group-hover:text-[var(--color-accent-primary)] font-['Inter']"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {(event.judgeName || event.winnerName) && (
          <div className={`border-t pt-4 flex flex-col lg:flex-row gap-4 justify-between mt-6 ${
            isInkActive ? 'border-blue-200' : 'border-[var(--color-border-main)]/30'
          }`}>
            {event.judgeName && (
              <div className="flex items-center gap-3">
                <div>
                  <p className={`text-xs font-['Inter'] tracking-wider uppercase ${
                    isInkActive ? 'text-slate-500' : 'text-[var(--color-text-main)]/50'
                  }`}>Guest Judge</p>
                  <p className={`text-sm tracking-wide ${
                    isInkActive ? "font-['Kaushan_Script'] text-blue-900" : "font-['Boldonse'] text-[var(--color-text-main)]"
                  }`}>{event.judgeName}</p>
                </div>
              </div>
            )}
            {event.winnerName && (
              <div className="lg:text-right">
                <p className={`text-[10px] font-['Inter'] tracking-widest uppercase mb-1 ${
                  isInkActive ? 'text-slate-500' : 'text-[var(--color-text-main)]/50'
                }`}>
                  Winner <span className="opacity-50">|</span> {event.winningContingent}
                </p>
                <p className={`text-sm tracking-wider uppercase ${
                  isInkActive ? "font-['Kaushan_Script'] text-blue-700" : "font-['Boldonse'] text-[var(--color-accent-primary)]"
                }`}>{event.winnerName}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const DepartmentPage = ({ id, name, year, onBack }: DepartmentPageProps) => {
  const { playTransition, playHover } = useSound();
  const [isInkActive, setIsInkActive] = useState(id === 'la');
  const [isStageActive, setIsStageActive] = useState(id === 'wpa');
  const [isPaintActive, setIsPaintActive] = useState(id === 'fa');
  const [isIpaActive, setIsIpaActive] = useState(id === 'ipa');
  const [isEtcwActive, setIsEtcwActive] = useState(id === 'etcw');
  
  const { poemUnlocked, unlockPoem, closePoem } = useGamification();
  const [poemClicks, setPoemClicks] = useState(0);
  
  const handleStampClick = () => {
    if (poemUnlocked) return;
    const newCount = poemClicks + 1;
    setPoemClicks(newCount);
    if (newCount >= 5) {
      unlockPoem();
    }
  };

  // Track active paint color for Fine Arts studio
  const [paintColor, setPaintColor] = useState(FA_PALETTE[0]);

  // Cycle color on mouse clicks or manual palette selections
  const cyclePaintColor = () => {
    setPaintColor(prev => {
      const idx = FA_PALETTE.indexOf(prev);
      return FA_PALETTE[(idx + 1) % FA_PALETTE.length];
    });
  };

  // Hide the global cursor when a department custom mode is active
  useEffect(() => {
    const shouldHide =
      (id === 'la' && isInkActive) ||
      (id === 'wpa' && isStageActive) ||
      (id === 'fa' && isPaintActive) ||
      (id === 'ipa' && isIpaActive) ||
      (id === 'etcw' && isEtcwActive);

    if (shouldHide) {
      document.body.classList.add('hide-global-cursor');
    } else {
      document.body.classList.remove('hide-global-cursor');
    }
    return () => {
      document.body.classList.remove('hide-global-cursor');
    };
  }, [id, isInkActive, isStageActive, isPaintActive, isIpaActive, isEtcwActive]);

  useEffect(() => {
    playTransition();
  }, [playTransition]);

  const departmentEvents = eventsData[year]?.[id] || [];

  // Determine active bg/text styles
  let wrapperClass = 'bg-[var(--color-bg-main)] text-[var(--color-text-main)]';
  if (id === 'la' && isInkActive) {
    wrapperClass = 'bg-[#F8F9FA] text-[#0f172a] cursor-none'; // Notebook white
  } else if (id === 'wpa' && isStageActive) {
    wrapperClass = 'bg-[#06040a] text-slate-100 cursor-none';
  } else if (id === 'fa' && isPaintActive) {
    wrapperClass = 'bg-[#F3EFE3] text-[#332E24] cursor-none'; // Textured studio cream background
  } else if (id === 'ipa' && isIpaActive) {
    wrapperClass = 'bg-[#1C0D02] text-amber-100 cursor-none'; // Saffron terracotta courtyard background
  } else if (id === 'etcw' && isEtcwActive) {
    wrapperClass = 'bg-[#1a0505] text-rose-100 cursor-none'; // Deep crimson theatre background
  }

  return (
    <motion.div
      layoutId={`dept-${id}`}
      exit={{ opacity: 0, y: 50, scale: 0.95, transition: { duration: 0.4, ease: 'easeOut' } }}
      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
      className={`fixed inset-0 z-[200] overflow-y-auto transition-colors duration-1000 select-none ${wrapperClass}`}
      data-lenis-prevent="true"
      onClick={id === 'fa' && isPaintActive ? cyclePaintColor : undefined}
    >
      {/* 1. Literary Arts Elements */}
      {id === 'la' && (
        <>
          <QuillCursor isInkActive={isInkActive} />
          <LiquidInkBackground isInkActive={isInkActive} />
        </>
      )}

      {/* 2. World Performing Arts Elements */}
      {id === 'wpa' && (
        <>
          <StageCursor isStageActive={isStageActive} />
          <StageLightsBackground isStageActive={isStageActive} />
        </>
      )}

      {/* 3. Fine Arts Elements */}
      {id === 'fa' && (
        <>
          <PaintbrushCursor isPaintActive={isPaintActive} activeColor={paintColor} />
          <FineArtsCanvasBackground isPaintActive={isPaintActive} activeColor={paintColor} />
        </>
      )}

      {/* 4. Indian Performing Arts Elements */}
      {id === 'ipa' && (
        <>
          <SwarTaalCursor isIpaActive={isIpaActive} />
          <SwarTaalBackground isIpaActive={isIpaActive} />
        </>
      )}

      {/* 5. Events, Theatricals, Contests & Workshops Elements */}
      {id === 'etcw' && (
        <>
          <EtcwCursor isEtcwActive={isEtcwActive} />
          <EtcwBackground isEtcwActive={isEtcwActive} />
        </>
      )}

      {/* Background neon glows for standard/default mode */}
      {!(id === 'la' && isInkActive) &&
        !(id === 'wpa' && isStageActive) &&
        !(id === 'fa' && isPaintActive) &&
        !(id === 'ipa' && isIpaActive) &&
        !(id === 'etcw' && isEtcwActive) && (
          <>
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[var(--color-accent-primary)]/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-accent-secondary)]/10 rounded-full blur-[120px] pointer-events-none" />
          </>
        )}

      {/* Textured overlay for studio paper / terracotta floor */}
      {((id === 'fa' && isPaintActive) || (id === 'ipa' && isIpaActive)) && (
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#2b2315_1px,transparent_1px)] bg-[size:10px_10px] mix-blend-multiply" />
      )}

      {/* Ruled notebook overlay for Literary Arts */}
      {id === 'la' && isInkActive && (
        <>
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                'repeating-linear-gradient(transparent, transparent 27px, #3b82f6 28px)',
              backgroundSize: '100% 28px',
            }}
          />
          {/* Vertical red margin line */}
          <div className="absolute top-0 bottom-0 left-8 md:left-24 w-[2px] bg-red-400/40 pointer-events-none" />
          
          {/* Secret LA Stamp */}
          <div 
            onClick={handleStampClick}
            className="absolute top-32 right-12 md:right-32 w-24 h-24 border-4 border-blue-900/20 rounded-full flex items-center justify-center rotate-[-15deg] opacity-60 hover:opacity-100 transition-opacity cursor-pointer z-50 mix-blend-multiply"
          >
            <div className="w-20 h-20 border-2 border-blue-900/30 rounded-full flex flex-col items-center justify-center font-['Courier_New'] font-bold text-blue-900/60 uppercase text-[10px] tracking-widest text-center">
              <span>Ref. LA</span>
              <span className="text-xs">Est. 1979</span>
            </div>
          </div>

          {/* Poem Overlay */}
          <AnimatePresence>
            {poemUnlocked && (
              <motion.div 
                initial={{ opacity: 0, clipPath: 'circle(0% at 90% 20%)' }}
                animate={{ opacity: 1, clipPath: 'circle(150% at 90% 20%)' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="fixed inset-0 z-[300] bg-blue-950 flex items-center justify-center p-8 overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-blue-950 to-[#020617] pointer-events-none" />
                
                <button
                  onClick={closePoem}
                  onMouseEnter={playHover}
                  className="absolute top-8 right-8 z-50 p-4 rounded-full bg-blue-900/20 border border-blue-400/20 text-blue-300 hover:bg-blue-800/40 hover:text-white hover:scale-110 transition-all duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 1.5 }}
                  className="max-w-2xl text-center relative z-10"
                >
                  <h2 className="text-blue-200 font-['Kaushan_Script'] text-5xl md:text-7xl mb-12 leading-relaxed">
                    "In oceans of ink,<br/>the soul doth sink,<br/>A multiverse unfolds,<br/>in the stories we link."
                  </h2>
                  <p className="text-blue-400/60 font-serif tracking-[0.3em] uppercase text-sm">
                    — The Scribe of Malhar
                  </p>
                </motion.div>
                
                {/* Floating Ink particles */}
                {Array.from({ length: 30 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-blue-500/20 mix-blend-screen blur-[2px]"
                    style={{
                      width: Math.random() * 8 + 2 + 'px',
                      height: Math.random() * 8 + 2 + 'px',
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + '%',
                    }}
                    animate={{
                      y: [0, -100, 0],
                      x: [0, Math.random() * 40 - 20, 0],
                      opacity: [0.1, 0.5, 0.1],
                    }}
                    transition={{
                      duration: Math.random() * 5 + 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Back Button */}
      <div className="fixed top-8 left-8 z-50">
        <button
          onClick={onBack}
          onMouseEnter={playHover}
          className={`flex items-center gap-3 px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-widest transition-all duration-500 shadow-2xl hover:scale-105 no-cursor-scale ${
            (id === 'la' && isInkActive) || (id === 'fa' && isPaintActive)
              ? 'bg-white border-gray-200 text-slate-800 hover:bg-gray-50'
              : 'bg-[var(--color-bg-secondary)]/80 border-[var(--color-border-main)]/50 text-[var(--color-text-main)] hover:border-[var(--color-accent-primary)]/50'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Campus</span>
        </button>
      </div>

      {/* Toggle Buttons */}
      <div className="fixed top-8 right-8 z-50 flex gap-4">
        {id === 'fa' && isPaintActive && (
          <div className="flex items-center gap-1.5 bg-[#FCFAF5] border border-[#DDD5C3] p-1.5 rounded-full shadow-md pointer-events-auto">
            {FA_PALETTE.map(color => (
              <button
                key={color}
                onClick={e => {
                  e.stopPropagation();
                  setPaintColor(color);
                }}
                className={`w-6 h-6 rounded-full transition-transform duration-300 hover:scale-110 ${paintColor === color ? 'scale-110 border-2 border-[#332E24]' : ''}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        {id === 'la' && (
          <button
            onClick={() => {
              setIsInkActive(!isInkActive);
              playTransition();
            }}
            onMouseEnter={playHover}
            className="flex items-center gap-3 px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-widest transition-all duration-500 shadow-2xl hover:scale-105 no-cursor-scale bg-[#0f172a] border-[#0f172a] text-[#F8F9FA] shadow-slate-900/30 hover:bg-[#1e293b]"
          >
            <Feather
              className={`w-4 h-4 ${isInkActive ? 'animate-bounce text-blue-400' : 'text-[var(--color-accent-primary)]'}`}
            />
            <span>{isInkActive ? 'CLOSE NOTEBOOK' : 'OPEN NOTEBOOK'}</span>
          </button>
        )}

        {id === 'wpa' && (
          <button
            onClick={() => {
              setIsStageActive(!isStageActive);
              playTransition();
            }}
            onMouseEnter={playHover}
            className={`flex items-center gap-3 px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-widest transition-all duration-500 shadow-2xl hover:scale-105 no-cursor-scale ${
              isStageActive
                ? 'bg-amber-500 border-amber-500 text-black shadow-amber-500/20 hover:bg-amber-400'
                : 'bg-[var(--color-bg-secondary)]/80 border-[var(--color-border-main)]/50 text-[var(--color-text-main)] hover:border-amber-400/50'
            }`}
          >
            <Theater
              className={`w-4 h-4 ${isStageActive ? 'animate-pulse text-black' : 'text-amber-400'}`}
            />
            <span>{isStageActive ? 'DIM THE LIGHTS' : 'LIGHT UP THE STAGE'}</span>
          </button>
        )}

        {id === 'fa' && (
          <button
            onClick={e => {
              e.stopPropagation();
              setIsPaintActive(!isPaintActive);
              playTransition();
            }}
            onMouseEnter={playHover}
            className={`flex items-center gap-3 px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-widest transition-all duration-500 shadow-2xl hover:scale-105 no-cursor-scale ${
              isPaintActive
                ? 'bg-[#8E806A] border-[#8E806A] text-[#FCFAF5] shadow-[#8E806A]/20 hover:bg-[#726654]'
                : 'bg-[var(--color-bg-secondary)]/80 border-[var(--color-border-main)]/50 text-[var(--color-text-main)] hover:border-[#8E806A]/50'
            }`}
          >
            <Palette
              className={`w-4 h-4 ${isPaintActive ? 'animate-pulse text-[#FCFAF5]' : 'text-[#8E806A]'}`}
            />
            <span>{isPaintActive ? 'CLEAN THE PALETTE' : 'PICK UP THE BRUSH'}</span>
          </button>
        )}

        {id === 'ipa' && (
          <button
            onClick={() => {
              setIsIpaActive(!isIpaActive);
              playTransition();
            }}
            onMouseEnter={playHover}
            className={`flex items-center gap-3 px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-widest transition-all duration-500 shadow-2xl hover:scale-105 no-cursor-scale ${
              isIpaActive
                ? 'bg-amber-500 border-amber-500 text-black shadow-amber-500/20 hover:bg-amber-400'
                : 'bg-[var(--color-bg-secondary)]/80 border-[var(--color-border-main)]/50 text-[var(--color-text-main)] hover:border-amber-400/50'
            }`}
          >
            <Music
              className={`w-4 h-4 ${isIpaActive ? 'animate-pulse text-black' : 'text-amber-400'}`}
            />
            <span>{isIpaActive ? 'MUTE INSTRUMENTS' : 'PLUCK VEENA STRINGS'}</span>
          </button>
        )}

        {id === 'etcw' && (
          <button
            onClick={() => {
              setIsEtcwActive(!isEtcwActive);
              playTransition();
            }}
            onMouseEnter={playHover}
            className={`flex items-center gap-3 px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-widest transition-all duration-500 shadow-2xl hover:scale-105 no-cursor-scale ${
              isEtcwActive
                ? 'bg-rose-600 border-rose-600 text-white shadow-rose-600/30 hover:bg-rose-500'
                : 'bg-[var(--color-bg-secondary)]/80 border-[var(--color-border-main)]/50 text-[var(--color-text-main)] hover:border-rose-400/50'
            }`}
          >
            <Theater
              className={`w-4 h-4 ${isEtcwActive ? 'animate-pulse text-white' : 'text-rose-400'}`}
            />
            <span>{isEtcwActive ? 'DROP CURTAINS' : 'RAISE CURTAINS'}</span>
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-20">
        {/* Back Button */}
        <button
          onClick={onBack}
          onMouseEnter={playHover}
          className={`group flex items-center gap-4 transition-colors mb-16 no-cursor-scale pointer-events-auto ${
            id === 'la' && isInkActive
              ? 'text-[#0f172a] hover:text-blue-600'
              : id === 'wpa' && isStageActive
                ? 'text-amber-400 hover:text-amber-300'
                : id === 'fa' && isPaintActive
                  ? 'text-[#8E806A] hover:text-[#726654]'
                  : id === 'ipa' && isIpaActive
                    ? 'text-amber-400 hover:text-amber-300'
                    : id === 'etcw' && isEtcwActive
                      ? 'text-rose-400 hover:text-rose-300'
                      : 'text-[var(--color-text-main)] hover:text-[var(--color-accent-primary)]'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
              id === 'la' && isInkActive
                ? 'border-blue-200 bg-white group-hover:bg-blue-50 group-hover:scale-110'
                : id === 'wpa' && isStageActive
                  ? 'border-violet-500/30 bg-slate-950/60 group-hover:border-amber-400/50 group-hover:scale-110'
                  : id === 'fa' && isPaintActive
                    ? 'border-[#DDD5C3] bg-[#FCFAF5] group-hover:bg-[#8E806A]/10 group-hover:scale-110'
                    : id === 'ipa' && isIpaActive
                      ? 'border-[#B45309]/30 bg-[#2C1910]/60 group-hover:border-amber-400/50 group-hover:scale-110'
                      : id === 'etcw' && isEtcwActive
                        ? 'border-rose-600/30 bg-[#2b0808]/60 group-hover:border-rose-400/50 group-hover:scale-110'
                        : 'border-[var(--color-border-main)]/30 bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm group-hover:border-[var(--color-accent-primary)] group-hover:scale-110'
            }`}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="font-['Inter'] tracking-widest uppercase text-xs font-bold">
            Back to Home
          </span>
        </button>

        {/* Title Header Block */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b pb-8 transition-colors duration-500 ${
            id === 'la' && isInkActive
              ? 'border-blue-200'
              : id === 'wpa' && isStageActive
                ? 'border-violet-500/20'
                : id === 'fa' && isPaintActive
                  ? 'border-[#DDD5C3]'
                  : id === 'ipa' && isIpaActive
                    ? 'border-[#B45309]/30'
                    : id === 'etcw' && isEtcwActive
                      ? 'border-rose-600/30'
                      : 'border-[var(--color-border-main)]/20'
          }`}
        >
          <div>
            <div
              className={`flex items-center gap-3 uppercase tracking-[0.25em] text-xs font-bold mb-3 ${
                id === 'la' && isInkActive
                  ? 'text-blue-700 font-["Inter"]'
                  : id === 'wpa' && isStageActive
                    ? 'text-amber-400 font-["Boldonse"]'
                    : id === 'fa' && isPaintActive
                      ? 'text-[#8E806A] font-["Boldonse"]'
                      : id === 'ipa' && isIpaActive
                        ? 'text-amber-500 font-["Boldonse"]'
                        : id === 'etcw' && isEtcwActive
                          ? 'text-rose-500 font-["Boldonse"]'
                          : 'text-[var(--color-accent-secondary)] font-["Inter"]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>
                Malhar {year} &bull;{' '}
                {id === 'la' && isInkActive
                  ? 'Notebook Mode'
                  : id === 'wpa' && isStageActive
                    ? 'Live Stage Mode'
                    : id === 'fa' && isPaintActive
                      ? 'Canvas Studio Mode'
                      : id === 'ipa' && isIpaActive
                        ? 'Swar & Taal Mode'
                        : id === 'etcw' && isEtcwActive
                          ? 'Theatrical Applause Mode'
                          : 'Departmental Events'}
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-5xl md:text-8xl leading-none transition-all duration-750 ${
                id === 'la' && isInkActive
                  ? "font-['Kaushan_Script'] text-[#1e3a8a]"
                  : id === 'wpa' && isStageActive
                    ? "font-['Boldonse'] text-amber-400 uppercase tracking-wide"
                    : id === 'fa' && isPaintActive
                      ? "font-['Boldonse'] text-[#8E806A uppercase tracking-wide"
                      : id === 'ipa' && isIpaActive
                        ? "font-['Boldonse'] text-amber-500 uppercase tracking-wide"
                        : id === 'etcw' && isEtcwActive
                          ? "font-['Boldonse'] text-rose-500 uppercase tracking-wide"
                          : "font-['Britannic_Bold'] text-[var(--color-accent-primary)] uppercase tracking-[0.05em]"
              }`}
            >
              {name}
            </motion.h1>
          </div>

          <div
            className={`text-sm max-w-sm transition-all duration-500 ${
              id === 'la' && isInkActive
                ? "font-['Inter'] text-slate-600"
                : id === 'wpa' && isStageActive
                  ? "font-['Inter'] text-slate-400"
                  : id === 'fa' && isPaintActive
                    ? "font-['Inter'] text-[#554E41]"
                    : id === 'ipa' && isIpaActive
                      ? "font-['Inter'] text-amber-200/60"
                      : id === 'etcw' && isEtcwActive
                        ? "font-['Inter'] text-rose-200/60"
                        : "font-['Inter'] text-[var(--color-text-main)]/50"
            }`}
          >
            {id === 'la' && isInkActive
              ? 'Move your quill cursor across the parchment to draw. Click anywhere to splatter fresh wet ink.'
              : id === 'wpa' && isStageActive
                ? 'Move your spotlight wand across the dark stage to trace light trail particles. Click to trigger live chime flashes.'
                : id === 'fa' && isPaintActive
                  ? 'Drag your brush across the canvas to paint. Click to splatter droplets that drip down. Use the color palette at the top right to switch colors.'
                  : id === 'ipa' && isIpaActive
                    ? 'Hover over the horizontal sitar & veena strings to vibrate them. Click anywhere to trigger a concentric rhythm (Taal) pulse.'
                    : id === 'etcw' && isEtcwActive
                      ? 'Move the tragedy/comedy masks across the deep theater rows. Click to shower applause and confetti.'
                      : 'Discover the creative battles, expressions, and highlights designed to push limits and inspire passion.'}
          </div>
        </div>

        {/* Grid / Layout Section */}
        {departmentEvents.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div
                className={`p-8 rounded-[32px] border backdrop-blur-md transition-all duration-700 shadow-2xl ${
                  id === 'la' && isInkActive
                    ? 'bg-white border-blue-200 text-slate-700'
                    : id === 'wpa' && isStageActive
                      ? 'bg-slate-950/30 border-violet-500/20 text-slate-300'
                      : id === 'fa' && isPaintActive
                        ? 'bg-[#FCFAF5] border-[#DDD5C3] text-[#332E24]'
                        : id === 'ipa' && isIpaActive
                          ? 'bg-[#2C1910]/40 border-[#B45309]/30 text-amber-200/90'
                          : id === 'etcw' && isEtcwActive
                            ? 'bg-[#2b0808]/60 border-rose-600/30 text-rose-200/90'
                            : 'bg-[var(--color-bg-secondary)]/30 border-[var(--color-border-main)]/20'
                }`}
              >
                {id === 'wpa' ? (
                  <Theater
                    className={`w-8 h-8 mb-6 ${isStageActive ? 'text-amber-400' : 'text-[var(--color-accent-secondary)]'}`}
                  />
                ) : id === 'fa' ? (
                  <Palette
                    className={`w-8 h-8 mb-6 ${isPaintActive ? 'text-[#8E806A]' : 'text-[var(--color-accent-secondary)]'}`}
                  />
                ) : id === 'ipa' ? (
                  <Music
                    className={`w-8 h-8 mb-6 ${isIpaActive ? 'text-amber-400' : 'text-[var(--color-accent-secondary)]'}`}
                  />
                ) : id === 'etcw' ? (
                  <Theater
                    className={`w-8 h-8 mb-6 ${isEtcwActive ? 'text-rose-500' : 'text-[var(--color-accent-secondary)]'}`}
                  />
                ) : (
                  <BookOpen
                    className={`w-8 h-8 mb-6 ${isInkActive ? 'text-blue-700' : 'text-[var(--color-accent-secondary)]'}`}
                  />
                )}

                <h3
                  className={`text-xl font-bold uppercase tracking-wider mb-4 ${
                    id === 'la' && isInkActive
                      ? "font-['Kaushan_Script'] text-blue-800"
                      : id === 'wpa' && isStageActive
                        ? "font-['Boldonse'] text-amber-400"
                        : id === 'fa' && isPaintActive
                          ? "font-['Boldonse'] text-[#8E806A]"
                          : id === 'ipa' && isIpaActive
                            ? "font-['Boldonse'] text-amber-500"
                            : id === 'etcw' && isEtcwActive
                              ? "font-['Boldonse'] text-rose-500"
                              : "font-['Boldonse']"
                  }`}
                >
                  Department Info
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-6 ${id === 'la' && isInkActive ? "font-['Inter']" : "font-['Inter']"}`}
                >
                  Welcome to {name}. Here we showcase some of the finest showdowns, original works,
                  and live improvisations of the festival.
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
                    isStageActive={isStageActive}
                    isPaintActive={isPaintActive}
                    isIpaActive={isIpaActive}
                    isEtcwActive={isEtcwActive}
                    deptId={id}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[400px] rounded-3xl bg-[var(--color-bg-secondary)]/30 border border-[var(--color-border-main)]/20 backdrop-blur-md flex items-center justify-center">
            <span className="text-[var(--color-text-main)]/30 font-['Boldonse'] text-3xl uppercase tracking-widest text-center px-8">
              Coming Soon
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
