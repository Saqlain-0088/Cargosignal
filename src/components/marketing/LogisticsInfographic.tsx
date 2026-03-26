"use client";

import { useEffect, useState } from "react";

// Animated SVG logistics infographic — global supply chain route map
export function SupplyChainInfographic() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 4000;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const p = ((ts - start) % duration) / duration;
      setProgress(p);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Route: Factory → Port → Ship → Port → Warehouse → Delivery
  const routePoints = [
    { x: 80, y: 200 },   // Factory
    { x: 200, y: 260 },  // Origin port
    { x: 340, y: 180 },  // Mid ocean
    { x: 480, y: 260 },  // Dest port
    { x: 580, y: 200 },  // Warehouse
    { x: 680, y: 150 },  // Delivery
  ];

  // Build SVG path from points
  const pathD = routePoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  // Compute position along route based on progress
  const totalSegments = routePoints.length - 1;
  const scaled = progress * totalSegments;
  const seg = Math.min(Math.floor(scaled), totalSegments - 1);
  const t = scaled - seg;
  const a = routePoints[seg];
  const b = routePoints[seg + 1];
  const shipX = a.x + (b.x - a.x) * t;
  const shipY = a.y + (b.y - a.y) * t;

  // Dashed progress line length
  const pathLen = 700;
  const drawnLen = progress * pathLen;

  return (
    <div className="w-full h-full relative">
      <svg viewBox="0 0 760 400" className="w-full h-full" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#1a4a7a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#ff6d00" opacity="0.7" />
          </marker>
        </defs>

        {/* Ocean background */}
        <rect x="160" y="140" width="380" height="160" rx="12" fill="url(#oceanGrad)" />
        {/* Ocean waves */}
        {[0, 1, 2, 3].map(i => (
          <path key={i} d={`M ${170 + i * 90} ${200 + i * 10} q 20,-8 40,0 q 20,8 40,0`}
            stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0.25" />
        ))}

        {/* Route dashed line (background) */}
        <path d={pathD} stroke="#ff6d00" strokeWidth="2" fill="none"
          strokeDasharray="6 4" opacity="0.2" />

        {/* Route animated progress line */}
        <path d={pathD} stroke="#ff6d00" strokeWidth="2.5" fill="none"
          strokeDasharray={`${drawnLen} ${pathLen}`}
          strokeLinecap="round" opacity="0.9" filter="url(#glow)" />

        {/* ── FACTORY (origin) ── */}
        <g transform="translate(55, 165)">
          {/* Building */}
          <rect x="0" y="20" width="50" height="40" rx="3" fill="#252528" stroke="#ff6d00" strokeWidth="1.5" />
          <rect x="5" y="10" width="40" height="15" rx="2" fill="#2e2e32" stroke="#ff6d00" strokeWidth="1" />
          {/* Chimney */}
          <rect x="35" y="0" width="8" height="15" rx="1" fill="#2e2e32" stroke="#ff6d00" strokeWidth="1" />
          {/* Smoke */}
          <circle cx="39" cy="-5" r="4" fill="#ff6d00" opacity="0.3" />
          <circle cx="41" cy="-12" r="3" fill="#ff6d00" opacity="0.2" />
          {/* Windows */}
          <rect x="8" y="28" width="10" height="10" rx="1" fill="#ff6d00" opacity="0.4" />
          <rect x="22" y="28" width="10" height="10" rx="1" fill="#ff6d00" opacity="0.4" />
          <rect x="36" y="28" width="10" height="10" rx="1" fill="#ff6d00" opacity="0.2" />
          {/* Door */}
          <rect x="18" y="42" width="14" height="18" rx="1" fill="#ff6d00" opacity="0.3" />
          <text x="25" y="75" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontWeight="600">FACTORY</text>
        </g>

        {/* ── ORIGIN PORT ── */}
        <g transform="translate(170, 230)">
          {/* Crane arm */}
          <line x1="15" y1="0" x2="15" y2="40" stroke="#ff6d00" strokeWidth="2" />
          <line x1="15" y1="5" x2="50" y2="5" stroke="#ff6d00" strokeWidth="2" />
          <line x1="50" y1="5" x2="50" y2="25" stroke="#ff6d00" strokeWidth="1.5" strokeDasharray="3 2" />
          {/* Container on crane */}
          <rect x="38" y="25" width="24" height="14" rx="2" fill="#ff6d00" opacity="0.8" />
          <line x1="42" y1="25" x2="42" y2="39" stroke="#1c1c1e" strokeWidth="1" />
          <line x1="50" y1="25" x2="50" y2="39" stroke="#1c1c1e" strokeWidth="1" />
          <line x1="58" y1="25" x2="58" y2="39" stroke="#1c1c1e" strokeWidth="1" />
          {/* Dock */}
          <rect x="0" y="40" width="70" height="8" rx="2" fill="#2e2e32" stroke="#ff6d00" strokeWidth="1" opacity="0.8" />
          <text x="35" y="60" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontWeight="600">PORT</text>
        </g>

        {/* ── SHIP (animated) ── */}
        <g transform={`translate(${shipX - 22}, ${shipY - 14})`} filter="url(#glow)">
          {/* Hull */}
          <path d="M0,14 Q22,22 44,14 L40,8 L4,8 Z" fill="#ff6d00" opacity="0.95" />
          {/* Deck */}
          <rect x="8" y="2" width="28" height="8" rx="2" fill="#e56200" />
          {/* Bridge */}
          <rect x="26" y="-4" width="10" height="8" rx="1" fill="#ff6d00" />
          {/* Containers on deck */}
          <rect x="10" y="3" width="8" height="6" rx="1" fill="#3b82f6" opacity="0.9" />
          <rect x="20" y="3" width="8" height="6" rx="1" fill="#10b981" opacity="0.9" />
          {/* Wake */}
          <path d="M44,16 q8,2 16,-1" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M44,18 q6,2 12,0" stroke="white" strokeWidth="0.8" fill="none" opacity="0.2" />
        </g>

        {/* ── DESTINATION PORT ── */}
        <g transform="translate(455, 230)">
          <line x1="55" y1="0" x2="55" y2="40" stroke="#ff6d00" strokeWidth="2" />
          <line x1="5" y1="5" x2="55" y2="5" stroke="#ff6d00" strokeWidth="2" />
          <line x1="5" y1="5" x2="5" y2="25" stroke="#ff6d00" strokeWidth="1.5" strokeDasharray="3 2" />
          <rect x="-6" y="25" width="24" height="14" rx="2" fill="#3b82f6" opacity="0.8" />
          <line x1="-2" y1="25" x2="-2" y2="39" stroke="#1c1c1e" strokeWidth="1" />
          <line x1="6" y1="25" x2="6" y2="39" stroke="#1c1c1e" strokeWidth="1" />
          <line x1="14" y1="25" x2="14" y2="39" stroke="#1c1c1e" strokeWidth="1" />
          <rect x="0" y="40" width="70" height="8" rx="2" fill="#2e2e32" stroke="#ff6d00" strokeWidth="1" opacity="0.8" />
          <text x="35" y="60" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontWeight="600">PORT</text>
        </g>

        {/* ── WAREHOUSE ── */}
        <g transform="translate(555, 165)">
          <rect x="0" y="15" width="55" height="45" rx="3" fill="#252528" stroke="#10b981" strokeWidth="1.5" />
          {/* Roof */}
          <path d="M-5,15 L27,0 L60,15 Z" fill="#2e2e32" stroke="#10b981" strokeWidth="1" />
          {/* Door */}
          <rect x="18" y="38" width="20" height="22" rx="1" fill="#10b981" opacity="0.3" />
          {/* Windows */}
          <rect x="5" y="22" width="12" height="10" rx="1" fill="#10b981" opacity="0.3" />
          <rect x="38" y="22" width="12" height="10" rx="1" fill="#10b981" opacity="0.3" />
          {/* Stacked boxes */}
          <rect x="5" y="48" width="10" height="8" rx="1" fill="#ff6d00" opacity="0.6" />
          <rect x="5" y="40" width="10" height="8" rx="1" fill="#ff6d00" opacity="0.4" />
          <text x="27" y="75" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontWeight="600">WAREHOUSE</text>
        </g>

        {/* ── DELIVERY TRUCK ── */}
        <g transform="translate(645, 118)">
          {/* Truck body */}
          <rect x="0" y="10" width="50" height="28" rx="3" fill="#252528" stroke="#10b981" strokeWidth="1.5" />
          {/* Cab */}
          <rect x="36" y="14" width="20" height="24" rx="3" fill="#2e2e32" stroke="#10b981" strokeWidth="1.5" />
          {/* Windshield */}
          <rect x="40" y="17" width="12" height="10" rx="1" fill="#3b82f6" opacity="0.5" />
          {/* Cargo */}
          <rect x="4" y="14" width="30" height="20" rx="1" fill="#ff6d00" opacity="0.7" />
          <line x1="14" y1="14" x2="14" y2="34" stroke="#1c1c1e" strokeWidth="1" />
          <line x1="24" y1="14" x2="24" y2="34" stroke="#1c1c1e" strokeWidth="1" />
          {/* Wheels */}
          <circle cx="14" cy="40" r="7" fill="#1c1c1e" stroke="#ff6d00" strokeWidth="1.5" />
          <circle cx="14" cy="40" r="3" fill="#ff6d00" opacity="0.5" />
          <circle cx="46" cy="40" r="7" fill="#1c1c1e" stroke="#ff6d00" strokeWidth="1.5" />
          <circle cx="46" cy="40" r="3" fill="#ff6d00" opacity="0.5" />
          <text x="28" y="60" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontWeight="600">DELIVERY</text>
        </g>

        {/* ── WAYPOINT DOTS ── */}
        {routePoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={i === 0 || i === routePoints.length - 1 ? 5 : 4}
            fill={progress * (routePoints.length - 1) >= i ? "#ff6d00" : "#2e2e32"}
            stroke="#ff6d00" strokeWidth="1.5" opacity="0.9" />
        ))}

        {/* ── FLOATING CONTAINER ICONS ── */}
        {[
          { x: 250, y: 100, color: "#ff6d00" },
          { x: 380, y: 90, color: "#3b82f6" },
          { x: 310, y: 320, color: "#10b981" },
        ].map((c, i) => (
          <g key={i} transform={`translate(${c.x}, ${c.y})`} opacity="0.5">
            <rect x="-12" y="-8" width="24" height="16" rx="2" fill={c.color} opacity="0.3" stroke={c.color} strokeWidth="1" />
            <line x1="-4" y1="-8" x2="-4" y2="8" stroke={c.color} strokeWidth="0.8" opacity="0.6" />
            <line x1="4" y1="-8" x2="4" y2="8" stroke={c.color} strokeWidth="0.8" opacity="0.6" />
          </g>
        ))}

        {/* ── LOCATION PINS ── */}
        {[
          { x: 200, y: 240, label: "Shanghai" },
          { x: 480, y: 240, label: "Rotterdam" },
        ].map((pin) => (
          <g key={pin.label} transform={`translate(${pin.x}, ${pin.y - 30})`}>
            <circle cx="0" cy="0" r="5" fill="#ff6d00" opacity="0.8" />
            <circle cx="0" cy="0" r="5" fill="#ff6d00" opacity="0.3">
              <animate attributeName="r" values="5;12;5" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="-10" textAnchor="middle" fill="#ff6d00" fontSize="8" fontWeight="700">{pin.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// Simpler infographic for register page — supply chain flow diagram
export function SupplyChainFlowInfographic() {
  return (
    <div className="w-full h-full">
      <svg viewBox="0 0 760 420" className="w-full h-full">
        <defs>
          <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6d00" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow2">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="arr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#ff6d00" opacity="0.8" />
          </marker>
        </defs>

        {/* Background circles — world map hint */}
        <circle cx="380" cy="210" r="180" fill="none" stroke="#ff6d00" strokeWidth="0.5" opacity="0.08" />
        <circle cx="380" cy="210" r="130" fill="none" stroke="#ff6d00" strokeWidth="0.5" opacity="0.06" />
        <circle cx="380" cy="210" r="80" fill="none" stroke="#ff6d00" strokeWidth="0.5" opacity="0.04" />

        {/* ── NODES ── */}
        {/* Supplier */}
        <g transform="translate(60, 170)">
          <rect x="0" y="0" width="80" height="80" rx="12" fill="#252528" stroke="#ff6d00" strokeWidth="1.5" />
          {/* Factory icon */}
          <rect x="15" y="30" width="50" height="35" rx="3" fill="#2e2e32" />
          <rect x="20" y="20" width="40" height="15" rx="2" fill="#2e2e32" />
          <rect x="55" y="10" width="8" height="15" rx="1" fill="#2e2e32" />
          <rect x="20" y="35" width="10" height="10" rx="1" fill="#ff6d00" opacity="0.5" />
          <rect x="35" y="35" width="10" height="10" rx="1" fill="#ff6d00" opacity="0.5" />
          <rect x="50" y="35" width="10" height="10" rx="1" fill="#ff6d00" opacity="0.3" />
          <rect x="32" y="48" width="16" height="17" rx="1" fill="#ff6d00" opacity="0.3" />
          <text x="40" y="92" textAnchor="middle" fill="#ff6d00" fontSize="10" fontWeight="700">SUPPLIER</text>
        </g>

        {/* Arrow 1 */}
        <line x1="145" y1="210" x2="195" y2="210" stroke="#ff6d00" strokeWidth="2" markerEnd="url(#arr)" opacity="0.7" strokeDasharray="4 3">
          <animate attributeName="stroke-dashoffset" values="0;-14" dur="1s" repeatCount="indefinite" />
        </line>

        {/* Air Freight */}
        <g transform="translate(200, 170)">
          <rect x="0" y="0" width="80" height="80" rx="12" fill="#252528" stroke="#3b82f6" strokeWidth="1.5" />
          {/* Plane icon */}
          <path d="M15,40 L55,30 L65,40 L55,50 Z" fill="#3b82f6" opacity="0.8" />
          <path d="M30,30 L40,15 L45,20 L35,35 Z" fill="#3b82f6" opacity="0.6" />
          <path d="M30,50 L40,65 L45,60 L35,45 Z" fill="#3b82f6" opacity="0.6" />
          <circle cx="20" cy="40" r="4" fill="#3b82f6" opacity="0.5" />
          <text x="40" y="92" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="700">AIR FREIGHT</text>
        </g>

        {/* Arrow 2 */}
        <line x1="285" y1="210" x2="335" y2="210" stroke="#ff6d00" strokeWidth="2" markerEnd="url(#arr)" opacity="0.7" strokeDasharray="4 3">
          <animate attributeName="stroke-dashoffset" values="0;-14" dur="1s" repeatCount="indefinite" />
        </line>

        {/* Ocean Freight */}
        <g transform="translate(340, 170)">
          <rect x="0" y="0" width="80" height="80" rx="12" fill="#252528" stroke="#ff6d00" strokeWidth="1.5" />
          {/* Ship icon */}
          <path d="M10,55 Q40,65 70,55 L65,45 L15,45 Z" fill="#ff6d00" opacity="0.8" />
          <rect x="25" y="30" width="30" height="18" rx="2" fill="#e56200" opacity="0.9" />
          <rect x="45" y="22" width="12" height="12" rx="1" fill="#ff6d00" />
          <rect x="28" y="33" width="8" height="6" rx="1" fill="#1c1c1e" opacity="0.5" />
          <rect x="38" y="33" width="8" height="6" rx="1" fill="#1c1c1e" opacity="0.5" />
          {/* Waves */}
          <path d="M5,62 q10,-4 20,0 q10,4 20,0 q10,-4 20,0" stroke="white" strokeWidth="1" fill="none" opacity="0.2" />
          <text x="40" y="92" textAnchor="middle" fill="#ff6d00" fontSize="10" fontWeight="700">SEA FREIGHT</text>
        </g>

        {/* Arrow 3 */}
        <line x1="425" y1="210" x2="475" y2="210" stroke="#ff6d00" strokeWidth="2" markerEnd="url(#arr)" opacity="0.7" strokeDasharray="4 3">
          <animate attributeName="stroke-dashoffset" values="0;-14" dur="1s" repeatCount="indefinite" />
        </line>

        {/* Customs */}
        <g transform="translate(480, 170)">
          <rect x="0" y="0" width="80" height="80" rx="12" fill="#252528" stroke="#f59e0b" strokeWidth="1.5" />
          {/* Document icon */}
          <rect x="20" y="15" width="40" height="50" rx="3" fill="#2e2e32" stroke="#f59e0b" strokeWidth="1" />
          <line x1="28" y1="28" x2="52" y2="28" stroke="#f59e0b" strokeWidth="1.5" opacity="0.7" />
          <line x1="28" y1="36" x2="52" y2="36" stroke="#f59e0b" strokeWidth="1.5" opacity="0.7" />
          <line x1="28" y1="44" x2="44" y2="44" stroke="#f59e0b" strokeWidth="1.5" opacity="0.7" />
          {/* Stamp */}
          <circle cx="50" cy="52" r="10" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.6" />
          <text x="50" y="56" textAnchor="middle" fill="#f59e0b" fontSize="7" fontWeight="900">✓</text>
          <text x="40" y="92" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="700">CUSTOMS</text>
        </g>

        {/* Arrow 4 */}
        <line x1="565" y1="210" x2="615" y2="210" stroke="#ff6d00" strokeWidth="2" markerEnd="url(#arr)" opacity="0.7" strokeDasharray="4 3">
          <animate attributeName="stroke-dashoffset" values="0;-14" dur="1s" repeatCount="indefinite" />
        </line>

        {/* Delivery */}
        <g transform="translate(620, 170)">
          <rect x="0" y="0" width="80" height="80" rx="12" fill="#252528" stroke="#10b981" strokeWidth="1.5" />
          {/* Truck icon */}
          <rect x="5" y="28" width="45" height="28" rx="3" fill="#2e2e32" stroke="#10b981" strokeWidth="1" />
          <rect x="50" y="32" width="22" height="24" rx="3" fill="#2e2e32" stroke="#10b981" strokeWidth="1" />
          <rect x="53" y="35" width="14" height="12" rx="1" fill="#3b82f6" opacity="0.4" />
          <rect x="8" y="32" width="38" height="20" rx="1" fill="#10b981" opacity="0.4" />
          <line x1="18" y1="32" x2="18" y2="52" stroke="#1c1c1e" strokeWidth="1" />
          <line x1="28" y1="32" x2="28" y2="52" stroke="#1c1c1e" strokeWidth="1" />
          <line x1="38" y1="32" x2="38" y2="52" stroke="#1c1c1e" strokeWidth="1" />
          <circle cx="18" cy="60" r="8" fill="#1c1c1e" stroke="#10b981" strokeWidth="1.5" />
          <circle cx="18" cy="60" r="3" fill="#10b981" opacity="0.5" />
          <circle cx="58" cy="60" r="8" fill="#1c1c1e" stroke="#10b981" strokeWidth="1.5" />
          <circle cx="58" cy="60" r="3" fill="#10b981" opacity="0.5" />
          <text x="40" y="92" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="700">DELIVERY</text>
        </g>

        {/* ── BOTTOM LABEL ── */}
        <text x="380" y="340" textAnchor="middle" fill="#ff6d00" fontSize="13" fontWeight="800" opacity="0.7">
          End-to-End Supply Chain Visibility
        </text>
        <text x="380" y="358" textAnchor="middle" fill="#a1a1aa" fontSize="10" opacity="0.6">
          Track every step from supplier to final delivery
        </text>

        {/* Connecting arc at top */}
        <path d="M100,170 Q380,60 660,170" stroke="url(#flowGrad)" strokeWidth="1.5" fill="none" opacity="0.2" strokeDasharray="6 4" />
      </svg>
    </div>
  );
}
