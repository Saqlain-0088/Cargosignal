"use client";

import { useEffect, useRef, useState, memo } from "react";

// Major shipping routes [lng, lat]
const ROUTES = [
  { pts: [[-74,41],[-50,45],[-20,50],[0,52],[10,54]], color: "#ffffff", label: "NY→Hamburg" },
  { pts: [[121,31],[140,35],[160,40],[180,42],[-160,40],[-130,35],[-118,34]], color: "#f59e0b", label: "Shanghai→LA" },
  { pts: [[104,1],[80,10],[60,20],[43,12],[32,30],[20,38],[5,51],[4,52]], color: "#ffffff", label: "Singapore→Rotterdam" },
  { pts: [[-43,-23],[-50,-30],[-55,-35],[-60,-40],[-65,-50]], color: "#f59e0b", label: "Santos→South" },
  { pts: [[151,-34],[130,-20],[110,-10],[104,1]], color: "#60a5fa", label: "Sydney→Singapore" },
  { pts: [[18,-34],[25,-20],[40,-10],[45,10],[43,12]], color: "#60a5fa", label: "Cape Town→Djibouti" },
  { pts: [[55,25],[43,12],[32,30],[20,38],[5,51]], color: "#f59e0b", label: "Dubai→Rotterdam" },
];

const PORTS: { lng: number; lat: number; label: string; color: string }[] = [
  { lng: 121, lat: 31, label: "Shanghai", color: "#ef4444" },
  { lng: -118, lat: 34, label: "Los Angeles", color: "#3b82f6" },
  { lng: 4, lat: 52, label: "Rotterdam", color: "#06b6d4" },
  { lng: 104, lat: 1, label: "Singapore", color: "#f59e0b" },
  { lng: 151, lat: -34, label: "Sydney", color: "#06b6d4" },
  { lng: -74, lat: 41, label: "New York", color: "#8b5cf6" },
  { lng: 10, lat: 54, label: "Hamburg", color: "#06b6d4" },
  { lng: 55, lat: 25, label: "Dubai", color: "#f59e0b" },
  { lng: -43, lat: -23, label: "Santos", color: "#3b82f6" },
  { lng: 18, lat: -34, label: "Cape Town", color: "#8b5cf6" },
  { lng: 139, lat: 35, label: "Tokyo", color: "#ef4444" },
  { lng: 43, lat: 12, label: "Djibouti", color: "#ef4444" },
];

function lngLatToXY(lng: number, lat: number, w: number, h: number): [number, number] {
  const x = ((lng + 180) / 360) * w;
  const y = ((90 - lat) / 180) * h;
  return [x, y];
}

