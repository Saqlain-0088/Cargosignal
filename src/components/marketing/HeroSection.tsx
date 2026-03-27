"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Globe, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import AnimatedSection from "./AnimatedSection";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { guardedTrack } from "@/lib/trackingGuard";

const MapboxHero = dynamic(() => import("./MapboxHero"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] rounded-xl bg-[#252528] border border-white/[0.14] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#ff6d00] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-zinc-500">Loading map...</span>
      </div>
    </div>
  ),
});

export default function HeroSection() {
  const [heroTrackingId, setHeroTrackingId] = useState("");
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleHeroTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const proceed = guardedTrack(heroTrackingId, isAuthenticated, router.push);
    if (proceed) router.push(`/tracking?id=${encodeURIComponent(heroTrackingId)}`);
  };
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 pb-12 relative overflow-hidden bg-[#1c1c1e]">
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.09] bg-[#ff6d00] pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <AnimatedSection>
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#ff6d00]/30 bg-[#ff6d00]/10 text-[#ff6d00]">
                <Globe className="h-3.5 w-3.5" />
                Real-Time Supply Chain Visibility
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight text-white">
                Track Global{" "}
                <span className="text-[#ff6d00]">Shipments</span>{" "}
                in Real-Time
              </h1>

              <p className="text-lg leading-relaxed text-zinc-400 max-w-md">
                Monitor every container, vessel, and delivery across 120+ countries with live GPS tracking, instant alerts, and predictive ETAs.
              </p>

              {/* Tracking input */}
              <form onSubmit={handleHeroTrack} className="relative max-w-md">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-zinc-500" />
                </div>
                <input
                  type="text"
                  value={heroTrackingId}
                  onChange={e => setHeroTrackingId(e.target.value)}
                  placeholder="Enter Tracking ID, BL or Container #"
                  className="w-full h-12 pl-11 pr-36 rounded-xl text-sm text-white placeholder:text-zinc-600 outline-none focus:ring-1 focus:ring-[#ff6d00] bg-[#252528] border border-white/[0.14] transition"
                />
                <div className="absolute right-1.5 top-1.5 bottom-1.5">
                  <Button type="submit" variant="accent" className="h-full px-4 text-sm rounded-lg">
                    Track Now
                  </Button>
                </div>
              </form>

              <div className="flex flex-wrap gap-4">
                <Link href="/register">
                  <Button variant="accent" className="gap-2 px-6">
                    Start Tracking Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/quote">
                  <Button variant="dark-outline" className="px-6">
                    Get a Quote
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-zinc-600">No credit card required · 14-day free trial · Cancel anytime</p>
            </div>
          </AnimatedSection>

          {/* Right: Mapbox */}
          <AnimatedSection delay={0.2} className="h-[480px] lg:h-[560px]">
            <MapboxHero />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
