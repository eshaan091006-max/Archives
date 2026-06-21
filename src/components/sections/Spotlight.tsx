import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import Matter from 'matter-js';

export const Spotlight = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const mouseBodyRef = useRef<Matter.Body | null>(null);
  
  const [bodiesData, setBodiesData] = useState<Array<{ id: number, type: 'shard' | 'dust', size: number, x: number, y: number, color: string }>>([]);
  const domRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const springX = useSpring(x, { stiffness: 400, damping: 25 });
  const springY = useSpring(y, { stiffness: 400, damping: 25 });

  useEffect(() => {
    if (!containerRef.current) return;
    if (engineRef.current) return; // Prevent strict mode double init

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0, scale: 0 } // Zero gravity void
    });
    engineRef.current = engine;

    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight;
    
    // Walls
    const wallOptions = { isStatic: true };
    Matter.World.add(engine.world, [
      Matter.Bodies.rectangle(w/2, -50, w, 100, wallOptions),
      Matter.Bodies.rectangle(w/2, h+50, w, 100, wallOptions),
      Matter.Bodies.rectangle(-50, h/2, 100, h, wallOptions),
      Matter.Bodies.rectangle(w+50, h/2, 100, h, wallOptions),
    ]);

    const bodies: Matter.Body[] = [];
    const initData: any[] = [];
    
    // Theme colors as classes
    const shardColors = ['bg-[var(--color-accent-primary)]', 'bg-[var(--color-accent-secondary)]', 'bg-[var(--color-text-highlight)]'];
    const dustColors = ['bg-[var(--color-text-main)]', 'bg-[var(--color-border-main)]'];

    // Spawn 3D "Shards"
    for(let i=0; i<40; i++) {
      const size = Math.random() * 50 + 30;
      const body = Matter.Bodies.rectangle(
        Math.random() * w,
        Math.random() * h,
        size, size,
        { restitution: 1.2, frictionAir: 0.02 }
      );
      bodies.push(body);
      initData.push({ id: body.id, type: 'shard', size, x: body.position.x, y: body.position.y, color: shardColors[Math.floor(Math.random() * shardColors.length)] });
    }

    // Spawn dust particles
    for(let i=0; i<60; i++) {
       const size = Math.random() * 8 + 3;
       const body = Matter.Bodies.circle(
          Math.random() * w, Math.random() * h, size,
          { restitution: 0.9, frictionAir: 0.05 }
       );
       bodies.push(body);
       initData.push({ id: body.id, type: 'dust', size, x: body.position.x, y: body.position.y, color: dustColors[Math.floor(Math.random() * dustColors.length)] });
    }

    setBodiesData(initData);
    Matter.World.add(engine.world, bodies);

    // Invisible mouse repeller
    const mouseBody = Matter.Bodies.circle(-1000, -1000, 150, { isStatic: true });
    mouseBodyRef.current = mouseBody;
    Matter.World.add(engine.world, mouseBody);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // DOM Update Loop to map physics to 3D CSS
    Matter.Events.on(engine, 'afterUpdate', () => {
      bodies.forEach((body) => {
        const el = domRefs.current[body.id];
        if (el) {
          const speed = Math.sqrt(body.velocity.x**2 + body.velocity.y**2);
          const currentTumble = parseFloat(el.dataset.tumble || '0') + speed * 2;
          el.dataset.tumble = currentTumble.toString();

          // Apply 2D translation and rotation from physics, and fake 3D tumble from velocity!
          el.style.transform = `translate(-50%, -50%) translate(${body.position.x}px, ${body.position.y}px) rotate(${body.angle}rad) rotateX(${currentTumble}deg) rotateY(${currentTumble * 0.7}deg)`;
        }
      });
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      
      x.set(mx);
      y.set(my);
      
      if (mouseBodyRef.current) {
        Matter.Body.setPosition(mouseBodyRef.current, { x: mx, y: my });
        
        // Crazy magnetic repulsion effect
        bodies.forEach(b => {
           const dx = b.position.x - mx;
           const dy = b.position.y - my;
           const dist = Math.sqrt(dx*dx + dy*dy);
           if(dist < 300) {
              const forceMagnitude = (300 - dist) * 0.0003 * b.mass;
              Matter.Body.applyForce(b, b.position, {
                 x: (dx / dist) * forceMagnitude,
                 y: (dy / dist) * forceMagnitude
              });
           }
        });
      }
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      engineRef.current = null;
    };
  }, [x, y]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[90vh] bg-[#030303] overflow-hidden flex items-center justify-center cursor-none no-cursor-scale border-y border-[var(--color-border-main)]/30"
      style={{ perspective: '1000px' }}
    >
      {/* 3D Physics DOM Elements - Hidden in the dark! */}
      <div className="absolute inset-0 z-0 pointer-events-none transform-style-preserve-3d">
        {bodiesData.map((data) => (
          <div
            key={data.id}
            ref={(el) => (domRefs.current[data.id] = el)}
            className={`absolute top-0 left-0 ${data.color} shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-colors duration-500`}
            style={{
              width: data.size,
              height: data.size,
              borderRadius: data.type === 'dust' ? '50%' : '15%',
              // Shards get a glass/3D look
              border: data.type === 'shard' ? '2px solid rgba(255,255,255,0.3)' : 'none',
              background: data.type === 'shard' ? undefined : undefined,
              // Initial position before physics kicks in
              transform: `translate(-50%, -50%) translate(${data.x}px, ${data.y}px)`,
              transformStyle: 'preserve-3d',
              opacity: data.type === 'dust' ? 0.6 : 0.9,
              clipPath: data.type === 'shard' ? 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' : undefined
            }}
          >
             {/* Fake 3D depth layer for shards */}
             {data.type === 'shard' && (
                <div className="absolute inset-0 border border-white/20 rounded-[15%] bg-gradient-to-br from-white/20 to-transparent transform translate-z-[10px]" />
             )}
          </div>
        ))}
      </div>

      {/* Creepy Glitch Text */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-0 pointer-events-none mix-blend-exclusion transform-style-preserve-3d"
        style={{ transform: 'translateZ(50px)' }}
      >
        <motion.h2 
          animate={{ 
            textShadow: [
              "0px 0px 0px transparent", 
              "10px 0px 30px #FF0033", 
              "-10px 5px 30px #00FFFF", 
              "0px 0px 0px transparent",
              "0px 0px 0px transparent"
            ],
            x: [0, -15, 10, -5, 12, 0, 0, 0],
            y: [0, 5, -8, 15, -5, 0, 0, 0],
            skewX: [0, 15, -15, 8, -2, 0, 0, 0],
            filter: [
              "hue-rotate(0deg)", 
              "hue-rotate(90deg) brightness(1.5)", 
              "hue-rotate(-90deg) invert(1)", 
              "hue-rotate(0deg)",
              "hue-rotate(0deg)"
            ]
          }}
          transition={{ 
            duration: 0.4, 
            repeat: Infinity, 
            repeatDelay: 2, // Pause for 2 seconds, then violently glitch for 0.4s
            ease: "easeInOut" 
          }}
          className="text-6xl md:text-[180px] leading-none font-['Boldonse'] text-white uppercase tracking-tighter mb-6"
        >
          DO NOT LOOK
        </motion.h2>
      </div>

      {/* The Mask Layer - Appears as a normal boring section until you hover! */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 bg-[var(--color-bg-main)] transition-colors duration-1000"
        style={{
          WebkitMaskImage: useMotionTemplate`radial-gradient(circle 250px at ${springX}px ${springY}px, transparent 0%, black 100%)`,
          maskImage: useMotionTemplate`radial-gradient(circle 250px at ${springX}px ${springY}px, transparent 0%, black 100%)`,
        }}
      >
         {/* Fake boring UI */}
         <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 opacity-30 bg-[var(--color-bg-secondary)]/20">
           <h2 className="text-sm font-['Inter'] font-bold tracking-[0.5em] uppercase mb-4 text-[var(--color-text-main)]">System Notification</h2>
           <p className="max-w-md font-['Inter'] text-xs text-[var(--color-text-main)]/50 tracking-widest leading-loose">
             This sector has been quarantined. Awaiting administrative override. 
             <br/><br/>
             Please proceed to the next module.
           </p>
         </div>
      </motion.div>
    </section>
  );
};
