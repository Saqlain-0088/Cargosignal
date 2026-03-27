"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 2000000, suffix: "+", label: "Shipments Tracked", prefix: "" },
  { value: 340, suffix: "+", label: "Ports Covered", prefix: "" },
  { value: 99.8, suffix: "%", label: "Tracking Accuracy", prefix: "", decimal: true },
  { value: 120, suffix: "+", label: "Countries", prefix: "" },
];

function CountUp({ target, suffix, prefix, decimal = false }: { target: number; suffix: string; prefix: string; decimal?: boolean }) {
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
          const p = Math.min((now - start) / 2000, 1);
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

  return <div ref={ref} className="tabular-nums">{prefix}{display}{suffix}</div>;
}

export default function StatsSection() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1526 0%, #0B0F19 50%, #0d1526 100%)" }}>
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                <CountUp target={s.value} suffix={s.suffix} prefix={s.prefix} decimal={s.decimal} />
              </div>
              <div className="text-sm text-zinc-400 font-medium uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
