"use client";
import { useState } from "react";
import { Search, Ban, CheckCircle, Eye, Building2, AlertCircle } from "lucide-react";
import { companyTenants } from "@/mock";
import SAModal from "@/components/superadmin/SAModal";
import StatCard from "@/components/superadmin/StatCard";
import { useToast } from "@/components/ui/Toast";

const plans = ["Starter", "Professional", "Business", "Enterprise"];
const selectCls = "w-full h-10 px-3 rounded-lg text-sm text-slate-800 bg-white border border-slate-300 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all";

export default function OrganizationsPage() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(companyTenants.map(c => ({ ...c, plan: "Professional" })));
  const [viewOrg, setViewOrg] = useState<typeof items[0] | null>(null);
  const [assignOrg, setAssignOrg] = useState<typeof items[0] | null>(null);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [planError, setPlanError] = useState("");
  const { success, warning } = useToast();

  const toggle = (id: string) => {
    const org = items.find(c => c.id === id);
    setItems(prev => prev.map(c => c.id === id ? { ...c, status: c.status === "active" ? "suspended" : "active" } : c));
    if (org) org.status === "active" ? warning("Suspended", `"${org.name}" has been suspended.`) : success("Activated", `"${org.name}" is now active.`);
  };

  const savePlan = () => {
    if (!selectedPlan) { setPlanError("Please select a plan"); return; }
    if (assignOrg) {
      setItems(prev => prev.map(c => c.id === assignOrg.id ? { ...c, plan: selectedPlan } : c));
      success("Plan assigned", `"${selectedPlan}" assigned to ${assignOrg.name}.`);
      setAssignOrg(null); setPlanError("");
    }
  };

  const filtered = items.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Organizations</h1>
        <p className="text-slate-500 mt-1 font-medium">Manage all tenant organizations on the platform.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Orgs" value={items.length} icon={Building2} color="#10b981" />
        <StatCard title="Active" value={items.filter(c => c.status === "active").length} icon={CheckCircle} trend="↑" trendUp color="#2563eb" />
        <StatCard title="Suspended" value={items.filter(c => c.status === "suspended").length} icon={Ban} color="#ef4444" />
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search organizations..."
          className="w-full h-10 pl-9 pr-4 rounded-xl text-sm text-slate-700 bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all" />
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50"><tr>{["Organization", "Plan", "Users", "Status", "Actions"].map(h => <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(org => (
                <tr key={org.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-700">{org.name[0]}</div><div><div className="font-medium text-slate-800">{org.name}</div><div className="text-xs text-slate-400">{org.industry}</div></div></div></td>
                  <td className="px-5 py-3"><span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-50 text-blue-700 border border-blue-100">{org.plan}</span></td>
                  <td className="px-5 py-3 text-slate-600">{org.userCount}</td>
                  <td className="px-5 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${org.status === "active" ? "bg-green-50 text-green-700" : org.status === "trial" ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-600"}`}>{org.status}</span></td>
                  <td className="px-5 py-3"><div className="flex items-center gap-2">
                    <button onClick={() => setViewOrg(org)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"><Eye className="h-4 w-4" /></button>
                    <button onClick={() => { setAssignOrg(org); setSelectedPlan(org.plan); setPlanError(""); }} className="px-2 py-1 rounded-lg text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-100 transition-colors">Plan</button>
                    <button onClick={() => toggle(org.id)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-all">{org.status === "active" ? <Ban className="h-4 w-4 hover:text-red-500" /> : <CheckCircle className="h-4 w-4 hover:text-green-600" />}</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SAModal open={!!viewOrg} onClose={() => setViewOrg(null)} title="Organization Details">
        {viewOrg && <div className="space-y-3 text-sm">
          {[["Name", viewOrg.name], ["Industry", viewOrg.industry], ["Status", viewOrg.status], ["Users", viewOrg.userCount], ["Active Shipments", viewOrg.activeShipments], ["Total Spend", `$${viewOrg.totalSpend.toLocaleString()}`], ["Plan", viewOrg.plan]].map(([k, v]) => (
            <div key={String(k)} className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-500">{k}</span><span className="text-slate-800 font-medium">{String(v)}</span>
            </div>
          ))}
        </div>}
      </SAModal>

      <SAModal open={!!assignOrg} onClose={() => { setAssignOrg(null); setPlanError(""); }} title="Assign Plan" width="max-w-sm">
        <div className="space-y-4">
          <p className="text-sm text-slate-600">Select a plan for <span className="font-semibold text-slate-800">{assignOrg?.name}</span></p>
          <div>
            <select value={selectedPlan} onChange={e => { setSelectedPlan(e.target.value); setPlanError(""); }} className={selectCls} style={{ colorScheme: "light" }}>
              <option value="">Select a plan...</option>
              {plans.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            {planError && <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><AlertCircle className="h-3 w-3" />{planError}</p>}
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button onClick={() => { setAssignOrg(null); setPlanError(""); }} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
            <button onClick={savePlan} className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">Assign Plan</button>
          </div>
        </div>
      </SAModal>
    </div>
  );
}
