"use client";

import { useEffect, useRef, useState, memo } from "react";

// Shipping routes with waypoints [lng, lat] — major global trade lanes
const ROUTES = [
  // Trans-Pacific: Shanghai → Los Angeles
  { pts: [[121,31],[140,35],[160,40],[180,42],[-160,40],[-130,35],[-118,34]], color: "#f59e0b", width: 2 },
  // Asia-Europe: Singapore → Rotterdam via Suez
  { pts: [[104,1],[80,10],[60,20],[43,12],[32,30],[20,38],[5,51],[4,52]], color: "#ffffff", width: 1.5 },
  // Trans-Atlantic: New York → Hamburg
  { pts: [[-74,41],[-50,45],[-20,50],[0,52],[10,54]], color: "#ffffff", width: 1.5 },
  // South America loop
  { pts: [[-43,-23],[-50,-30],[-55,-35],[-60,-40],[-65,-50],[-70,-55]], color: "#f59e0b", width: 1.5 },
  // Australia → Asia
  { pts: [[151,-34],[130,-20],[110,-10],[104,1]], color: "#60a5fa", width: 1.5 },
  // Africa loop
  { pts: [[18,-34],[25,-20],[40,-10],[45,10],[43,12]], color: "#60a5fa", width: 1.5 },
  // North Pacific
  { pts: [[-118,34],[-130,40],[-150,50],[-170,55],[170,55],[150,45],[140,35]], color: "#f59e0b", width: 1 },
];

// Port locations [lng, lat, label, color]
const PORTS: [number, number, string, string][] = [
  [121, 31, "Shanghai", "#ef4444"],
  [-118, 34, "Los Angeles", "#3b82f6"],
  [4, 52, "Rotterdam", "#10b981"],
  [104, 1, "Singapore", "#f59e0b"],
  [151, -34, "Sydney", "#60a5fa"],
  [-74, 41, "New York", "#8b5cf6"],
  [10, 54, "Hamburg", "#10b981"],
  [55, 25, "Dubai", "#f59e0b"],
  [43, 12, "Djibouti", "#ef4444"],
  [-43, -23, "Santos", "#60a5fa"],
  [18, -34, "Cape Town", "#8b5cf6"],
  [139, 35, "Tokyo", "#ef4444"],
];

// Convert [lng, lat] to SVG [x, y] on a 1200x600 Mercator-ish projection
function toXY(lng: number, lat: number): [number, number] {
  const x = ((lng + 180) / 360) * 1200;
  const y = ((90 - lat) / 180) * 600;
  return [x, y];
}

function lerp(a: [number,number], b: [number,number], t: number): [number,number] {
  return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t];
}

function getPosAlongRoute(pts: [number,number][], t: number): [number,number] {
  const n = pts.length - 1;
  const s = t * n;
  const i = Math.min(Math.floor(s), n-1);
  return lerp(pts[i], pts[i+1], s-i);
}

