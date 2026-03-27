"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import HeroMapSection from "@/components/marketing/HeroMapSection";
import TrackingPreview from "@/components/marketing/TrackingPreview";
import FeatureCards from "@/components/marketing/FeatureCards";
import DashboardPreview from "@/components/marketing/DashboardPreview";
import StatsSection from "@/components/marketing/StatsSection";
import CTASection from "@/components/marketing/CTASection";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B0F19] text-white">
      <Navbar />
      <main className="flex-1">
        <HeroMapSection />
        <TrackingPreview />
        <FeatureCards />
        <DashboardPreview />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
