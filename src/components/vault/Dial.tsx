import React, { useRef, useState, useCallback, useEffect } from 'react';

interface DialProps {
  value: number;
  onChange: (newValue: number) => void;
  isCorrect?: boolean;
  label?: string;
}

export const Dial: React.FC<DialProps> = ({ value, onChange, isCorrect = false, label }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const isDragging = useRef(false);
  const lastAngle = useRef<number | null>(null);
  const accumDelta = useRef(0);
  
  // Initialize dialRotation matching the initial value
  const [dialRotation, setDialRotation] = useState(-(value * 36));

  // Sync state if values change programmatically
  useEffect(() => {
    if (!isDragging.current) {
      setDialRotation(-(value * 36));
    }
  }, [value]);

  const SIZE = 135;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const RING_R = 45; // radius where tick labels sit
  const BEZEL_R = 56;
  const BODY_R = 51;

  const getAngle = (e: PointerEvent, rect: DOMRect) => {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
  };

  const onPointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (isCorrect) return; // Prevent turning after solved
    isDragging.current = true;
    accumDelta.current = 0;
    const rect = svgRef.current!.getBoundingClientRect();
    lastAngle.current = getAngle(e.nativeEvent as unknown as PointerEvent, rect);
    svgRef.current!.setPointerCapture(e.pointerId);
  }, [isCorrect]);

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
    
    // Each full step = 36°
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

  const tickItems = Array.from({ length: 10 }, (_, i) => {
    const angleDeg = i * 36 - 90; // -90 so 0 starts at top initially
    const rad = (angleDeg * Math.PI) / 180;
    const tx = CX + Math.cos(rad) * RING_R;
    const ty = CY + Math.sin(rad) * RING_R;
    const tickOuter = CX + Math.cos(rad) * (BODY_R - 2);
    const tickInner = CX + Math.cos(rad) * (BODY_R - 8);
    const tickOuterY = CY + Math.sin(rad) * (BODY_R - 2);
    const tickInnerY = CY + Math.sin(rad) * (BODY_R - 8);
    return { i, tx, ty, tickOuter, tickInner, tickOuterY, tickInnerY };
  });

  const activeColor = isCorrect ? '#f59e0b' : '#3b82f6';
  const glowFilterId = `glow-${label}`;

  return (
    <div className="flex flex-col items-center select-none" style={{ userSelect: 'none' }}>
      <svg
        ref={svgRef}
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{
          cursor: isCorrect ? 'default' : (isDragging.current ? 'grabbing' : 'grab'),
          touchAction: 'none',
          overflow: 'visible'
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <defs>
          <radialGradient id={`bezGrad-${label}`} cx="40%" cy="30%">
            <stop offset="0%" stopColor="#2e2e33" />
            <stop offset="60%" stopColor="#1a1a1c" />
            <stop offset="100%" stopColor="#08080a" />
          </radialGradient>
          <radialGradient id={`dialGrad-${label}`} cx="38%" cy="32%">
            <stop offset="0%" stopColor="#242429" />
            <stop offset="100%" stopColor="#0e0e11" />
          </radialGradient>
          <radialGradient id={`capGrad-${label}`} cx="30%" cy="30%">
            <stop offset="0%" stopColor="#52525b" />
            <stop offset="100%" stopColor="#111113" />
          </radialGradient>
          <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Shadow Ring */}
        <circle cx={CX} cy={CY} r={BEZEL_R + 6} fill="none" stroke="#000" strokeWidth="8" opacity="0.4" />

        {/* Outer Bezel (Chiseled metal) */}
        <circle cx={CX} cy={CY} r={BEZEL_R + 3} fill={`url(#bezGrad-${label})`} />
        <circle cx={CX} cy={CY} r={BEZEL_R + 3} fill="none" stroke="#09090b" strokeWidth="2.5" />
        <circle cx={CX} cy={CY} r={BEZEL_R + 3} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* Internal bezel rim ring */}
        <circle cx={CX} cy={CY} r={BODY_R + 2.5} fill="none" stroke="#050507" strokeWidth="1.5" />

        {/* ── Rotating dial group ── */}
        <g transform={`rotate(${dialRotation}, ${CX}, ${CY})`}>
          {/* Dial Face */}
          <circle cx={CX} cy={CY} r={BODY_R} fill={`url(#dialGrad-${label})`} />

          {/* Concentric detail grooves */}
          <circle cx={CX} cy={CY} r={BODY_R - 5} fill="none" stroke="#08080a" strokeWidth="0.8" opacity="0.8" />
          <circle cx={CX} cy={CY} r={BODY_R - 12} fill="none" stroke="#08080a" strokeWidth="0.5" opacity="0.6" />

          {/* Tick marks & numbers */}
          {tickItems.map(({ i, tx, ty, tickOuter, tickInner, tickOuterY, tickInnerY }) => (
            <g key={i} className="transition-opacity duration-300">
              <line
                x1={tickInner}
                y1={tickInnerY}
                x2={tickOuter}
                y2={tickOuterY}
                stroke={i === value ? activeColor : "#3f3f46"}
                strokeWidth={i === value ? "2" : "1.2"}
                strokeLinecap="round"
              />
              <text
                x={tx}
                y={ty}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fontFamily="Outfit, Inter, sans-serif"
                fontWeight={i === value ? "800" : "500"}
                fill={i === value ? activeColor : "#71717a"}
                style={{
                  filter: i === value ? `url(#${glowFilterId})` : 'none',
                  textShadow: i === value ? `0 0 8px ${activeColor}` : 'none',
                  transition: 'fill 0.2s, font-weight 0.2s'
                }}
              >
                {i}
              </text>
            </g>
          ))}
        </g>

        {/* Center spindle cap */}
        <circle cx={CX} cy={CY} r="14" fill={`url(#capGrad-${label})`} />
        <circle cx={CX} cy={CY} r="14" fill="none" stroke="#09090b" strokeWidth="1" />
        {/* Chrome spindle center */}
        <circle cx={CX} cy={CY} r="6" fill="#18181b" />
        <circle cx={CX} cy={CY} r="6" fill="none" stroke="#52525b" strokeWidth="1" />

        {/* Fixed Red/Amber Pointer Triangle at the Top */}
        <path
          d={`M ${CX - 6} ${CY - BEZEL_R} L ${CX + 6} ${CY - BEZEL_R} L ${CX} ${CY - BODY_R + 2} Z`}
          fill={activeColor}
          style={{
            filter: `url(#${glowFilterId})`,
            boxShadow: `0 0 10px ${activeColor}`
          }}
        />
        {/* Tiny pointer guide circle */}
        <circle cx={CX} cy={CY - BEZEL_R - 5} r="2" fill={activeColor} style={{ filter: `url(#${glowFilterId})` }} />
      </svg>

      {/* Label and Selected Value Indicators */}
      <div className="flex flex-col items-center mt-1">
        <span 
          className="text-2xl font-black tracking-widest transition-all duration-300"
          style={{
            color: activeColor,
            fontFamily: 'Outfit, Inter, sans-serif',
            textShadow: `0 0 10px ${activeColor}33`
          }}
        >
          {value}
        </span>
        <span className="text-[10px] font-bold tracking-[0.25em] text-zinc-500 uppercase">
          Dial {label}
        </span>
      </div>
    </div>
  );
};
