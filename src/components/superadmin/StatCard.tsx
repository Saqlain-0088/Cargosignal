import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

export default function StatCard({ title, value, icon: Icon, trend, trendUp, color = "#3b82f6" }: StatCardProps) {
  return (
    <div className="rounded-xl p-5 border transition-all duration-200 hover:border-blue-500/30"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(59,130,246,0.12)" }}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-lg" style={{ background: color + "18" }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        {trend && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={trendUp
              ? { background: "rgba(52,211,153,0.12)", color: "#34d399" }
              : { background: "rgba(239,68,68,0.12)", color: "#f87171" }}>
            {trend}
          </span>
        )}
      </div>
      <div className="text-2xl font-extrabold text-white mb-1">{value}</div>
      <div className="text-xs font-medium" style={{ color: "#64748b" }}>{title}</div>
    </div>
  );
}