export default memo(function TacticalWorldMap() {
  const [tick, setTick] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      setTick(ts - startRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const CYCLE = 12000; // 12s per loop

  // Waveform bars
  const waveformBars = Array.from({ length: 80 }, (_, i) => {
    const h = 4 + Math.sin(i * 0.4 + tick * 0.002) * 8 + Math.sin(i * 0.15 + tick * 0.001) * 6;
    return Math.max(2, h);
  });

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Deep dark base */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #020d1a 0%, #030f1f 50%, #020d1a 100%)" }} />

      <svg
        viewBox="0 0 1200 600"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Scanline filter */}
          <filter id="scanlines">
            <feTurbulence type="fractalNoise" baseFrequency="0 0.5" numOctaves="1" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blend" />
          </filter>
          {/* Glow filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="softglow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── GRID OVERLAY ── */}
        {/* Vertical lines */}
        {Array.from({ length: 25 }).map((_, i) => (
          <line key={`v${i}`} x1={i*50} y1="0" x2={i*50} y2="600"
            stroke="#1e4a7a" strokeWidth="0.5" opacity="0.6" />
        ))}
        {/* Horizontal lines */}
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i*50} x2="1200" y2={i*50}
            stroke="#1e4a7a" strokeWidth="0.5" opacity="0.6" />
        ))}
        {/* Thicker major grid lines */}
        {[0,200,400,600,800,1000,1200].map((x, i) => (
          <line key={`mv${i}`} x1={x} y1="0" x2={x} y2="600"
            stroke="#1e4a7a" strokeWidth="1" opacity="0.4" />
        ))}
        {[0,150,300,450,600].map((y, i) => (
          <line key={`mh${i}`} x1="0" y1={y} x2="1200" y2={y}
            stroke="#1e4a7a" strokeWidth="1" opacity="0.4" />
        ))}

        {/* ── CONTINENT FILLS ── */}
        <g opacity="0.55">
          {/* North America */}
          <path d="M80,80 L200,65 L260,90 L290,130 L280,180 L250,220 L200,250 L160,270 L120,250 L90,210 L70,170 Z"
            fill="#1a3a5c" stroke="#2a5a8c" strokeWidth="0.8" />
          {/* Greenland */}
          <path d="M230,30 L290,20 L310,45 L290,65 L250,68 Z"
            fill="#1a3a5c" stroke="#2a5a8c" strokeWidth="0.8" />
          {/* South America */}
          <path d="M200,270 L260,255 L290,300 L280,370 L250,420 L210,400 L190,360 L195,310 Z"
            fill="#1a3a5c" stroke="#2a5a8c" strokeWidth="0.8" />
          {/* Europe */}
          <path d="M470,65 L560,55 L590,80 L570,110 L520,125 L475,110 Z"
            fill="#1a3a5c" stroke="#2a5a8c" strokeWidth="0.8" />
          {/* Africa */}
          <path d="M470,110 L560,100 L600,145 L590,230 L550,290 L500,280 L460,240 L450,190 Z"
            fill="#1a3a5c" stroke="#2a5a8c" strokeWidth="0.8" />
          {/* Asia */}
          <path d="M590,55 L850,45 L920,75 L940,120 L900,170 L800,195 L680,185 L610,160 L590,110 Z"
            fill="#1a3a5c" stroke="#2a5a8c" strokeWidth="0.8" />
          {/* India */}
          <path d="M700,160 L740,155 L760,200 L740,240 L710,235 L695,200 Z"
            fill="#1a3a5c" stroke="#2a5a8c" strokeWidth="0.8" />
          {/* Southeast Asia */}
          <path d="M820,185 L870,175 L890,200 L870,220 L840,215 Z"
            fill="#1a3a5c" stroke="#2a5a8c" strokeWidth="0.8" />
          {/* Australia */}
          <path d="M840,310 L940,295 L970,330 L950,380 L900,395 L850,375 L830,345 Z"
            fill="#1a3a5c" stroke="#2a5a8c" strokeWidth="0.8" />
          {/* Japan */}
          <path d="M940,120 L960,110 L975,130 L960,150 L945,140 Z"
            fill="#1a3a5c" stroke="#2a5a8c" strokeWidth="0.8" />
        </g>

        {/* ── SHIPPING ROUTES (animated dashed) ── */}
        {ROUTES.map((route, ri) => {
          const svgPts = route.pts.map(([lng, lat]) => toXY(lng, lat));
          const pathD = svgPts.map((p, j) => `${j===0?"M":"L"} ${p[0]} ${p[1]}`).join(" ");
          // Animate dash offset for flowing effect
          const dashOffset = -(tick * 0.04) % 20;

          return (
            <g key={ri}>
              {/* Glow layer */}
              <path d={pathD} stroke={route.color} strokeWidth={route.width + 4}
                fill="none" opacity="0.08" filter="url(#softglow)" />
              {/* Main dashed line */}
              <path d={pathD} stroke={route.color} strokeWidth={route.width}
                fill="none" opacity="0.75" strokeDasharray="8 5"
                strokeDashoffset={dashOffset} strokeLinecap="round" />
            </g>
          );
        })}

        {/* ── MOVING SHIP DOTS ── */}
        {ROUTES.slice(0, 5).map((route, ri) => {
          const svgPts = route.pts.map(([lng, lat]) => toXY(lng, lat));
          const offset = ri / 5;
          const progress = ((tick / CYCLE + offset) % 1);
          const [dx, dy] = getPosAlongRoute(svgPts, progress);

          return (
            <g key={`ship${ri}`} filter="url(#glow)">
              <circle cx={dx} cy={dy} r="4" fill={route.color} opacity="0.95" />
              <circle cx={dx} cy={dy} r="8" fill={route.color} opacity="0.2" />
              <circle cx={dx} cy={dy} r="12" fill="none" stroke={route.color} strokeWidth="1" opacity="0.15" />
            </g>
          );
        })}

        {/* ── PORT MARKERS ── */}
        {PORTS.map(([lng, lat, label, color], i) => {
          const [x, y] = toXY(lng, lat);
          const pulseDelay = i * 0.3;
          const pulseR = 6 + Math.sin((tick * 0.002) + pulseDelay) * 4;

          return (
            <g key={`port${i}`}>
              {/* Outer pulse ring */}
              <circle cx={x} cy={y} r={pulseR} fill="none" stroke={color}
                strokeWidth="1" opacity={0.2 + Math.sin((tick * 0.002) + pulseDelay) * 0.15} />
              {/* Inner dot */}
              <circle cx={x} cy={y} r="3.5" fill={color} opacity="0.9" filter="url(#glow)" />
              {/* Label */}
              <text x={x+6} y={y-5} fill={color} fontSize="8" fontWeight="600"
                fontFamily="monospace" opacity="0.85">{label}</text>
            </g>
          );
        })}

        {/* ── HUD ELEMENTS ── */}
        {/* Top border bar */}
        <rect x="0" y="0" width="1200" height="3" fill="#1e6aaa" opacity="0.8" />
        <rect x="0" y="597" width="1200" height="3" fill="#1e6aaa" opacity="0.8" />

        {/* Top scan line animation */}
        <rect x="0" y="0" width="1200" height="1" fill="#60a5fa" opacity="0.3">
          <animate attributeName="y" values="0;600;0" dur="8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="8s" repeatCount="indefinite" />
        </rect>

        {/* Left HUD panel */}
        <g opacity="0.7">
          <rect x="8" y="30" width="90" height="120" fill="none" stroke="#1e6aaa" strokeWidth="0.8" />
          <text x="12" y="44" fill="#60a5fa" fontSize="7" fontFamily="monospace">SYSTEM STATUS</text>
          {["TRACKING: ON", "ROUTES: 847", "VESSELS: 2.4K", "ALERTS: 12", "UPTIME: 99.9%"].map((t, i) => (
            <text key={i} x="12" y={58 + i*14} fill="#93c5fd" fontSize="6.5" fontFamily="monospace">{t}</text>
          ))}
          {/* Mini globe wireframe */}
          <ellipse cx="53" cy="175" rx="30" ry="30" fill="none" stroke="#1e6aaa" strokeWidth="0.8" />
          <ellipse cx="53" cy="175" rx="15" ry="30" fill="none" stroke="#1e6aaa" strokeWidth="0.5" />
          <line x1="23" y1="175" x2="83" y2="175" stroke="#1e6aaa" strokeWidth="0.5" />
          <line x1="53" y1="145" x2="53" y2="205" stroke="#1e6aaa" strokeWidth="0.5" />
          <circle cx="53" cy="175" r="3" fill="#60a5fa" opacity="0.8">
            <animate attributeName="r" values="3;8;3" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Right HUD panel */}
        <g opacity="0.7">
          <rect x="1102" y="30" width="90" height="100" fill="none" stroke="#1e6aaa" strokeWidth="0.8" />
          <text x="1106" y="44" fill="#60a5fa" fontSize="7" fontFamily="monospace">LIVE METRICS</text>
          {["PORTS: 340+", "CARRIERS: 847", "ACCURACY: 99%", "LATENCY: 2ms"].map((t, i) => (
            <text key={i} x="1106" y={58 + i*14} fill="#93c5fd" fontSize="6.5" fontFamily="monospace">{t}</text>
          ))}
        </g>

        {/* Coordinate labels on axes */}
        {[-180,-120,-60,0,60,120,180].map((lng, i) => {
          const x = ((lng + 180) / 360) * 1200;
          return <text key={i} x={x} y="595" fill="#1e6aaa" fontSize="7" textAnchor="middle" fontFamily="monospace">{lng}°</text>;
        })}
        {[90,60,30,0,-30,-60,-90].map((lat, i) => {
          const y = ((90 - lat) / 180) * 600;
          return <text key={i} x="5" y={y+3} fill="#1e6aaa" fontSize="7" fontFamily="monospace">{lat}°</text>;
        })}

        {/* ── WAVEFORM BAR (bottom) ── */}
        <g transform="translate(100, 570)">
          {waveformBars.map((h, i) => (
            <rect key={i} x={i * 12.5} y={20 - h} width="8" height={h}
              fill="#1e6aaa" opacity="0.7" rx="1" />
          ))}
        </g>

        {/* Corner brackets */}
        {[
          [0,0,1,1], [1200,0,-1,1], [0,600,1,-1], [1200,600,-1,-1]
        ].map(([cx,cy,sx,sy], i) => (
          <g key={i} transform={`translate(${cx},${cy}) scale(${sx},${sy})`}>
            <line x1="0" y1="0" x2="30" y2="0" stroke="#60a5fa" strokeWidth="2" opacity="0.8" />
            <line x1="0" y1="0" x2="0" y2="30" stroke="#60a5fa" strokeWidth="2" opacity="0.8" />
          </g>
        ))}
      </svg>

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(2,13,26,0.7) 100%)" }} />

      {/* Subtle scanline texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)" }} />
    </div>
  );
});