function lerp(a: [number, number], b: [number, number], t: number): [number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function getPosAlongRoute(pts: [number, number][], t: number): [number, number] {
  const n = pts.length - 1;
  const s = t * n;
  const i = Math.min(Math.floor(s), n - 1);
  return lerp(pts[i], pts[i + 1], s - i);
}

export default memo(function TacticalWorldMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const svgOverlayRef = useRef<SVGSVGElement>(null);
  const [tick, setTick] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const [mapReady, setMapReady] = useState(false);

  // Animate tick for moving dots
  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      setTick(ts - startRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Init Mapbox with satellite style
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const init = async () => {
      const mod = await import("mapbox-gl");
      const mb = mod.default ?? mod;
      mb.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

      const map = new mb.Map({
        container: mapRef.current!,
        // Satellite style for photorealistic earth
        style: "mapbox://styles/mapbox/satellite-v9",
        center: [20, 20],
        zoom: 1.5,
        interactive: false,
        attributionControl: false,
        logoPosition: "bottom-right",
        antialias: true,
      });

      mapInstanceRef.current = map;

      map.on("load", () => {
        // Add shipping route lines
        ROUTES.forEach((route, i) => {
          const id = `route-${i}`;
          map.addSource(id, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: { type: "LineString", coordinates: route.pts },
            },
          });

          // Glow layer
          map.addLayer({
            id: `${id}-glow`,
            type: "line",
            source: id,
            paint: {
              "line-color": route.color,
              "line-width": 6,
              "line-opacity": 0.15,
            },
          });

          // Dashed route line
          map.addLayer({
            id: `${id}-dash`,
            type: "line",
            source: id,
            paint: {
              "line-color": route.color,
              "line-width": 1.8,
              "line-opacity": 0.85,
              "line-dasharray": [4, 3],
            },
          });
        });

        // Port pulse markers
        PORTS.forEach(port => {
          const el = document.createElement("div");
          el.style.cssText = `
            width: 12px; height: 12px;
            background: ${port.color};
            border-radius: 50%;
            border: 2px solid rgba(255,255,255,0.5);
            box-shadow: 0 0 0 0 ${port.color}80;
            animation: portPulse 2.5s ease-out infinite;
            cursor: default;
          `;
          const marker = new mb.Marker({ element: el })
            .setLngLat([port.lng, port.lat])
            .addTo(map);
          markersRef.current.push(marker);
        });

        setMapReady(true);
      });
    };

    init();

    return () => {
      cancelAnimationFrame(rafRef.current);
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Waveform bars
  const waveformBars = Array.from({ length: 100 }, (_, i) => {
    const h = 3 + Math.sin(i * 0.35 + tick * 0.0015) * 7 + Math.sin(i * 0.12 + tick * 0.001) * 5;
    return Math.max(2, h);
  });

  const W = 1200, H = 600;
  const CYCLE = 14000;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <style>{`
        @keyframes portPulse {
          0% { box-shadow: 0 0 0 0 currentColor; }
          70% { box-shadow: 0 0 0 14px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
      `}</style>

      {/* Mapbox satellite map */}
      <div ref={mapRef} className="absolute inset-0 w-full h-full" />

      {/* Dark overlay to darken the satellite map slightly */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,10,25,0.45)" }} />

      {/* SVG overlay — grid + HUD + moving dots */}
      <svg
        ref={svgOverlayRef}
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="hudGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── BLUE GRID OVERLAY ── */}
        {Array.from({ length: 25 }).map((_, i) => (
          <line key={`vg${i}`} x1={i * 50} y1="0" x2={i * 50} y2={H}
            stroke="#1e6aaa" strokeWidth="0.4" opacity="0.5" />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`hg${i}`} x1="0" y1={i * 50} x2={W} y2={i * 50}
            stroke="#1e6aaa" strokeWidth="0.4" opacity="0.5" />
        ))}
        {/* Major grid lines */}
        {[0, 200, 400, 600, 800, 1000, 1200].map((x, i) => (
          <line key={`vmg${i}`} x1={x} y1="0" x2={x} y2={H}
            stroke="#1e6aaa" strokeWidth="0.8" opacity="0.35" />
        ))}
        {[0, 150, 300, 450, 600].map((y, i) => (
          <line key={`hmg${i}`} x1="0" y1={y} x2={W} y2={y}
            stroke="#1e6aaa" strokeWidth="0.8" opacity="0.35" />
        ))}

        {/* ── MOVING SHIP DOTS (on SVG overlay) ── */}
        {mapReady && ROUTES.map((route, ri) => {
          const svgPts = route.pts.map(([lng, lat]) => lngLatToXY(lng, lat, W, H)) as [number, number][];
          const offset = ri / ROUTES.length;
          const progress = ((tick / CYCLE + offset) % 1);
          const [dx, dy] = getPosAlongRoute(svgPts, progress);

          return (
            <g key={`ship${ri}`} filter="url(#hudGlow)">
              <circle cx={dx} cy={dy} r="5" fill={route.color} opacity="0.95" />
              <circle cx={dx} cy={dy} r="10" fill={route.color} opacity="0.2" />
              <circle cx={dx} cy={dy} r="16" fill="none" stroke={route.color} strokeWidth="1" opacity="0.12" />
            </g>
          );
        })}

        {/* ── TOP BORDER BAR ── */}
        <rect x="0" y="0" width={W} height="4" fill="#1e6aaa" opacity="0.9" />
        <rect x="0" y={H - 4} width={W} height="4" fill="#1e6aaa" opacity="0.9" />

        {/* Scan line */}
        <rect x="0" y="0" width={W} height="1.5" fill="#60a5fa" opacity="0.4">
          <animate attributeName="y" values={`0;${H};0`} dur="10s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="10s" repeatCount="indefinite" />
        </rect>

        {/* ── LEFT HUD PANEL ── */}
        <g opacity="0.85">
          <rect x="8" y="20" width="100" height="130" fill="rgba(0,15,35,0.7)" stroke="#1e6aaa" strokeWidth="0.8" />
          <text x="13" y="34" fill="#60a5fa" fontSize="7.5" fontFamily="monospace" fontWeight="bold">SYSTEM STATUS</text>
          {["TRACKING: ACTIVE", "VESSELS: 2,847", "ROUTES: 847", "ALERTS: 12", "UPTIME: 99.9%", "LATENCY: 2ms"].map((t, i) => (
            <text key={i} x="13" y={48 + i * 14} fill="#93c5fd" fontSize="6.5" fontFamily="monospace">{t}</text>
          ))}
          {/* Mini globe wireframe */}
          <ellipse cx="58" cy="185" rx="32" ry="32" fill="none" stroke="#1e6aaa" strokeWidth="0.8" />
          <ellipse cx="58" cy="185" rx="16" ry="32" fill="none" stroke="#1e6aaa" strokeWidth="0.5" />
          <line x1="26" y1="185" x2="90" y2="185" stroke="#1e6aaa" strokeWidth="0.5" />
          <line x1="58" y1="153" x2="58" y2="217" stroke="#1e6aaa" strokeWidth="0.5" />
          <circle cx="58" cy="185" r="4" fill="#60a5fa" opacity="0.9">
            <animate attributeName="r" values="4;10;4" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <text x="58" y="228" fill="#1e6aaa" fontSize="6" fontFamily="monospace" textAnchor="middle">GLOBAL VIEW</text>
        </g>

        {/* ── RIGHT HUD PANEL ── */}
        <g opacity="0.85">
          <rect x={W - 108} y="20" width="100" height="110" fill="rgba(0,15,35,0.7)" stroke="#1e6aaa" strokeWidth="0.8" />
          <text x={W - 103} y="34" fill="#60a5fa" fontSize="7.5" fontFamily="monospace" fontWeight="bold">LIVE METRICS</text>
          {["PORTS: 340+", "CARRIERS: 847", "ACCURACY: 99%", "SHIPMENTS: 2.4K", "COUNTRIES: 120+"].map((t, i) => (
            <text key={i} x={W - 103} y={48 + i * 14} fill="#93c5fd" fontSize="6.5" fontFamily="monospace">{t}</text>
          ))}
        </g>

        {/* ── COORDINATE LABELS ── */}
        {[-180, -120, -60, 0, 60, 120, 180].map((lng, i) => {
          const x = ((lng + 180) / 360) * W;
          return <text key={i} x={x} y={H - 8} fill="#1e6aaa" fontSize="7" textAnchor="middle" fontFamily="monospace">{lng}°</text>;
        })}
        {[90, 60, 30, 0, -30, -60, -90].map((lat, i) => {
          const y = ((90 - lat) / 180) * H;
          return <text key={i} x="6" y={y + 3} fill="#1e6aaa" fontSize="7" fontFamily="monospace">{lat}°</text>;
        })}

        {/* ── WAVEFORM BAR ── */}
        <g transform={`translate(110, ${H - 28})`}>
          {waveformBars.map((h, i) => (
            <rect key={i} x={i * 9.8} y={20 - h} width="6" height={h}
              fill="#1e6aaa" opacity="0.75" rx="1" />
          ))}
        </g>

        {/* ── CORNER BRACKETS ── */}
        {([[0, 0, 1, 1], [W, 0, -1, 1], [0, H, 1, -1], [W, H, -1, -1]] as [number,number,number,number][]).map(([cx, cy, sx, sy], i) => (
          <g key={i} transform={`translate(${cx},${cy}) scale(${sx},${sy})`}>
            <line x1="0" y1="0" x2="35" y2="0" stroke="#60a5fa" strokeWidth="2.5" opacity="0.9" />
            <line x1="0" y1="0" x2="0" y2="35" stroke="#60a5fa" strokeWidth="2.5" opacity="0.9" />
          </g>
        ))}
      </svg>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(0,10,25,0.65) 100%)" }} />

      {/* Scanline texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)" }} />
    </div>
  );
});
