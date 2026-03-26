"use client";
import { useState } from "react";
import { Search, Ban, CheckCircle, Eye, Building2 } from "lucide-react";
import { companyTenants } from "@/mock";
import SAModal from "@/components/superadmin/SAModal";
import { Button } from "@/components/ui/Button";
import StatCard from "@/components/superadmin/StatCard";

const plans = ["Starter", "Professional", "Business", "Enterprise"];

export default function OrganizationsPage() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(companyTenants.map(c => ({ ...c, plan: "Professional" })));
  const [viewOrg, setViewOrg] = useState<typeof items[0] | null>(null);
  const [assignPlan, setAssignPlan] = useState<typeof items[0] | null>(null);
  const [selectedPlan, setSelectedPlan] = useState("");

  const toggle = (id: string) => setItems(prev => prev.map(c => c.id === id ? { ...c, status: c.status === "active" ? "suspended" : "active" } : c));
  const savePlan = () => { if (assignOrg && selectedPlan) { setItems(prev => prev.map(c => c.id === assignOrg.id ? { ...c, plan: selectedPlan } : c)); setAssignPlan(null); } };
  const assignOrg = assignPlan;

  const filtered = items.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-extrabold text-white">Organizations</h1><p className="text-zinc-500 text-sm mt-1">Manage all tenant organizations on the platform.</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Orgs" value={items.length} icon={Building2} color="#10b981" />
        <StatCard title="Active" value={items.filter(c => c.status === "active").length} icon={CheckCircle} trend="↑" trendUp color="#3b82f6" />
        <StatCard title="Suspended" value={items.filter(c => c.status === "suspended").length} icon={Ban} color="#ef4444" />
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search organizations..." className="w-full h-10 pl-9 pr-4 rounded-lg text-sm text-white placeholder:text-zinc-600 bg-[#1a1a1a] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" />
      </div>
      <div className="rounded-xl bg-[#1a1a1a] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/10">{["Organization","Plan","Users","Status","Actions"].map(h => <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map(org => (
                <tr key={org.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-[#ff6d00]/10 flex items-center justify-center text-xs font-bold text-[#ff6d00]">{org.name[0]}</div><div><div className="font-medium text-white">{org.name}</div><div className="text-xs text-zinc-500">{org.industry}</div></div></div></td>
                  <td className="px-5 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-[#ff6d00]/10 text-[#ff6d00] font-medium">{org.plan}</span></td>
                  <td className="px-5 py-3 text-zinc-300">{org.userCount}</td>
                  <td className="px-5 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${org.status === "active" ? "bg-green-500/10 text-green-400" : org.status === "trial" ? "bg-blue-500/10 text-blue-400" : "bg-red-500/10 text-red-400"}`}>{org.status}</span></td>
                  <td className="px-5 py-3"><div className="flex items-center gap-2">
                    <button onClick={() => setViewOrg(org)} className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-all"><Eye className="h-4 w-4" /></button>
                    <button onClick={() => { setAssignPlan(org); setSelectedPlan(org.plan); }} className="p-1.5 rounded-lg text-zinc-400 hover:text-[#ff6d00] hover:bg-[#ff6d00]/10 transition-all text-xs font-medium px-2">Plan</button>
                    <button onClick={() => toggle(org.id)} className={`p-1.5 rounded-lg transition-all ${org.status === "active" ? "text-zinc-400 hover:text-red-400 hover:bg-red-500/10" : "text-zinc-400 hover:text-green-400 hover:bg-green-500/10"}`}>{org.status === "active" ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <SAModal open={!!viewOrg} onClose={() => setViewOrg(null)} title="Organization Details">
        {viewOrg && <div className="space-y-3 text-sm">
          {[["Name", viewOrg.name], ["Industry", viewOrg.industry], ["Status", viewOrg.status], ["Users", viewOrg.userCount], ["Active Shipments", viewOrg.activeShipments], ["Total Spend", `$${viewOrg.totalSpend.toLocaleString()}`], ["Plan", viewOrg.plan]].map(([k, v]) => (
            <div key={String(k)} className="flex justify-between py-2 border-b border-white/5">
              <span className="text-zinc-500">{k}</span>
              <span className="text-white font-medium">{String(v)}</span>
            </div>
          ))}
        </div>}
      </SAModal>

      {/* Assign Plan Modal */}
      <SAModal open={!!assignPlan} onClose={() => setAssignPlan(null)} title="Assign Plan" width="max-w-sm">
        <div className="space-y-4">
          <p className="text-sm text-zinc-400">Select a plan for <span className="text-white font-medium">{assignOrg?.name}</span></p>
          <select value={selectedPlan} onChange={e => setSelectedPlan(e.target.value)} className="w-full h-10 px-3 rounded-lg text-sm text-white bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]">
            {plans.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
            <Button variant="dark-outline" onClick={() => setAssignPlan(null)}>Cancel</Button>
            <Button variant="accent" onClick={savePlan}>Assign Plan</Button>
          </div>
        </div>
      </SAModal>
    </div>
  );
}
