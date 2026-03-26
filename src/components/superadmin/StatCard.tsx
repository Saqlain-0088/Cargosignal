import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

export default function StatCard({ title, value, icon: Icon, trend, trendUp, color = "#ff6d00" }: StatCardProps) {
  return (
    <div className="rounded-xl bg-[#1a1a1a] border border-white/10 p-5 hover:border-white/20 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-lg" style={{ backgroundColor: `${color}15` }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        {trend && (
          <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", trendUp ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400")}>
            {trend}
          </span>
        )}
      </div>
      <div className="text-2xl font-extrabold text-white mb-1">{value}</div>
      <div className="text-xs text-zinc-500 font-medium">{title}</div>
    </div>
  );
}
