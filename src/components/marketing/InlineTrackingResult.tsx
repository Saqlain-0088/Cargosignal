"use client";

import { motion } from "framer-motion";
import { Ship, MapPin, CheckCircle2, Clock, Info, X, Package, FileCheck, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TrackingResult {
  id: string;
  status: string;
  vessel: string;
  origin: string;
  destination: string;
  currentLocation: string;
  eta: string;
  progress: number;
  timeline: { status: string; location: string; date: string; time: string; done: boolean; active: boolean }[];
}

// Mock data generator based on container ID
export function getMockTrackingData(id: string): TrackingResult {
  const seed = id.charCodeAt(0) % 4;
  const statuses = ["In Transit", "Customs Hold", "Arrived", "Departed"];
  const routes = [
    { origin: "SHANGHAI, CN", destination: "LOS ANGELES, US", vessel: "MAERSK HOUSTON", location: "Pacific Ocean", eta: "Mar 28, 2026", progress: 72 },
    { origin: "DUBAI, UAE", destination: "HAMBURG, DE", vessel: "MSC OSCAR", location: "Arabian Sea", eta: "Apr 02, 2026", progress: 45 },
    { origin: "SINGAPORE, SG", destination: "ROTTERDAM, NL", vessel: "CMA CGM MARCO POLO", location: "Indian Ocean", eta: "Apr 10, 2026", progress: 30 },
    { origin: "MUMBAI, IN", destination: "NEW YORK, US", vessel: "EVER GIVEN", location: "Suez Canal", eta: "Mar 25, 2026", progress: 88 },
  ];
  const r = routes[seed];
  return {
    id,
    status: statuses[seed],
    vessel: r.vessel,
    origin: r.origin,
    destination: r.destination,
    currentLocation: r.location,
    eta: r.eta,
    progress: r.progress,
    timeline: [
      { status: "Container Loaded", location: r.origin, date: "Mar 10, 2026", time: "08:15 AM", done: true, active: false },
      { status: "Departed Port", location: r.origin, date: "Mar 12, 2026", time: "02:20 PM", done: true, active: false },
      { status: "Customs Cleared", location: r.origin + " Customs", date: "Mar 13, 2026", time: "11:00 AM", done: true, active: false },
      { status: "In Transit", location: r.location, date: "Mar 20, 2026", time: "09:45 AM", done: false, active: true },
      { status: "Arrived at Port", location: r.destination, date: r.eta, time: "ETA", done: false, active: false },
    ],
  };
}

const statusColors: Record<string, string> = {
  "In Transit": "#3b82f6",
  "Customs Hold": "#f59e0b",
  "Arrived": "#10b981",
  "Departed": "#8b5cf6",
};

interface Props {
  result: TrackingResult;
  onClose: () => void;
}

export default function InlineTrackingResult({ result, onClose }: Props) {
  const color = statusColors[result.status] ?? "#3b82f6";

  return (
    <motion.div
      id="tracking-result"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="rounded-2xl border border-white/10 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #060b14 100%)", boxShadow: "0 0 60px rgba(59,130,246,0.08), 0 40px 80px rgba(0,0,0,0.6)" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10"
          style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color + "20" }}>
              <Ship className="h-5 w-5" style={{ color }} />
            </div>
            <div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">Shipment ID</div>
              <div className="font-bold text-white font-mono">{result.id}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ background: color + "20", color, border: `1px solid ${color}40` }}>
              {result.status}
            </span>
            <button onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-all">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Key details grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Vessel", value: result.vessel, icon: Ship },
              { label: "Current Location", value: result.currentLocation, icon: Navigation },
              { label: "Origin", value: result.origin, icon: MapPin },
              { label: "Destination", value: result.destination, icon: MapPin },
            ].map(d => (
              <div key={d.label} className="rounded-xl p-4 border border-white/8 bg-white/[0.02]">
                <div className="flex items-center gap-1.5 mb-2">
                  <d.icon className="h-3.5 w-3.5 text-zinc-600" />
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{d.label}</div>
                </div>
                <div className="font-semibold text-white text-sm leading-tight">{d.value}</div>
              </div>
            ))}
          </div>

          {/* Progress bar + ETA */}
          <div className="rounded-xl p-5 border border-white/8 bg-white/[0.02]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-zinc-500" />
                <span className="text-sm font-semibold text-white">Journey Progress</span>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Estimated Arrival</div>
                <div className="font-bold text-sm" style={{ color }}>{result.eta}</div>
              </div>
            </div>
            <div className="h-2 bg-white/8 rounded-full overflow-hidden mb-2">
              <motion.div className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${result.progress}%` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)` }} />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-600">
              <span>{result.origin}</span>
              <span className="font-semibold" style={{ color }}>{result.progress}% complete</span>
              <span>{result.destination}</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-xl p-5 border border-white/8 bg-white/[0.02]">
            <h3 className="font-bold text-white text-sm mb-5 flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-zinc-500" />
              Tracking History
            </h3>
            <div className="relative">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-white/8" />
              <div className="space-y-5">
                {result.timeline.map((step, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="flex items-start gap-4 relative z-10">
                    <div className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center border-2 shrink-0 transition-all",
                      step.done ? "bg-blue-600 border-blue-600" :
                      step.active ? "bg-[#060b14] border-blue-400" :
                      "bg-[#060b14] border-white/15"
                    )}
                      style={step.active ? { boxShadow: `0 0 14px rgba(96,165,250,0.4)` } : {}}>
                      {step.done
                        ? <CheckCircle2 className="h-4 w-4 text-white" />
                        : step.active
                        ? <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse" />
                        : <div className="w-2 h-2 bg-white/15 rounded-full" />}
                    </div>
                    <div className="flex-1 pt-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className={cn("font-semibold text-sm",
                          step.active ? "text-blue-400" : step.done ? "text-white" : "text-zinc-600")}>
                          {step.status}
                        </span>
                        <span className="text-[10px] text-zinc-600 shrink-0 flex items-center gap-1">
                          <Clock className="h-3 w-3" />{step.date} · {step.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-zinc-600 mt-0.5">
                        <MapPin className="h-3 w-3" />{step.location}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* AI note */}
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-blue-500/20 bg-blue-500/5">
            <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-400">
              <span className="text-white font-semibold">AI Prediction: </span>
              Based on current vessel speed and weather patterns, estimated arrival is on track. No significant delays expected.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
