"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 2000000, suffix: "+", label: "Shipments Tracked", decimal: false },
  { value: 340, suffix: "+", label: "Ports Covered", decimal: false },
  { value: 99.8, suffix: "%", label: "Tracking Accuracy", decimal: true },
  { value: 120, suffix: "+", label: "Countries", decimal: false },
];

function CountUp({ target, suffix, decimal = false }: { target: number; suffix: string; decimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 2200, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          setCount(parseFloat((eased * target).toFixed(decimal ? 1 : 0)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, decimal]);

  const display = target >= 1000000
    ? (count / 1000000).toFixed(1) + "M"
    : decimal ? count.toFixed(1)
    : Math.round(count).toLocaleString();

  return <div ref={ref} className="tabular-nums">{display}{suffix}</div>;
}

export default function StatsSection() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #060b14 0%, #0a1628 50%, #060b14 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)" }} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ delay: i * 0.1 }}>
              <div className="text-4xl sm:text-5xl font-black mb-2 text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #60a5fa, #34d399)" }}>
                <CountUp target={s.value} suffix={s.suffix} decimal={s.decimal} />
              </div>
              <div className="text-xs text-zinc-500 font-semibold uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
