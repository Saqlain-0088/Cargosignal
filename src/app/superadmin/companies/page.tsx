"use client";
import { useState } from "react";
import { Search, Ban, CheckCircle, Eye, Building2, AlertCircle } from "lucide-react";
import { companyTenants } from "@/mock";
import SAModal from "@/components/superadmin/SAModal";
import StatCard from "@/components/superadmin/StatCard";
import { useToast } from "@/components/ui/Toast";

const plans = ["Starter", "Professional", "Business", "Enterprise"];
const SA_STYLE = { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(59,130,246,0.12)" };
const inputStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(59,130,246,0.2)" };

export default function OrganizationsPage() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(companyTenants.map(c => ({ ...c, plan: "Professional" })));
  const [viewOrg, setViewOrg] = useState<typeof items[0] | null>(null);
  const [assignOrg, setAssignOrg] = useState<typeof items[0] | null>(null);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [planError, setPlanError] = useState("");
  const { success, warning, error } = useToast();

  const toggle = (id: string) => {
    const org = items.find(c => c.id === id);
    setItems(prev => prev.map(c => c.id === id ? { ...c, status: c.status === "active" ? "suspended" : "active" } : c));
    if (org) {
      org.status === "active"
        ? warning("Organization suspended", `"${org.name}" has been suspended.`)
        : success("Organization activated", `"${org.name}" is now active.`);
    }
  };

  const savePlan = () => {
    if (!selectedPlan) { setPlanError("Please select a plan"); return; }
    if (assignOrg) {
      setItems(prev => prev.map(c => c.id === assignOrg.id ? { ...c, plan: selectedPlan } : c));
      success("Plan assigned", `"${selectedPlan}" plan assigned to ${assignOrg.name}.`);
      setAssignOrg(null);
      setPlanError("");
    }
  };

  const filtered = items.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Organizations</h1>
        <p className="text-sm mt-1" style={{ color: "#64748b" }}>Manage all tenant organizations on the platform.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Orgs" value={items.length} icon={Building2} color="#34d399" />
        <StatCard title="Active" value={items.filter(c => c.status === "active").length} icon={CheckCircle} trend="↑" trendUp color="#3b82f6" />
        <StatCard title="Suspended" value={items.filter(c => c.status === "suspended").length} icon={Ban} color="#f87171" />
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search organizations..."
          className="w-full h-10 pl-9 pr-4 rounded-xl text-sm text-white placeholder:text-zinc-600 outline-none"
          style={inputStyle} />
      </div>
      <div className="rounded-xl border overflow-hidden" style={SA_STYLE}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(59,130,246,0.12)" }}>
                {["Organization", "Plan", "Users", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(org => (
                <tr key={org.id} className="transition-colors" style={{ borderBottom: "1px solid rgba(59,130,246,0.06)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,130,246,0.04)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: "rgba(37,99,235,0.2)" }}>{org.name[0]}</div>
                      <div>
                        <div className="font-medium text-white">{org.name}</div>
                        <div className="text-xs" style={{ color: "#64748b" }}>{org.industry}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "rgba(96,165,250,0.12)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.2)" }}>
                      {org.plan}
                    </span>
                  </td>
                  <td className="px-5 py-3" style={{ color: "#cbd5e1" }}>{org.userCount}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                      style={org.status === "active"
                        ? { background: "rgba(52,211,153,0.12)", color: "#34d399" }
                        : org.status === "trial"
                        ? { background: "rgba(96,165,250,0.12)", color: "#60a5fa" }
                        : { background: "rgba(239,68,68,0.12)", color: "#f87171" }}>
                      {org.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setViewOrg(org)} className="p-1.5 rounded-lg text-zinc-500 hover:text-white transition-all"
                        style={{ background: "rgba(255,255,255,0.04)" }}><Eye className="h-4 w-4" /></button>
                      <button onClick={() => { setAssignOrg(org); setSelectedPlan(org.plan); setPlanError(""); }}
                        className="px-2 py-1 rounded-lg text-xs font-medium transition-all"
                        style={{ background: "rgba(37,99,235,0.15)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }}>Plan</button>
                      <button onClick={() => toggle(org.id)} className="p-1.5 rounded-lg text-zinc-500 transition-all"
                        style={{ background: "rgba(255,255,255,0.04)" }}>
                        {org.status === "active" ? <Ban className="h-4 w-4 hover:text-red-400" /> : <CheckCircle className="h-4 w-4 hover:text-green-400" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SAModal open={!!viewOrg} onClose={() => setViewOrg(null)} title="Organization Details">
        {viewOrg && <div className="space-y-3 text-sm">
          {[["Name", viewOrg.name], ["Industry", viewOrg.industry], ["Status", viewOrg.status], ["Users", viewOrg.userCount], ["Active Shipments", viewOrg.activeShipments], ["Total Spend", `$${viewOrg.totalSpend.toLocaleString()}`], ["Plan", viewOrg.plan]].map(([k, v]) => (
            <div key={String(k)} className="flex justify-between py-2 border-b" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
              <span style={{ color: "#64748b" }}>{k}</span>
              <span className="text-white font-medium">{String(v)}</span>
            </div>
          ))}
        </div>}
      </SAModal>

      <SAModal open={!!assignOrg} onClose={() => { setAssignOrg(null); setPlanError(""); }} title="Assign Plan" width="max-w-sm">
        <div className="space-y-4">
          <p className="text-sm" style={{ color: "#94a3b8" }}>Select a plan for <span className="text-white font-medium">{assignOrg?.name}</span></p>
          <div>
            <select value={selectedPlan} onChange={e => { setSelectedPlan(e.target.value); setPlanError(""); }}
              className="w-full h-10 px-3 rounded-xl text-sm text-white outline-none"
              style={{ background: "rgba(255,255,255,0.04)", border: planError ? "1px solid #f87171" : "1px solid rgba(59,130,246,0.2)" }}>
              <option value="">Select a plan...</option>
              {plans.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            {planError && <p className="flex items-center gap-1 text-xs text-red-400 mt-1"><AlertCircle className="h-3 w-3" />{planError}</p>}
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t" style={{ borderColor: "rgba(59,130,246,0.15)" }}>
            <button onClick={() => { setAssignOrg(null); setPlanError(""); }} className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 border"
              style={{ borderColor: "rgba(59,130,246,0.2)", background: "rgba(255,255,255,0.03)" }}>Cancel</button>
            <button onClick={savePlan} className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}>Assign Plan</button>
          </div>
        </div>
      </SAModal>
    </div>
  );
}
