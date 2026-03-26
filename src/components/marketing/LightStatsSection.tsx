"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";

const stats = [
  { label: "Clinics Onboarded", value: 2000, suffix: "+", prefix: "" },
  { label: "Shipments Managed", value: 5000000, suffix: "+", prefix: "" },
  { label: "Tracking Accuracy", value: 99.8, suffix: "%", prefix: "", decimal: true },
  { label: "Avg Setup Time", value: 5, suffix: " Min", prefix: "" },
];

function CountUp({ target, suffix, prefix, decimal = false }: { target: number; suffix: string; prefix: string; decimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1800, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(parseFloat((eased * target).toFixed(decimal ? 1 : 0)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, decimal]);

  const display = target >= 1000000
    ? (count / 1000000).toFixed(1) + "M"
    : decimal ? count.toFixed(1)
    : Math.round(count).toLocaleString();

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

export default function LightStatsSection() {
  return (
    <section className="py-20 bg-[#ff6d00]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.1}>
              <div>
                <div className="text-4xl font-extrabold text-white mb-2 tabular-nums">
                  <CountUp target={s.value} suffix={s.suffix} prefix={s.prefix} decimal={s.decimal} />
                </div>
                <div className="text-sm font-semibold text-white/70 uppercase tracking-wider">{s.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
