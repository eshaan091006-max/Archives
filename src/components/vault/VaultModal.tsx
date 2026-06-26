import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Dial } from './Dial';

/* ─────────────────────────────────────────────────────────────
   HINGE ASSEMBLY (fixed wall side + rotating door side)
───────────────────────────────────────────────────────────── */
const HINGE_YS = [-0.82, 0, 0.82] as const;
const R_DOOR = 1.7;

const WallHinges: React.FC = () => (
  <group>
    {HINGE_YS.map((y, i) => (
      <group key={i} position={[-R_DOOR, y, 0]}>
        {/* Wall bracket plate */}
        <mesh position={[-0.08, 0, 0]}>
          <boxGeometry args={[0.18, 0.18, 0.32]} />
          <meshStandardMaterial color="#27272a" metalness={0.95} roughness={0.12} />
        </mesh>
        {/* Bracket face detail */}
        <mesh position={[-0.02, 0, 0.17]}>
          <boxGeometry args={[0.06, 0.14, 0.02]} />
          <meshStandardMaterial color="#525252" metalness={1} roughness={0.04} />
        </mesh>
        {/* Fixed lower knuckle */}
        <mesh>
          <cylinderGeometry args={[0.062, 0.062, 0.1, 20]} />
          <meshStandardMaterial color="#3f3f46" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Hinge pin (chrome) — long vertical pin through all knuckles */}
        {i === 1 && (
          <mesh>
            <cylinderGeometry args={[0.022, 0.022, 2.1, 12]} />
            <meshStandardMaterial color="#a1a1aa" metalness={1} roughness={0.03} envMapIntensity={3} />
          </mesh>
        )}
      </group>
    ))}
  </group>
);

