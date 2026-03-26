"use client";

import { useEffect, useRef, useState } from "react";
import { Package, Globe, CheckCircle, Zap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const stats = [
  { value: 2000000, suffix: "+", label: "Shipments Tracked", icon: Package },
  { value: 120, suffix: "+", label: "Countries Covered", icon: Globe },
  { value: 99.8, suffix: "%", label: "Tracking Accuracy", icon: CheckCircle, decimal: true },
  { value: 340, suffix: "+", label: "Carrier Partners", icon: Zap },
];

function useCountUp(target: number, duration = 1800, decimal = false) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(parseFloat((eased * target).toFixed(decimal ? 1 : 0)));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, decimal]);

  return { count, ref };
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { count, ref } = useCountUp(stat.value, 1800, stat.decimal);
  const display = stat.value >= 1000000
    ? (count / 1000000).toFixed(1) + "M"
    : stat.decimal
    ? count.toFixed(1)
    : Math.round(count).toLocaleString();

  return (
    <AnimatedSection delay={index * 0.1}>
      <div
        ref={ref}
        className="rounded-xl p-6 border border-white/[0.14] bg-[#252528] text-center group cursor-default transition-all duration-200 hover:border-[#ff6d00]/40 hover:bg-[#2e2e32]"
      >
        <div className="inline-flex p-3 rounded-xl mb-4 bg-[#ff6d00]/10">
          <stat.icon className="h-6 w-6 text-[#ff6d00]" />
        </div>
        <div className="text-3xl font-extrabold text-white mb-1 tabular-nums">
          {display}{stat.suffix}
        </div>
        <div className="text-sm text-zinc-400">{stat.label}</div>
      </div>
    </AnimatedSection>
  );
}

export default function StatsSection() {
  return (
    <section id="stats" className="py-16 bg-[#1c1c1e]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
