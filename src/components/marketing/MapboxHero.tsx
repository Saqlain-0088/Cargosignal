"use client";

import { useEffect, useRef, memo } from "react";

// Mock route: Singapore → Dubai → Rotterdam
const ROUTE_COORDS: [number, number][] = [
  [103.8198, 1.3521],   // Singapore
  [72.8777, 19.0760],   // Mumbai
  [55.2708, 25.2048],   // Dubai
  [32.8597, 39.9334],   // Ankara
  [4.9041, 52.3676],    // Amsterdam
  [4.4777, 51.9244],    // Rotterdam
];

function interpolate(a: [number, number], b: [number, number], t: number): [number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function getPositionAlongRoute(coords: [number, number][], progress: number): [number, number] {
  const totalSegments = coords.length - 1;
  const scaled = progress * totalSegments;
  const segIndex = Math.min(Math.floor(scaled), totalSegments - 1);
  const t = scaled - segIndex;
  return interpolate(coords[segIndex], coords[segIndex + 1], t);
}

export default memo(function MapboxHero() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const animFrameRef = useRef<number>(0);
  const progressRef = useRef(0);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    let mapboxgl: typeof import("mapbox-gl");

    const init = async () => {
      const mb = await import("mapbox-gl");
      mapboxgl = mb.default ?? mb;
      await import("mapbox-gl/dist/mapbox-gl.css");

      (mapboxgl as any).accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [40, 25],
        zoom: 2.2,
        interactive: false,
        attributionControl: false,
        logoPosition: "bottom-right",
      });

      mapRef.current = map;

      map.on("load", () => {
        // Route line
        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: { type: "LineString", coordinates: ROUTE_COORDS },
          },
        });

        // Glow line (wider, dimmer)
        map.addLayer({
          id: "route-glow",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": "#ff6d00",
            "line-width": 8,
            "line-opacity": 0.15,
          },
        });

        // Main route line
        map.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": "#ff6d00",
            "line-width": 2.5,
            "line-opacity": 0.9,
            "line-dasharray": [2, 1],
          },
        });

        // Pulse circles at waypoints
        ROUTE_COORDS.forEach((coord, i) => {
          const el = document.createElement("div");
          el.style.cssText = `
            width: ${i === 0 || i === ROUTE_COORDS.length - 1 ? "14px" : "8px"};
            height: ${i === 0 || i === ROUTE_COORDS.length - 1 ? "14px" : "8px"};
            background: #ff6d00;
            border-radius: 50%;
            border: 2px solid rgba(255,109,0,0.4);
            box-shadow: 0 0 0 0 rgba(255,109,0,0.6);
            animation: pulse-dot 2s ease-out infinite;
          `;
          new mapboxgl.Marker({ element: el }).setLngLat(coord).addTo(map);
        });

        // Moving ship marker
        const shipEl = document.createElement("div");
        shipEl.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#ff6d00" opacity="0.9"/>
          <path d="M12 6L8 14H16L12 6Z" fill="white"/>
          <rect x="10" y="14" width="4" height="3" rx="1" fill="white"/>
        </svg>`;
        shipEl.style.cssText = "cursor: default; filter: drop-shadow(0 0 6px rgba(255,109,0,0.8));";

        const marker = new mapboxgl.Marker({ element: shipEl })
          .setLngLat(ROUTE_COORDS[0])
          .addTo(map);
        markerRef.current = marker;

        // Animate marker along route
        const DURATION = 12000; // 12s loop
        let startTime: number | null = null;

        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const elapsed = (timestamp - startTime) % DURATION;
          const progress = elapsed / DURATION;
          progressRef.current = progress;

          const pos = getPositionAlongRoute(ROUTE_COORDS, progress);
          marker.setLngLat(pos);

          animFrameRef.current = requestAnimationFrame(animate);
        };

        animFrameRef.current = requestAnimationFrame(animate);
      });
    };

    init();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      markerRef.current?.remove();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10">
      {/* Pulse animation style */}
      <style>{`
        @keyframes pulse-dot {
          0% { box-shadow: 0 0 0 0 rgba(255,109,0,0.6); }
          70% { box-shadow: 0 0 0 10px rgba(255,109,0,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,109,0,0); }
        }
      `}</style>

      <div ref={mapContainer} className="w-full h-full" />

      {/* Live badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
        <span className="w-2 h-2 rounded-full bg-[#ff6d00] animate-pulse" />
        <span className="text-xs font-semibold text-white">LIVE TRACKING</span>
      </div>

      {/* Route info */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-3 border border-white/10">
        <div className="flex items-center justify-between text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff6d00]" />
            <span>Singapore</span>
          </div>
          <div className="flex-1 mx-3 h-px bg-[#ff6d00]/30 relative">
            <div className="absolute inset-y-0 left-0 bg-[#ff6d00]/60 w-3/4 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-zinc-400" />
            <span>Rotterdam</span>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-zinc-500">
          <span>CS-2024-8821</span>
          <span className="text-[#ff6d00]">In Transit · ETA 4 days</span>
        </div>
      </div>
    </div>
  );
});
