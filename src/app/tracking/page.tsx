"use client";

import { useState, useEffect } from "react";
import MarketingLayout from "@/components/layout/MarketingLayout";
import { Button } from "@/components/ui/Button";
import { Search, Ship, MapPin, CheckCircle2, Package, Globe, Clock, Info, Lock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/marketing/AnimatedSection";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { restorePendingTracking } from "@/lib/trackingGuard";
import Link from "next/link";

const timeline = [
  { status: "In Transit", location: "Pacific Ocean", date: "Mar 20, 2026", time: "09:45 AM", active: true, done: false },
  { status: "Departed Port", location: "Shanghai East Terminal", date: "Mar 15, 2026", time: "02:20 PM", active: false, done: true },
  { status: "Customs Cleared", location: "Shanghai Customs Office", date: "Mar 12, 2026", time: "11:00 AM", active: false, done: true },
  { status: "Container Loaded", location: "Zeng's Logistics Hub", date: "Mar 10, 2026", time: "08:15 AM", active: false, done: true },
];

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // ── HARD AUTH GATE ──
    // If not authenticated, redirect to register immediately.
    // No tracking data is ever shown to unauthenticated users.
    if (!isAuthenticated) {
      router.replace("/register");
      return;
    }

    // Authenticated — check for a pending tracking ID from the homepage
    const pending = restorePendingTracking();
    if (pending) {
      setTrackingId(pending);
      setShowStatus(true);
    }
  }, [isAuthenticated, isLoading, router]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // Double-check auth (should never reach here unauthenticated due to gate above)
    if (!isAuthenticated || !trackingId.trim()) return;
    setShowStatus(true);
  };

  // Show loading spinner while auth state resolves
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1c1c1e] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#ff6d00] animate-spin" />
      </div>
    );
  }

  // Don't render anything for unauthenticated users — redirect is in progress
  if (!isAuthenticated) return null;

  return (
    <MarketingLayout>
      <section className="py-16 bg-[#1c1c1e]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[#ff6d00]/30 bg-[#ff6d00]/10 text-[#ff6d00]">Live Tracking</div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Track Your <span className="text-[#ff6d00]">Shipment</span></h1>
              <p className="text-zinc-400 mb-8">Enter your Tracking ID, Bill of Lading, or Container Number.</p>
              <form onSubmit={handleTrack} className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="text" value={trackingId} onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="e.g. CS-12345678"
                  className="w-full h-14 pl-12 pr-36 rounded-xl text-sm text-white placeholder:text-zinc-600 bg-[#252528] border border-white/[0.14] outline-none focus:ring-1 focus:ring-[#ff6d00] transition"
                />
                <div className="absolute right-2 top-2 bottom-2">
                  <Button type="submit" variant="accent" className="h-full px-6 rounded-lg">Track Now</Button>
                </div>
              </form>
            </div>
          </AnimatedSection>

          {showStatus ? (
            <AnimatedSection>
              <div className="rounded-xl bg-[#252528] border border-white/[0.14] overflow-hidden">
                {/* Banner */}
                <div className="bg-[#1c1c1e] p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/[0.14]">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#ff6d00] p-3 rounded-xl"><Ship className="h-5 w-5 text-white" /></div>
                    <div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider">Current Status</div>
                      <div className="text-xl font-bold text-white">In Transit (Offshore)</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">Estimated Arrival</div>
                    <div className="text-xl font-bold text-[#ff6d00]">Mar 25, 2026</div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-white/[0.14]">
                  {[
                    { label: "Shipment ID", value: trackingId },
                    { label: "Vessel", value: "MAERSK HOUSTON" },
                    { label: "Origin", value: "SHANGHAI, CN" },
                    { label: "Destination", value: "LONG BEACH, US" },
                  ].map((d) => (
                    <div key={d.label}>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{d.label}</div>
                      <div className="font-bold text-white text-sm">{d.value}</div>
                    </div>
                  ))}
                </div>

                {/* Timeline */}
                <div className="p-6">
                  <h3 className="font-bold text-white mb-6">Tracking History</h3>
                  <div className="space-y-0 relative">
                    <div className="absolute left-4 top-1 bottom-1 w-px bg-white/10" />
                    {timeline.map((step, i) => (
                      <div key={i} className="relative z-10 flex gap-6 pb-8 last:pb-0">
                        <div className={cn("w-9 h-9 rounded-full flex items-center justify-center border-2 shrink-0 transition-all",
                          step.done ? "bg-green-500 border-green-500" : step.active ? "bg-[#1c1c1e] border-[#ff6d00]" : "bg-[#1c1c1e] border-white/20")}>
                          {step.done ? <CheckCircle2 className="h-4 w-4 text-white" /> : step.active ? <div className="w-2.5 h-2.5 bg-[#ff6d00] rounded-full animate-pulse" /> : <div className="w-2 h-2 bg-white/20 rounded-full" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:justify-between gap-1 mb-1">
                            <h4 className={cn("font-bold text-sm", step.active ? "text-[#ff6d00]" : "text-white")}>{step.status}</h4>
                            <span className="text-xs text-zinc-500">{step.date} · {step.time}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-zinc-500"><MapPin className="h-3 w-3" />{step.location}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI note */}
                <div className="p-4 bg-[#ff6d00]/5 border-t border-[#ff6d00]/20 flex items-center gap-3">
                  <Info className="h-4 w-4 text-[#ff6d00] shrink-0" />
                  <p className="text-xs text-zinc-400"><span className="text-white font-semibold">AI Prediction:</span> Weather patterns indicate a potential 6-hour delay near Port of Long Beach.</p>
                </div>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40">
              {[{ icon: Globe, label: "Global Coverage" }, { icon: Package, label: "Every Cargo Type" }, { icon: Clock, label: "24/7 Monitoring" }].map((item) => (
                <div key={item.label} className="bg-[#252528] rounded-xl p-6 border border-white/[0.14] text-center">
                  <item.icon className="h-8 w-8 text-zinc-600 mx-auto mb-3" />
                  <div className="text-sm font-bold text-zinc-500">{item.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </MarketingLayout>
  );
}
