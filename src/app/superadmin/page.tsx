"use client";

import { Users, Building2, CreditCard, Activity, TrendingUp, ArrowUpRight, Clock } from "lucide-react";
import StatCard from "@/components/superadmin/StatCard";
import { companyTenants } from "@/mock";

const recentActivity = [
  { event: "New user registered", user: "john.doe@acme.com", time: "2 min ago", type: "user" },
  { event: "Plan upgraded to Pro", user: "sarah@logistics.co", time: "15 min ago", type: "plan" },
  { event: "Organization suspended", user: "admin@badactor.io", time: "1 hr ago", type: "warning" },
  { event: "API limit reached", user: "dev@fastship.com", time: "2 hr ago", type: "warning" },
  { event: "New organization created", user: "ops@globalfreight.com", time: "3 hr ago", type: "org" },
  { event: "Password reset requested", user: "mike@cargoplus.net", time: "5 hr ago", type: "user" },
];

const typeColors: Record<string, string> = {
  user: "#3b82f6", plan: "#ff6d00", warning: "#ef4444", org: "#10b981",
};

export default function SuperAdminDashboard() {
  const totalUsers = companyTenants.reduce((a, c) => a + c.userCount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Platform Overview</h1>
        <p className="text-zinc-500 text-sm mt-1">Real-time oversight across all tenants and infrastructure.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={totalUsers.toLocaleString()} icon={Users} trend="+8%" trendUp color="#3b82f6" />
        <StatCard title="Organizations" value={companyTenants.length} icon={Building2} trend="+3" trendUp color="#10b981" />
        <StatCard title="Active Plans" value="4" icon={CreditCard} color="#ff6d00" />
        <StatCard title="System Status" value="Healthy" icon={Activity} trend="99.9%" trendUp color="#22c55e" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity feed */}
        <div className="lg:col-span-2 rounded-xl bg-[#1a1a1a] border border-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white text-sm">Recent Activity</h2>
            <span className="text-xs text-zinc-500">Last 24 hours</span>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: typeColors[item.type] }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-medium">{item.event}</div>
                  <div className="text-xs text-zinc-500 truncate">{item.user}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-zinc-600 shrink-0">
                  <Clock className="h-3 w-3" />
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top orgs */}
        <div className="rounded-xl bg-[#1a1a1a] border border-white/10 p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-[#ff6d00]" />
            <h2 className="font-bold text-white text-sm">Top Organizations</h2>
          </div>
          <div className="space-y-3">
            {companyTenants.slice(0, 5).map((c, i) => (
              <div key={c.id} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#ff6d00]/10 flex items-center justify-center text-xs font-bold text-[#ff6d00] shrink-0">
                  {c.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-white truncate">{c.name}</div>
                  <div className="text-[10px] text-zinc-500">{c.activeShipments} shipments</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <ArrowUpRight className="h-3 w-3" />
                  {c.userCount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Companies table */}
      <div className="rounded-xl bg-[#1a1a1a] border border-white/10 overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h2 className="font-bold text-white text-sm">All Organizations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {["Organization", "Industry", "Users", "Shipments", "Status"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {companyTenants.map((c) => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#ff6d00]/10 flex items-center justify-center text-xs font-bold text-[#ff6d00]">{c.name[0]}</div>
                      <span className="font-medium text-white">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-zinc-400">{c.industry}</td>
                  <td className="px-5 py-3 text-zinc-300">{c.userCount}</td>
                  <td className="px-5 py-3 text-zinc-300">{c.activeShipments}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${c.status === "active" ? "bg-green-500/10 text-green-400" : c.status === "trial" ? "bg-blue-500/10 text-blue-400" : "bg-red-500/10 text-red-400"}`}>
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