/* ─────────────────────────────────────────────────────────────
   CIRCULAR VAULT DOOR
───────────────────────────────────────────────────────────── */
const VaultDoor3D: React.FC<{ open: boolean; unlocked: boolean }> = ({ open, unlocked }) => {
  const R = R_DOOR;
  const D = 0.28;

  const accent   = unlocked ? '#f59e0b' : '#60a5fa';
  const emissive = unlocked ? '#78350f' : '#1e3a5f';
  const glow     = unlocked ? 2.2 : 0.7;

  // Heavy vault door: high mass, moderate friction → slow start, slight overshoot, settle
  const { rotY } = useSpring({
    rotY: open ? -Math.PI * 0.80 : 0,
    config: { mass: 16, tension: 26, friction: 18 },
  });

  return (
    <animated.group rotation-y={rotY} position={[-R, 0, 0]}>

      {/* ── Door-side hinge knuckles (rotate with door) ── */}
      {HINGE_YS.map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          {/* Upper knuckle */}
          <mesh position={[0, 0.065, 0]}>
            <cylinderGeometry args={[0.058, 0.058, 0.09, 20]} />
            <meshStandardMaterial color="#3f3f46" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Lower knuckle */}
          <mesh position={[0, -0.065, 0]}>
            <cylinderGeometry args={[0.058, 0.058, 0.09, 20]} />
            <meshStandardMaterial color="#3f3f46" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Door-side bracket arm */}
          <mesh position={[0.1, 0, 0]}>
            <boxGeometry args={[0.22, 0.16, D + 0.04]} />
            <meshStandardMaterial color="#27272a" metalness={0.95} roughness={0.12} />
          </mesh>
        </group>
      ))}

      {/* ── Door body (offset so left edge aligns with pivot) ── */}
      <group position={[R, 0, 0]}>

        {/* Main disc */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[R, R, D, 80]} />
          <meshStandardMaterial color="#0f0f12" metalness={0.98} roughness={0.08} envMapIntensity={3} />
        </mesh>

        {/* Front face */}
        <mesh position={[0, 0, D / 2 + 0.003]}>
          <circleGeometry args={[R - 0.01, 80]} />
          <meshStandardMaterial color="#0a0a0e" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Chrome outer rim */}
        <mesh position={[0, 0, D / 2 + 0.01]}>
          <torusGeometry args={[R + 0.028, 0.042, 20, 90]} />
          <meshStandardMaterial color="#737373" metalness={1} roughness={0.03} envMapIntensity={4} />
        </mesh>

        {/* Inner rim lip */}
        <mesh position={[0, 0, D / 2 + 0.005]}>
          <torusGeometry args={[R - 0.04, 0.016, 12, 90]} />
          <meshStandardMaterial color="#525252" metalness={1} roughness={0.05} />
        </mesh>

        {/* Glowing concentric rings */}
        {[1.32, 1.00, 0.68].map((r, i) => (
          <mesh key={i} position={[0, 0, D / 2 + 0.022 + i * 0.004]}>
            <torusGeometry args={[r, i === 0 ? 0.026 : 0.015, 20, 110]} />
            <meshStandardMaterial
              color={accent} emissive={emissive}
              emissiveIntensity={glow - i * 0.55}
              metalness={0.9} roughness={0.08}
            />
          </mesh>
        ))}

        {/* LED arc status strip */}
        <mesh position={[0, 0, D / 2 + 0.016]}>
          <torusGeometry args={[R - 0.07, 0.01, 8, 70, Math.PI * 1.72]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={unlocked ? 6 : 2.5} />
        </mesh>

        {/* 8 perimeter locking bolts */}
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const bx = Math.cos(a) * (R - 0.2);
          const by = Math.sin(a) * (R - 0.2);
          return (
            <group key={i} position={[bx, by, D / 2 + 0.018]}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.06, 0.06, 0.04, 18]} />
                <meshStandardMaterial color="#222226" metalness={0.95} roughness={0.12} />
              </mesh>
              <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.042, 0.042, 0.024, 18]} />
                <meshStandardMaterial color="#6b7280" metalness={1} roughness={0.04} envMapIntensity={2} />
              </mesh>
            </group>
          );
        })}

        {/* 8 spokes */}
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <mesh key={i}
              position={[Math.cos(a) * 0.3, Math.sin(a) * 0.3, D / 2 + 0.036]}
              rotation={[0, 0, a]}
            >
              <boxGeometry args={[0.52, 0.018, 0.018]} />
              <meshStandardMaterial color="#3f3f46" metalness={0.95} roughness={0.1} />
            </mesh>
          );
        })}

        {/* Hub ring */}
        <mesh position={[0, 0, D / 2 + 0.036]}>
          <torusGeometry args={[0.17, 0.024, 16, 40]} />
          <meshStandardMaterial color="#52525b" metalness={1} roughness={0.05} />
        </mesh>

        {/* Hub cap */}
        <mesh position={[0, 0, D / 2 + 0.048]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.105, 0.105, 0.042, 28]} />
          <meshStandardMaterial
            color={unlocked ? '#f59e0b' : '#3f3f46'}
            metalness={1} roughness={0.04}
            emissive={unlocked ? '#92400e' : '#000'} emissiveIntensity={unlocked ? 4 : 0}
          />
        </mesh>
        <mesh position={[0, 0, D / 2 + 0.072]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          <meshStandardMaterial color="#09090b" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Door edge bevels — 4 sides of the rim depth */}
        {/* Side cylinder edge (dark band around circumference) already handled by the main cylinder */}

        {/* Back face */}
        <mesh position={[0, 0, -D / 2 - 0.003]} rotation={[Math.PI, 0, 0]}>
          <circleGeometry args={[R - 0.01, 80]} />
          <meshStandardMaterial color="#060608" metalness={0.7} roughness={0.6} />
        </mesh>

      </group>
    </animated.group>
  );
};


