import React, { useRef, useState, useCallback } from 'react';

interface DialProps {
  value: number;
  onChange: (newValue: number) => void;
  isCorrect?: boolean;
  label?: string;
}

/**
 * Combination lock dial.
 * The indicator notch is fixed at the TOP of the SVG.
 * Numbers are painted at fixed positions around the ring, and the ring ROTATES so the
 * currently-selected number always sits under the notch at the top.
 */
export const Dial: React.FC<DialProps> = ({ value, onChange, isCorrect = false, label }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const isDragging = useRef(false);
  const lastAngle = useRef<number | null>(null);
  const accumDelta = useRef(0);
  const [dialRotation, setDialRotation] = useState(0); // visual rotation in degrees

  const SIZE = 130;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const RING_R = 46; // radius where tick labels sit
  const BEZEL_R = 54;
  const BODY_R = 50;

  // Each number i sits at angle = i * 36° on the unrotated ring.
  // To put `value` at the top (–90°), we rotate the whole ring by: -(value * 36) - 90 — but
  // since we track continuous visual rotation we compute the target mod-snapped angle.
  // Instead we let the drag continuously drive dialRotation and derive value from it.

  const getAngle = (e: PointerEvent, rect: DOMRect) => {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
  };

  const onPointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    isDragging.current = true;
    accumDelta.current = 0;
    const rect = svgRef.current!.getBoundingClientRect();
    lastAngle.current = getAngle(e.nativeEvent as unknown as PointerEvent, rect);
    svgRef.current!.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging.current || lastAngle.current === null) return;
    const rect = svgRef.current!.getBoundingClientRect();
    const angle = getAngle(e.nativeEvent as unknown as PointerEvent, rect);
    let delta = angle - lastAngle.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    lastAngle.current = angle;
    accumDelta.current += delta;
    setDialRotation(r => r + delta);
    // Each full step = 36°; dragging CW increases value
    const steps = Math.floor(Math.abs(accumDelta.current) / 36) * Math.sign(accumDelta.current);
    if (Math.abs(steps) >= 1) {
      accumDelta.current -= steps * 36;
      onChange(((value - steps) % 10 + 10) % 10);
    }
  }, [value, onChange]);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
    lastAngle.current = null;
    // Snap dial rotation so the current value is exactly at top
    setDialRotation(-(value * 36));
  }, [value]);

  // Build the ring items: number i is at angular position (i * 36°) on the ring
  // The ring is rotated by dialRotation, so the indicator at top points to whoever is there.
  const tickItems = Array.from({ length: 10 }, (_, i) => {
    // angle of this number on the ring (before rotation)
    const angleDeg = i * 36 - 90; // -90 so 0 starts at top initially
    const rad = (angleDeg * Math.PI) / 180;
    const tx = CX + Math.cos(rad) * RING_R;
    const ty = CY + Math.sin(rad) * RING_R;
    const tickOuter = CX + Math.cos(rad) * (BODY_R - 2);
    const tickInner = CX + Math.cos(rad) * (BODY_R - 10);
    const tickOuterY = CY + Math.sin(rad) * (BODY_R - 2);
    const tickInnerY = CY + Math.sin(rad) * (BODY_R - 10);
    return { i, tx, ty, tickOuter, tickInner, tickOuterY, tickInnerY };
  });

  return (
    <div className="flex flex-col items-center gap-2 select-none" style={{ userSelect: 'none' }}>
      <svg
        ref={svgRef}
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ cursor: isDragging.current ? 'grabbing' : 'grab', touchAction: 'none', overflow: 'visible' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <defs>
          <radialGradient id={`bezGrad-${label}`} cx="40%" cy="30%">
            <stop offset="0%" stopColor="#52525b" />
            <stop offset="55%" stopColor="#27272a" />
            <stop offset="100%" stopColor="#09090b" />
          </radialGradient>
          <radialGradient id={`dialGrad-${label}`} cx="38%" cy="32%">
            <stop offset="0%" stopColor="#3f3f46" />
            <stop offset="100%" stopColor="#09090b" />
          </radialGradient>
          <radialGradient id={`capGrad-${label}`} cx="30%" cy="30%">
            <stop offset="0%" stopColor="#71717a" />
            <stop offset="100%" stopColor="#18181b" />
          </radialGradient>
          <filter id={`glow-${label}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── Outer bezel ── */}
        <circle cx={CX} cy={CY} r={BEZEL_R + 6} fill={`url(#bezGrad-${label})`} />
        <circle cx={CX} cy={CY} r={BEZEL_R + 6} fill="none" stroke="#09090b" strokeWidth="1.5" />
        {/* Bezel highlight */}
        <circle cx={CX} cy={CY} r={BEZEL_R + 6} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* ── Rotating dial group ── */}
        <g transform={`rotate(${dialRotation}, ${CX}, ${CY})`}>
          {/* Dial face */}
          <circle cx={CX} cy={CY} r={BODY_R} fill={`url(#dialGrad-${label})`} />

          {/* Tick marks and numbers */}
          {tickItems.map(({ i, tx, ty, tickOuter, tickInner, tickOuterY, tickInnerY }) => (
            <g key={i}>
              <line
                x1={tickInner}
                y1={tickInnerY}
                x2={tickOuter}
                y2={tickOuterY}
                stroke="#52525b"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <text
                x={tx}
                y={ty}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fontFamily="'Inter', monospace"
                fontWeight="700"
                fill="#a1a1aa"
              >
                {i}
              </text>
            </g>
          ))}

          {/* Center grip */}
          <circle cx={CX} cy={CY} r={10} fill={`url(#capGrad-${label})`} />
          <circle cx={CX} cy={CY} r={4} fill="#09090b" />
          {/* Grip lines */}
          {[0, 60, 120].map(a => {
            const r = (a * Math.PI) / 180;
            return (
              <line
                key={a}
                x1={CX + Math.cos(r) * 4}
                y1={CY + Math.sin(r) * 4}
                x2={CX + Math.cos(r) * 9}
                y2={CY + Math.sin(r) * 9}
                stroke="#52525b"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            );
          })}
        </g>

        {/* ── Fixed indicator notch at TOP – always visible above the rotating dial ── */}
        {/* Notch background shadow */}
        <polygon
          points={`${CX - 6},${CY - BEZEL_R - 4} ${CX + 6},${CY - BEZEL_R - 4} ${CX},${CY - BODY_R + 6}`}
          fill={isCorrect ? '#f59e0b' : '#dc2626'}
          filter={`url(#glow-${label})`}
          opacity="0.8"
        />
        {/* Notch bright */}
        <polygon
          points={`${CX - 5},${CY - BEZEL_R - 2} ${CX + 5},${CY - BEZEL_R - 2} ${CX},${CY - BODY_R + 8}`}
          fill={isCorrect ? '#fbbf24' : '#ef4444'}
        />
      </svg>

      {/* Value readout */}
      <span
        className="font-['Inter'] text-2xl font-black tabular-nums transition-colors duration-300"
        style={{
          color: isCorrect ? '#f59e0b' : '#e4e4e7',
          textShadow: isCorrect ? '0 0 20px rgba(245,158,11,0.6)' : 'none',
        }}
      >
        {value}
      </span>
      {label && (
        <span className="font-['Inter'] text-[10px] font-semibold tracking-[0.3em] uppercase text-zinc-600">
          {label}
        </span>
      )}
    </div>
  );
};
