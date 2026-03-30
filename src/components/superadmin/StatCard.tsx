import { LucideIcon, ArrowUpRight, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: string;
  bg?: string;
}

export default function StatCard({ title, value, icon: Icon, trend, trendUp = true, color = "#2563eb", bg }: StatCardProps) {
  const bgColor = bg ?? color + "10";

  return (
    <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden relative">
      <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 transition-transform group-hover:scale-110" style={{ backgroundColor: color }} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{title}</p>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">{value}</h3>
        </div>
        <div className="p-2.5 rounded-xl shadow-sm transition-transform group-hover:rotate-12" style={{ backgroundColor: bgColor }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-2">
          <span className={cn(
            "flex items-center text-xs font-bold px-1.5 py-0.5 rounded-md",
            trendUp ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
          )}>
            {trendUp
              ? <ArrowUpRight className="h-3 w-3 mr-0.5" />
              : <TrendingDown className="h-3 w-3 mr-0.5" />}
            {trend}
          </span>
          <span className="text-[10px] text-slate-400 font-medium uppercase">vs last month</span>
        </div>
      )}
    </div>
  );
}
