"use client";

import { Users, Building2, CreditCard, Activity, TrendingUp, ArrowUpRight, Clock } from "lucide-react";
import StatCard from "@/components/superadmin/StatCard";
import { companyTenants } from "@/mock";

const recentActivity = [
  { event: "New user registered", user: "john.doe@acme.com", time: "2 min ago", type: "user" },
  { event: "Plan upgraded to Pro", user: "sarah@logistics.co", time: "15 min ago", type: "plan" },
  { event: "Organization suspended", user: "admin@cargosignal.com", time: "1 hr ago", type: "warning" },
  { event: "API limit reached", user: "dev@fastship.com", time: "2 hr ago", type: "warning" },
  { event: "New organization created", user: "ops@globalfreight.com", time: "3 hr ago", type: "org" },
];

const typeColors: Record<string, string> = {
  user: "#3b82f6", plan: "#60a5fa", warning: "#f59e0b", org: "#34d399",
};

const SA_STYLE = { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(59,130,246,0.12)" };

export default function SuperAdminDashboard() {
  const totalUsers = companyTenants.reduce((a, c) => a + c.userCount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Platform Overview</h1>
        <p className="text-sm mt-1" style={{ color: "#64748b" }}>Real-time oversight across all tenants and infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={totalUsers.toLocaleString()} icon={Users} trend="+8%" trendUp color="#3b82f6" />
        <StatCard title="Organizations" value={companyTenants.length} icon={Building2} trend="+3" trendUp color="#34d399" />
        <StatCard title="Active Plans" value="4" icon={CreditCard} color="#60a5fa" />
        <StatCard title="System Status" value="Healthy" icon={Activity} trend="99.9%" trendUp color="#34d399" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border p-5" style={SA_STYLE}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white text-sm">Recent Activity</h2>
            <span className="text-xs" style={{ color: "#64748b" }}>Last 24 hours</span>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b last:border-0" style={{ borderColor: "rgba(59,130,246,0.08)" }}>
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: typeColors[item.type] }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-medium">{item.event}</div>
                  <div className="text-xs truncate" style={{ color: "#64748b" }}>{item.user}</div>
                </div>
                <div className="flex items-center gap-1 text-xs shrink-0" style={{ color: "#475569" }}>
                  <Clock className="h-3 w-3" />{item.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border p-5" style={SA_STYLE}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4" style={{ color: "#60a5fa" }} />
            <h2 className="font-bold text-white text-sm">Top Organizations</h2>
          </div>
          <div className="space-y-3">
            {companyTenants.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: "rgba(37,99,235,0.2)", border: "1px solid rgba(59,130,246,0.2)" }}>
                  {c.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-white truncate">{c.name}</div>
                  <div className="text-[10px]" style={{ color: "#64748b" }}>{c.activeShipments} shipments</div>
                </div>
                <div className="flex items-center gap-1 text-xs" style={{ color: "#34d399" }}>
                  <ArrowUpRight className="h-3 w-3" />{c.userCount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border overflow-hidden" style={SA_STYLE}>
        <div className="p-5 border-b" style={{ borderColor: "rgba(59,130,246,0.12)" }}>
          <h2 className="font-bold text-white text-sm">All Organizations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(59,130,246,0.12)" }}>
                {["Organization", "Industry", "Users", "Shipments", "Status"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {companyTenants.map((c) => (
                <tr key={c.id} className="transition-colors" style={{ borderBottom: "1px solid rgba(59,130,246,0.06)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,130,246,0.04)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: "rgba(37,99,235,0.2)" }}>{c.name[0]}</div>
                      <span className="font-medium text-white">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3" style={{ color: "#94a3b8" }}>{c.industry}</td>
                  <td className="px-5 py-3" style={{ color: "#cbd5e1" }}>{c.userCount}</td>
                  <td className="px-5 py-3" style={{ color: "#cbd5e1" }}>{c.activeShipments}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                      style={c.status === "active"
                        ? { background: "rgba(52,211,153,0.12)", color: "#34d399" }
                        : c.status === "trial"
                        ? { background: "rgba(96,165,250,0.12)", color: "#60a5fa" }
                        : { background: "rgba(239,68,68,0.12)", color: "#f87171" }}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