/* ─────────────────────────────────────────────────────────────
   VAULT WALL & FRAME
───────────────────────────────────────────────────────────── */
const VaultWall: React.FC<{ unlocked: boolean }> = ({ unlocked }) => {
  const accent = unlocked ? '#f59e0b' : '#3b82f6';
  const R = 1.7;

  return (
    <group>
      {/* Wall */}
      <mesh position={[0, 0, -0.5]} receiveShadow>
        <boxGeometry args={[20, 13, 0.5]} />
        <meshStandardMaterial color="#08080a" metalness={0.1} roughness={0.92} />
      </mesh>

      {/* Circular frame ring */}
      <mesh position={[0, 0, -0.26]}>
        <torusGeometry args={[R + 0.14, 0.14, 24, 90]} />
        <meshStandardMaterial color={unlocked ? '#451a03' : '#18181b'}
          metalness={0.85} roughness={0.2}
          emissive={accent} emissiveIntensity={unlocked ? 0.35 : 0.1} />
      </mesh>

      {/* Chrome inner lip */}
      <mesh position={[0, 0, -0.15]}>
        <torusGeometry args={[R + 0.01, 0.028, 16, 90]} />
        <meshStandardMaterial color="#525252" metalness={1} roughness={0.03} />
      </mesh>

      {/* Outer decorative ring */}
      <mesh position={[0, 0, -0.32]}>
        <torusGeometry args={[R + 0.42, 0.014, 12, 90]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={unlocked ? 0.9 : 0.25} metalness={0.9} roughness={0.08} />
      </mesh>

      {/* Black cavity behind door */}
      <mesh position={[0, 0, -0.49]}>
        <circleGeometry args={[R + 0.01, 80]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.0, 0]}>
        <planeGeometry args={[20, 14]} />
        <meshStandardMaterial color="#070709" metalness={0.2} roughness={0.95} />
      </mesh>

      {/* Floor glow line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.98, 0]}>
        <planeGeometry args={[2.8, 0.04]} />
        <meshBasicMaterial color={accent} transparent opacity={0.35} />
      </mesh>
    </group>
  );
};

/* ─────────────────────────────────────────────────────────────
   FLOATING DUST (small, subtle)
───────────────────────────────────────────────────────────── */
const Dust: React.FC = () => {
  const count = 22;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D()).current;
  const data = useRef(
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 6,
      z: Math.random() * 1.5,
      vy: Math.random() * 0.001 + 0.0004,
      phase: Math.random() * Math.PI * 2,
    }))
  );

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    data.current.forEach((p, i) => {
      p.y += p.vy;
      if (p.y > 4) p.y = -4;
      dummy.position.set(
        p.x + Math.sin(clock.elapsedTime * 0.25 + p.phase) * 0.12,
        p.y,
        p.z
      );
      dummy.scale.setScalar(0.004);  // tiny — no more giant orange blob
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#c4c4cc" transparent opacity={0.2} />
    </instancedMesh>
  );
};

