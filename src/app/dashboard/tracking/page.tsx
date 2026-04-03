"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Search, MapPin, Package, Ship, Clock, CheckCircle2,
  Navigation, AlertCircle, Loader2, X, ArrowRight, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  status: string;
  location: string;
  date: string;
  time: string;
  done: boolean;
  active: boolean;
}

interface TrackingResult {
  id: string;
  status: string;
  vessel: string;
  carrier: string;
  origin: string;
  destination: string;
  currentLocation: string;
  eta: string;
  progress: number;
  timeline: TimelineEvent[];
}

const statusColors: Record<string, string> = {
  "In Transit": "#3b82f6",
  "Customs Hold": "#f59e0b",
  "Arrived": "#10b981",
  "Booked": "#8b5cf6",
};

export default function TrackingPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>}>
        <TrackingContent />
      </Suspense>
    </DashboardLayout>
  );
}

function TrackingContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  // Auto-trigger search if ?q= param is present (from post-register redirect)
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuery(q);
      doSearch(q);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doSearch = async (containerNumber: string) => {
    const cn = containerNumber.trim().toUpperCase();
    if (!cn) { setError("Please enter a container number"); return; }
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/track?container_number=${encodeURIComponent(cn)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Tracking failed. Please try again.");
      } else {
        setResult(data as TrackingResult);
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(query);
  };

  const color = result ? (statusColors[result.status] ?? "#3b82f6") : "#3b82f6";

  return (
    <div className="flex flex-col gap-6 pb-16">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Container Tracking</h1>
          <p className="text-slate-500 mt-1 font-medium">Search any container number for real-time status and timeline.</p>
        </div>

        {/* Search box */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    value={query}
                    onChange={e => { setQuery(e.target.value); setError(""); }}
                    placeholder="Enter container number (e.g. MSDU8368827)"
                    className="w-full h-11 pl-10 pr-4 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="flex items-center gap-2 h-11 px-6 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  {loading
                    ? <><Loader2 className="h-4 w-4 animate-spin" /> Tracking...</>
                    : <><span>Track</span><ArrowRight className="h-4 w-4" /></>}
                </button>
              </div>
              {error && (
                <p className="flex items-center gap-1.5 text-xs text-red-500 mt-2 px-1">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />{error}
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Loading state */}
        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-16">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-blue-200 flex items-center justify-center">
                  <Loader2 className="h-7 w-7 text-blue-500 animate-spin" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-blue-300 animate-ping opacity-40" />
              </div>
              <div className="text-center">
                <div className="font-semibold text-slate-800 mb-1">Fetching shipment data...</div>
                <div className="text-slate-400 text-sm">Querying {query.toUpperCase()} across 340+ carriers</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div ref={resultRef}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4">

              {/* Result header card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color + "15" }}>
                      <Ship className="h-5 w-5" style={{ color }} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider">Container</div>
                      <div className="font-bold text-slate-900 font-mono text-lg">{result.id}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border"
                      style={{ background: color + "15", color, borderColor: color + "40" }}>
                      {result.status}
                    </span>
                    <button onClick={() => { setResult(null); setQuery(""); setError(""); }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Key details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Vessel", value: result.vessel, icon: Ship },
                      { label: "Carrier", value: result.carrier, icon: Package },
                      { label: "Origin", value: result.origin, icon: MapPin },
                      { label: "Destination", value: result.destination, icon: MapPin },
                    ].map(d => (
                      <div key={d.label} className="rounded-xl p-4 bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-1.5 mb-2">
                          <d.icon className="h-3.5 w-3.5 text-slate-400" />
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider">{d.label}</div>
                        </div>
                        <div className="font-semibold text-slate-800 text-sm leading-tight">{d.value || "—"}</div>
                      </div>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div className="rounded-xl p-5 bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-semibold text-slate-800">Journey Progress</span>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Estimated Arrival</div>
                        <div className="font-bold text-sm" style={{ color }}>{result.eta}</div>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                      <motion.div className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${result.progress}%` }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>{result.origin}</span>
                      <span className="font-semibold" style={{ color }}>{result.progress}% complete</span>
                      <span>{result.destination}</span>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="rounded-xl p-5 bg-slate-50 border border-slate-100">
                    <h3 className="font-bold text-slate-800 text-sm mb-5 flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-slate-400" />
                      Tracking History
                    </h3>
                    <div className="relative">
                      <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-200" />
                      <div className="space-y-5">
                        {result.timeline.map((step, i) => (
                          <motion.div key={i}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.07 }}
                            className="flex items-start gap-4 relative z-10">
                            <div className={cn(
                              "w-9 h-9 rounded-full flex items-center justify-center border-2 shrink-0",
                              step.done ? "bg-blue-600 border-blue-600" :
                              step.active ? "bg-white border-blue-400" :
                              "bg-white border-slate-200"
                            )}
                              style={step.active ? { boxShadow: `0 0 12px ${color}50` } : {}}>
                              {step.done
                                ? <CheckCircle2 className="h-4 w-4 text-white" />
                                : step.active
                                ? <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                                : <div className="w-2 h-2 bg-slate-200 rounded-full" />}
                            </div>
                            <div className="flex-1 pt-1.5">
                              <div className="flex items-center justify-between gap-2">
                                <span className={cn("font-semibold text-sm",
                                  step.active ? "text-blue-600" : step.done ? "text-slate-800" : "text-slate-400")}>
                                  {step.status}
                                </span>
                                <span className="text-[10px] text-slate-400 shrink-0 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />{step.date} · {step.time}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                                <MapPin className="h-3 w-3" />{step.location}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Info note */}
                  <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-blue-100 bg-blue-50">
                    <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-500">
                      <span className="text-slate-700 font-semibold">Live data: </span>
                      This tracking information is fetched in real-time from the carrier network. Data refreshes every 60 seconds.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!loading && !result && !error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="font-semibold text-slate-700 mb-1">Track a container</h3>
            <p className="text-sm text-slate-400 max-w-xs">Enter a container number above to get real-time location, status, and timeline.</p>
            <p className="text-xs text-slate-300 mt-3">Format: 4 letters + 7 digits (e.g. MSDU8368827)</p>
          </div>
        )}
      </div>
  );
}
