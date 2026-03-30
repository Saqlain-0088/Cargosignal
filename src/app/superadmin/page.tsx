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
  user: "#2563eb", plan: "#2563eb", warning: "#f59e0b", org: "#10b981",
};

export default function SuperAdminDashboard() {
  const totalUsers = companyTenants.reduce((a, c) => a + c.userCount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Platform Overview</h1>
        <p className="text-slate-500 mt-1 font-medium italic">Real-time oversight across all tenants and infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={totalUsers.toLocaleString()} icon={Users} trend="+8%" trendUp color="#2563eb" />
        <StatCard title="Organizations" value={companyTenants.length} icon={Building2} trend="+3" trendUp color="#10b981" />
        <StatCard title="Active Plans" value="4" icon={CreditCard} color="#2563eb" />
        <StatCard title="System Status" value="Healthy" icon={Activity} trend="99.9%" trendUp color="#10b981" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800 text-sm">Recent Activity</h2>
            <span className="text-xs text-slate-400">Last 24 hours</span>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0">
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: typeColors[item.type] }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-700 font-medium">{item.event}</div>
                  <div className="text-xs text-slate-400 truncate">{item.user}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 shrink-0">
                  <Clock className="h-3 w-3" />{item.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <h2 className="font-bold text-slate-800 text-sm">Top Organizations</h2>
          </div>
          <div className="space-y-3">
            {companyTenants.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">{c.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-700 truncate">{c.name}</div>
                  <div className="text-[10px] text-slate-400">{c.activeShipments} shipments</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <ArrowUpRight className="h-3 w-3" />{c.userCount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800 text-sm">All Organizations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Organization", "Industry", "Users", "Shipments", "Status"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {companyTenants.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-700">{c.name[0]}</div>
                      <span className="font-medium text-slate-800">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-500">{c.industry}</td>
                  <td className="px-5 py-3 text-slate-700">{c.userCount}</td>
                  <td className="px-5 py-3 text-slate-700">{c.activeShipments}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${c.status === "active" ? "bg-green-50 text-green-700" : c.status === "trial" ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-600"}`}>
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