/* ─────────────────────────────────────────────────────────────
   CAMERA ZOOM
───────────────────────────────────────────────────────────── */
const CameraZoom: React.FC<{ zoom: boolean; onBlackout: () => void }> = ({ zoom, onBlackout }) => {
  const { camera } = useThree();
  const t = useRef(0);
  const fired = useRef(false);

  useFrame((_, delta) => {
    if (!zoom) return;
    t.current = Math.min(t.current + delta * 0.36, 1);
    const ease = t.current * t.current * (3 - 2 * t.current);
    camera.position.z = THREE.MathUtils.lerp(6.0, -3.5, ease);
    camera.position.y = THREE.MathUtils.lerp(0.3, 0.0, ease);
    (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp(40, 88, ease * ease);
    camera.updateProjectionMatrix();
    if (t.current >= 0.72 && !fired.current) {
      fired.current = true;
      onBlackout();
    }
  });
  return null;
};

/* ─────────────────────────────────────────────────────────────
   SCENE
───────────────────────────────────────────────────────────── */
const VaultScene: React.FC<{
  open: boolean; unlocked: boolean; zoom: boolean; onBlackout: () => void;
}> = ({ open, unlocked, zoom, onBlackout }) => (
  <>
    <PerspectiveCamera makeDefault position={[0, 0.3, 6.0]} fov={40} />
    <CameraZoom zoom={zoom} onBlackout={onBlackout} />

    <ambientLight intensity={0.05} color="#8ab4d4" />

    {/* Key from upper-right */}
    <directionalLight position={[5, 9, 6]} intensity={unlocked ? 2.4 : 1.6}
      color={unlocked ? '#fef3c7' : '#dbeafe'} />

    {/* Cool fill from left */}
    <directionalLight position={[-4, 2, 3]} intensity={0.22} color="#93c5fd" />

    {/* Door front glow */}
    <pointLight position={[0, 0, 2.5]} intensity={unlocked ? 4 : 1.5}
      color={unlocked ? '#f59e0b' : '#60a5fa'} distance={7} />

    {/* Floor bounce */}
    <pointLight position={[0, -2.5, 1.5]} intensity={0.8}
      color={unlocked ? '#f59e0b' : '#3b82f6'} distance={6} />

    <Dust />
    <VaultWall unlocked={unlocked} />
    <VaultDoor3D open={open} unlocked={unlocked} />

    <Environment preset="night" />
  </>
);

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
const CORRECT = [4, 2, 7];

export const VaultModal: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const [values, setValues] = useState([0, 0, 0]);
  const [unlocked, setUnlocked] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const [flash, setFlash] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);
  const [blackout, setBlackout] = useState(false);

  const handleChange = (i: number, v: number) => {
    if (unlocked) return;
    const next = [...values];
    next[i] = v;
    setValues(next);
  };

  const handleBlackout = () => {
    setBlackout(true);
    setTimeout(() => onUnlock(), 800);
  };

  useEffect(() => {
    if (!unlocked && values.every((v, i) => v === CORRECT[i])) {
      setUnlocked(true);
      setTimeout(() => setFlash(true), 150);
      setTimeout(() => setFlash(false), 900);
      setTimeout(() => setDoorOpen(true), 1000);
      setTimeout(() => setZoomIn(true), 2600);
    }
  }, [values, unlocked]);

  return (
    <AnimatePresence>
      <motion.div
        key="vault"
        className="fixed inset-0 z-[500] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 45% 38%, #0c1526 0%, #07070f 55%, #000 100%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 z-[2]"
          style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.8) 100%)' }} />

        {/* Flash */}
        <AnimatePresence>
          {flash && (
            <motion.div className="pointer-events-none fixed inset-0 z-20"
              style={{ background: 'radial-gradient(ellipse at 50% 42%, rgba(245,158,11,0.4) 0%, transparent 60%)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }} />
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          className="absolute top-7 left-0 right-0 flex flex-col items-center z-10 pointer-events-none"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: blackout ? 0 : 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-zinc-600 to-zinc-700" />
            <p className="font-['Inter'] text-[9px] tracking-[0.7em] uppercase text-zinc-500">Restricted Access</p>
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-zinc-600 to-zinc-700" />
          </div>
          <h1
            className="font-['Inter'] text-3xl md:text-5xl font-black tracking-[0.18em] uppercase"
            style={{
              background: 'linear-gradient(135deg, #f4f4f5 0%, #a1a1aa 35%, #e4e4e7 55%, #71717a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Malhar Archives
          </h1>
          <p className="font-['Inter'] text-[9px] tracking-[0.4em] uppercase text-zinc-700 mt-2">
            Vault · {new Date().getFullYear()}
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <div className="w-full z-[5]" style={{ height: '62vh' }}>
          <Canvas
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              toneMapping: THREE.CineonToneMapping,
              toneMappingExposure: 1.6,
              powerPreference: 'high-performance',
            }}
          >
            <Suspense fallback={null}>
              <VaultScene open={doorOpen} unlocked={unlocked} zoom={zoomIn} onBlackout={handleBlackout} />
            </Suspense>
          </Canvas>
        </div>

        {/* Dials */}
        <motion.div
          className="flex items-end gap-8 md:gap-12 z-10 mt-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: blackout ? 0 : 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Dial value={values[0]} onChange={v => handleChange(0, v)} isCorrect={unlocked} label="I" />
          <Dial value={values[1]} onChange={v => handleChange(1, v)} isCorrect={unlocked} label="II" />
          <Dial value={values[2]} onChange={v => handleChange(2, v)} isCorrect={unlocked} label="III" />
        </motion.div>

        {/* Status */}
        <motion.div
          className="flex items-center gap-3 mt-5 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: blackout ? 0 : 1 }}
          transition={{ delay: 1.4 }}
        >
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-zinc-800" />
          <span
            className="w-1.5 h-1.5 rounded-full transition-all duration-700"
            style={{
              background: unlocked ? '#f59e0b' : '#3b82f6',
              boxShadow: unlocked ? '0 0 12px #f59e0b' : '0 0 8px #3b82f6',
            }}
          />
          <span className="font-['Inter'] text-[9px] tracking-[0.5em] uppercase text-zinc-600">
            {unlocked ? 'Unlocking…' : 'Locked'}
          </span>
          <div className="h-px w-14 bg-gradient-to-l from-transparent to-zinc-800" />
        </motion.div>

        {/* Blackout */}
        <motion.div
          className="pointer-events-none fixed inset-0 z-[50] bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: blackout ? 1 : 0 }}
          transition={{ duration: 0.75, ease: 'easeIn' }}
        />

        {/* Scanlines */}
        <div className="pointer-events-none fixed inset-0 z-[1] opacity-25"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)' }} />
      </motion.div>
    </AnimatePresence>
  );
};
