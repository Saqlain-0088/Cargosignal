"use client";

import React, { useState, useMemo, useEffect } from "react";
import Map, { Marker, Popup, Source, Layer, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { cn } from "@/lib/utils";
import { Maximize2, X, Filter, ChevronDown, Check, Globe, Layers, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

// const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN; // Removed top-level access

const CITY_COORDINATES: Record<string, [number, number]> = {
  "Shanghai, China": [121.4737, 31.2304],
  "Los Angeles, USA": [-118.2437, 33.7701],
  "Rotterdam, Netherlands": [4.4777, 51.9225],
  "Hamburg, Germany": [9.9937, 53.5511],
  "Singapore": [103.8198, 1.3521],
  "Dubai, UAE": [55.2708, 25.2048],
};

const INITIAL_VIEW_STATE = {
  longitude: 20,
  latitude: 25,
  zoom: 1.6,
};

interface ShipmentMapProps {
  shipments?: any[];
}

export function ShipmentMap({ shipments = [] }: ShipmentMapProps) {
  const router = useRouter();
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const [hoveredShipment, setHoveredShipment] = useState<any>(null);
  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [carrierFilter, setCarrierFilter] = useState("all");
  const [isEnlarged, setIsEnlarged] = useState(false);

  // Core Filtering Logic (Max 10 markers for performance)
  const filteredShipments = useMemo(() => {
    return shipments
      .filter((s) => {
        const matchesStatus = 
          statusFilter === "all" || 
          (statusFilter === "active" && (s.status === "in_transit" || s.status === "pending" || s.status === "active")) ||
          (statusFilter === "delayed" && s.status === "delayed") ||
          (statusFilter === "completed" && s.status === "delivered");
        
        // Using CargoType as proxy for Carrier filter
        const matchesCarrier = carrierFilter === "all" || s.cargoType === carrierFilter;
        return matchesStatus && matchesCarrier;
      })
      .slice(0, 10);
  }, [shipments, statusFilter, carrierFilter]);

  // Positional Mapping
  const displayShipments = useMemo(() => {
    return filteredShipments.map((s) => {
      const originCoord = CITY_COORDINATES[s.origin] || [0, 0];
      const destCoord = CITY_COORDINATES[s.destination] || [0, 0];
      const currentCoord: [number, number] = [
        (originCoord[0] + destCoord[0]) / 2,
        (originCoord[1] + destCoord[1]) / 2,
      ];
      return { ...s, originCoord, destCoord, currentCoord };
    });
  }, [filteredShipments]);

  // Selected Route Path
  const routeData = useMemo(() => {
    if (!selectedShipment) return null;
    return {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [selectedShipment.originCoord, selectedShipment.destCoord],
      },
    } as any;
  }, [selectedShipment]);

  // Accessibility: Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsEnlarged(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const FilterBar = ({ compact = false }) => (
    <div className={cn(
      "flex flex-wrap items-center gap-3", 
      compact ? "px-6 py-4 bg-white border-b border-white shadow-sm" : "mb-5"
    )}>
      {/* Status Pill Selectors */}
      <div className="flex bg-slate-100 border border-slate-200/60 p-0.5 rounded-full shadow-inner">
        {["all", "active", "delayed", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            className={cn(
              "px-4 py-1.5 text-[9px] font-black uppercase rounded-full transition-all tracking-wider",
              statusFilter === f 
                ? "bg-white shadow-md text-slate-900" 
                : "text-slate-400 hover:text-slate-600"
            )}
          >
            {f}
          </button>
        ))}
      </div>
      
      {/* Carrier Selection */}
      <div className="relative group">
        <label className="absolute -top-5 left-1 text-[8px] font-black text-slate-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Carrier Category</label>
        <div className="bg-white border border-slate-200 px-4 py-1.5 rounded-full flex items-center gap-2 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer shadow-sm">
          <Layers className="h-3 w-3 text-slate-400" />
          <select 
            className="bg-transparent text-[10px] font-black outline-none cursor-pointer appearance-none pr-5 uppercase tracking-tighter text-slate-700"
            value={carrierFilter}
            onChange={(e) => setCarrierFilter(e.target.value)}
          >
            <option value="all">ANY CARRIER</option>
            {Array.from(new Set(shipments.map(s => s.cargoType))).map(type => (
              <option key={type} value={type}>{type.split('_').join(' ')}</option>
            ))}
          </select>
          <ChevronDown className="h-3 w-3 text-slate-400 absolute right-3.5 pointer-events-none" />
        </div>
      </div>

      {!compact && (
        <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{filteredShipments.length} UNITS</span>
           <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
        </div>
      )}
    </div>
  );

  const MapContainer = ({ isModal = false }) => (
    <div className={cn(
      "relative w-full border border-slate-200 bg-slate-50 transition-all duration-300",
      isModal ? "h-full rounded-none border-none" : "h-[560px] rounded-2xl shadow-premium"
    )}>
      {/* Global CSS Overrides for Mapbox Popups per User Request */}
      <style>{`
        .mapboxgl-popup {
          z-index: 50 !important;
        }
        .mapboxgl-popup-content {
          border-radius: 16px !important;
          padding: 0 !important;
          font-family: inherit !important;
          background: #ffffff !important;
          box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) !important;
          min-width: 280px !important;
          overflow: hidden !important;
        }
        .mapboxgl-popup-close-button {
          font-size: 16px !important;
          color: #111 !important;
          right: 12px !important;
          top: 10px !important;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          cursor: pointer !important;
          line-height: 1 !important;
          z-index: 60 !important;
        }
        .mapboxgl-popup-close-button:hover {
          background: transparent !important;
          color: #000 !important;
        }
        .mapboxgl-popup-tip {
          display: none !important;
        }
      `}</style>
      
      <Map
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%", borderRadius: isModal ? "0" : "16px" }}
        projection={{ name: "mercator" } as any}
        reuseMaps
      >
        <NavigationControl position="bottom-left" showCompass={false} />

        {/* Selected Trajectory Path */}
        {routeData && (
          <Source id="selected-route" type="geojson" data={routeData}>
            <Layer
              id="route-line"
              type="line"
              paint={{ 
                "line-color": "#3b82f6", 
                "line-width": 2, 
                "line-dasharray": [2.5, 2.5],
                "line-opacity": 0.8
              }}
            />
          </Source>
        )}

        {/* Dynamic Asset Markers */}
        {displayShipments.map((s) => {
          const statusColor = 
            s.status === "in_transit" || s.status === "delivered" || s.status === "active"
              ? "bg-emerald-500" // green = active
              : s.status === "delayed" 
                ? "bg-orange-500" // orange = delayed
                : "bg-red-500";   // red = issue

          return (
            <React.Fragment key={s.id}>
              {/* Origin Hub */}
              <Marker longitude={s.originCoord[0]} latitude={s.originCoord[1]} anchor="center">
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
              </Marker>
              
              {/* Destination Hub */}
              <Marker longitude={s.destCoord[0]} latitude={s.destCoord[1]} anchor="center">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
              </Marker>

              {/* Transit Asset */}
              <Marker longitude={s.currentCoord[0]} latitude={s.currentCoord[1]} anchor="center">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 border-white shadow-xl cursor-pointer transition-all hover:scale-125 hover:z-50",
                    statusColor,
                    selectedShipment?.id === s.id && "ring-2 ring-blue-500 ring-offset-2 scale-110 z-40"
                  )}
                  onMouseEnter={() => setHoveredShipment(s)}
                  onMouseLeave={() => setHoveredShipment(null)}
                  onClick={(e) => { e.stopPropagation(); setSelectedShipment(s); }}
                />
              </Marker>
            </React.Fragment>
          );
        })}

        {/* Hover Snapshot */}
        {hoveredShipment && !selectedShipment && (
          <Popup
            longitude={hoveredShipment.currentCoord[0]}
            latitude={hoveredShipment.currentCoord[1]}
            anchor="bottom"
            closeButton={false}
            offset={10}
            className="z-50 pointer-events-none"
          >
            <div className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-black shadow-2xl flex items-center gap-2 border border-white/10">
              <span className="opacity-50 tracking-tighter">{hoveredShipment.id}</span>
              <div className="h-2 w-[1px] bg-white/20" />
              <span className="tracking-tight">{hoveredShipment.origin.split(",")[0]} → {hoveredShipment.destination.split(",")[0]}</span>
            </div>
          </Popup>
        )}

        {/* Selected Data Card */}
        {selectedShipment && (
          <Popup
            longitude={selectedShipment.currentCoord[0]}
            latitude={selectedShipment.currentCoord[1]}
            anchor="bottom"
            onClose={() => setSelectedShipment(null)}
            offset={16}
            className="z-50"
            closeOnClick={false}
          >
            <div className="p-4 bg-white">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-slate-950 text-base tracking-tight leading-none">{selectedShipment.id}</h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-wider">Live Tracking</p>
                </div>
                <span className={cn(
                  "px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest mr-6",
                  selectedShipment.status === "in_transit" || selectedShipment.status === "delivered" || selectedShipment.status === "active"
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                    : selectedShipment.status === "delayed" ? "bg-orange-50 text-orange-600 border border-orange-100" : "bg-red-50 text-red-600 border border-red-100"
                )}>
                  {selectedShipment.status.replace("_", " ")}
                </span>
              </div>

              {/* Route Section */}
              <div className="flex items-center justify-between gap-3 py-3 border-t border-slate-50">
                <div className="flex-1">
                   <p className="text-[10px] text-slate-400 uppercase tracking-tighter font-bold">Origin</p>
                   <p className="text-xs font-black text-slate-900 truncate">{selectedShipment.origin.split(",")[0]}</p>
                </div>
                <div className="flex items-center px-1">
                   <div className="h-0.5 w-6 bg-slate-100 relative rounded-full">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-slate-300 rotate-45" />
                   </div>
                </div>
                <div className="flex-1 text-right">
                   <p className="text-[10px] text-slate-400 uppercase tracking-tighter font-bold">Destination</p>
                   <p className="text-xs font-black text-slate-900 truncate">{selectedShipment.destination.split(",")[0]}</p>
                </div>
              </div>

              {/* ETA Section */}
              <div className="bg-blue-50/80 border border-blue-100/50 rounded-xl p-3 my-4 flex items-center justify-between">
                 <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest">ETA</span>
                 <span className="text-blue-700 text-[11px] font-black">
                    {new Date(selectedShipment.estimatedArrival).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                 </span>
              </div>

              {/* CTA Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/dashboard/shipments/${selectedShipment.id}`);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 active:scale-[0.98] group"
              >
                View Details <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </Popup>
        )}
      </Map>

      {!isModal && (
        <button 
          onClick={() => setIsEnlarged(true)}
          className="absolute bottom-6 right-6 p-3 bg-white shadow-premium rounded-full border border-slate-100 text-slate-500 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all z-10 group"
          title="Enlarge Fleet View"
        >
          <Maximize2 className="h-5 w-5 group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );

  if (!MAPBOX_TOKEN) {
    return (
      <div className="w-full h-[560px] flex flex-col items-center justify-center bg-slate-50 text-slate-400 border border-slate-200 rounded-2xl gap-3 shadow-inner">
        <Globe className="h-10 w-10 opacity-20 animate-pulse" />
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 italic">Vessel engine offline: Mapbox Token Missing</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-1">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Global Fleet Intelligence</h3>
            <div className="h-3 w-[1px] bg-slate-200" />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter italic">Live Satellite Overlay</span>
          </div>
        </div>
        
        <FilterBar />
        {MapContainer({ isModal: false })}
      </div>

      {/* Fullscreen Fleet Intelligence Modal */}
      {isEnlarged && (
        <div className="fixed inset-0 z-[1000] bg-white flex flex-col animate-in fade-in duration-300">
           <div className="h-20 flex items-center justify-between px-8 border-b border-slate-100 shadow-sm relative z-[1011] bg-white/80 backdrop-blur-md">
              <div className="flex items-center gap-5">
                 <div className="h-12 w-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200 group">
                    <Globe className="h-7 w-7 group-hover:rotate-12 transition-transform" />
                 </div>
                 <div>
                    <h2 className="text-xl font-black tracking-tighter text-slate-950 leading-none">Global Asset Intelligence</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-emerald-500" /> REAL-TIME MONITORING ENABLED
                    </p>
                 </div>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="h-10 w-[1px] bg-slate-100" />
                <button 
                  onClick={() => setIsEnlarged(false)}
                  className="h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all shadow-sm border border-slate-100"
                  title="Close Map (ESC)"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
           </div>

           <FilterBar compact />
           
           <div className="flex-1 min-h-0 bg-slate-50">
            {MapContainer({ isModal: true })}
           </div>
        </div>
      )}
    </>
  );
}








