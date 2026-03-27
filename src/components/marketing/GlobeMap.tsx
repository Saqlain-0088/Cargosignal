"use client";

import { useEffect, useRef, memo } from "react";

// Ship routes: [lng, lat]
const ROUTES: [number, number][][] = [
  // Mumbai → Los Angeles
  [[72.88, 18.96], [60, 15], [40, 10], [10, 5], [-20, 8], [-60, 15], [-90, 20], [-118.24, 34.05]],
  // Shanghai → Rotterdam
  [[121.47, 31.23], [130, 35], [140, 40], [160, 45], [180, 48], [-160, 50], [-120, 52], [-80, 55], [-40, 55], [0, 52], [4.47, 51.92]],
  // Dubai → Singapore
  [[55.27, 25.20], [65, 20], [75, 15], [85, 10], [95, 5], [103.82, 1.35]],
];

function interpolate(a: [number, number], b: [number, number], t: number): [number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function getPos(pts: [number, number][], t: number): [number, number] {
  const n = pts.length - 1;
  const s = t * n;
  const i = Math.min(Math.floor(s), n - 1);
  return interpolate(pts[i], pts[i + 1], s - i);
}

export default memo(function GlobeMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const frameRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let mb: any;

    const init = async () => {
      const mod = await import("mapbox-gl");
      mb = mod.default ?? mod;
      mb.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

      const map = new mb.Map({
        container: containerRef.current!,
        style: "mapbox://styles/mapbox/dark-v11",
        projection: "globe",
        center: [20, 20],
        zoom: 1.4,
        pitch: 0,
        bearing: 0,
        interactive: false,
        attributionControl: false,
        logoPosition: "bottom-right",
        antialias: true,
      });

      mapRef.current = map;

      map.on("load", () => {
        // Atmosphere / fog for 3D globe feel
        map.setFog({
          color: "rgb(3, 6, 9)",
          "high-color": "rgb(10, 22, 40)",
          "horizon-blend": 0.04,
          "space-color": "rgb(3, 6, 9)",
          "star-intensity": 0.6,
        });

        // Add route lines
        ROUTES.forEach((pts, i) => {
          const id = `route-${i}`;
          map.addSource(id, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: { type: "LineString", coordinates: pts },
            },
          });

          // Glow layer
          map.addLayer({
            id: `${id}-glow`,
            type: "line",
            source: id,
            paint: {
              "line-color": i === 0 ? "#3b82f6" : i === 1 ? "#06b6d4" : "#8b5cf6",
              "line-width": 6,
              "line-opacity": 0.12,
            },
          });

          // Main line
          map.addLayer({
            id: `${id}-line`,
            type: "line",
            source: id,
            paint: {
              "line-color": i === 0 ? "#60a5fa" : i === 1 ? "#22d3ee" : "#a78bfa",
              "line-width": 1.5,
              "line-opacity": 0.8,
              "line-dasharray": [3, 2],
            },
          });
        });

        // Port pulse markers
        const ports = [
          { lng: 72.88, lat: 18.96, label: "Mumbai" },
          { lng: -118.24, lat: 34.05, label: "Los Angeles" },
          { lng: 121.47, lat: 31.23, label: "Shanghai" },
          { lng: 4.47, lat: 51.92, label: "Rotterdam" },
          { lng: 55.27, lat: 25.20, label: "Dubai" },
          { lng: 103.82, lat: 1.35, label: "Singapore" },
        ];

        ports.forEach(port => {
          const el = document.createElement("div");
          el.style.cssText = `
            width: 10px; height: 10px;
            background: #3b82f6;
            border-radius: 50%;
            border: 2px solid rgba(96,165,250,0.5);
            box-shadow: 0 0 0 0 rgba(59,130,246,0.6);
            animation: portPulse 2.5s ease-out infinite;
          `;
          new mb.Marker({ element: el }).setLngLat([port.lng, port.lat]).addTo(map);
        });

        // Ship markers for each route
        ROUTES.forEach((pts, i) => {
          const el = document.createElement("div");
          const colors = ["#60a5fa", "#22d3ee", "#a78bfa"];
          el.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="${colors[i]}" opacity="0.9"/>
              <path d="M12 5L8 14H16L12 5Z" fill="white"/>
              <rect x="10" y="14" width="4" height="3" rx="1" fill="white"/>
            </svg>
          `;
          el.style.cssText = `filter: drop-shadow(0 0 6px ${colors[i]}); cursor: default;`;
          const marker = new mb.Marker({ element: el }).setLngLat(pts[0]).addTo(map);
          markersRef.current.push({ marker, pts, offset: i / ROUTES.length });
        });

        // Slow auto-rotate
        const DURATION = 120000;
        const animate = (ts: number) => {
          if (!startRef.current) startRef.current = ts;
          const elapsed = ts - startRef.current;

          // Rotate globe
          const bearing = (elapsed / DURATION) * 360;
          map.setBearing(bearing % 360);

          // Move ship markers
          const routeProgress = (elapsed % 20000) / 20000;
          markersRef.current.forEach(({ marker, pts, offset }) => {
            const p = (routeProgress + offset) % 1;
            const pos = getPos(pts, p);
            marker.setLngLat(pos);
          });

          frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);
      });
    };

    init();

    return () => {
      cancelAnimationFrame(frameRef.current);
      markersRef.current.forEach(({ marker }) => marker.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes portPulse {
          0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.6); }
          70% { box-shadow: 0 0 0 12px rgba(59,130,246,0); }
          100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
        }
      `}</style>
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
    </>
  );
});
