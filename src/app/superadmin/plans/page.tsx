"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, Check, X } from "lucide-react";
import SAModal from "@/components/superadmin/SAModal";
import { Button } from "@/components/ui/Button";

interface Plan {
  id: string;
  name: string;
  price: number;
  yearlyPrice: number;
  description: string;
  usersLimit: number;
  apiLimit: number;
  storageLimit: number;
  features: string[];
  active: boolean;
}

const initialPlans: Plan[] = [
  { id: "1", name: "Starter", price: 49, yearlyPrice: 39, description: "For small teams getting started.", usersLimit: 5, apiLimit: 1000, storageLimit: 10, features: ["Basic tracking", "Email alerts", "5 shipments/mo"], active: true },
  { id: "2", name: "Professional", price: 149, yearlyPrice: 119, description: "For growing logistics teams.", usersLimit: 25, apiLimit: 10000, storageLimit: 100, features: ["Real-time GPS", "API access", "100 shipments/mo", "Priority support"], active: true },
  { id: "3", name: "Business", price: 399, yearlyPrice: 319, description: "For established logistics companies.", usersLimit: 100, apiLimit: 100000, storageLimit: 500, features: ["Unlimited shipments", "Custom integrations", "SLA guarantee", "Dedicated manager"], active: true },
  { id: "4", name: "Enterprise", price: 999, yearlyPrice: 799, description: "Custom solutions for large enterprises.", usersLimit: 999, apiLimit: 999999, storageLimit: 2000, features: ["White-label", "Custom AI", "On-premise option", "24/7 support"], active: false },
];

const emptyPlan: Omit<Plan, "id"> = {
  name: "", price: 0, yearlyPrice: 0, description: "", usersLimit: 10, apiLimit: 5000, storageLimit: 50, features: [], active: true,
};

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Plan | null>(null);
  const [form, setForm] = useState<Omit<Plan, "id">>(emptyPlan);
  const [featureInput, setFeatureInput] = useState("");

  const openCreate = () => { setEditing(null); setForm(emptyPlan); setFeatureInput(""); setModalOpen(true); };
  const openEdit = (p: Plan) => { setEditing(p); setForm({ name: p.name, price: p.price, yearlyPrice: p.yearlyPrice, description: p.description, usersLimit: p.usersLimit, apiLimit: p.apiLimit, storageLimit: p.storageLimit, features: [...p.features], active: p.active }); setFeatureInput(""); setModalOpen(true); };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setPlans(prev => prev.map(p => p.id === editing.id ? { ...form, id: editing.id } : p));
    } else {
      setPlans(prev => [...prev, { ...form, id: Date.now().toString() }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => { setPlans(prev => prev.filter(p => p.id !== id)); setDeleteId(null); };
  const toggleActive = (id: string) => setPlans(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));

  const addFeature = () => {
    if (featureInput.trim()) { setForm(f => ({ ...f, features: [...f.features, featureInput.trim()] })); setFeatureInput(""); }
  };
  const removeFeature = (i: number) => setForm(f => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Plans</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage subscription plans and pricing.</p>
        </div>
        <Button variant="accent" className="gap-2" onClick={openCreate}>
          <Plus className="h-4 w-4" /> Create Plan
        </Button>
      </div>

      {/* Plans table */}
      <div className="rounded-xl bg-[#1a1a1a] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {["Plan", "Price", "Yearly", "Users Limit", "API Limit", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="px-5 py-4">
                    <div>
                      <div className="font-semibold text-white">{plan.name}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{plan.description}</div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-white font-bold">${plan.price}<span className="text-zinc-500 font-normal text-xs">/mo</span></td>
                  <td className="px-5 py-4 text-zinc-300">${plan.yearlyPrice}<span className="text-zinc-500 text-xs">/mo</span></td>
                  <td className="px-5 py-4 text-zinc-300">{plan.usersLimit === 999 ? "Unlimited" : plan.usersLimit}</td>
                  <td className="px-5 py-4 text-zinc-300">{plan.apiLimit >= 999999 ? "Unlimited" : plan.apiLimit.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${plan.active ? "bg-green-500/10 text-green-400" : "bg-zinc-500/10 text-zinc-400"}`}>
                      {plan.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleActive(plan.id)} className="p-1.5 rounded-lg text-zinc-400 hover:text-[#ff6d00] hover:bg-[#ff6d00]/10 transition-all" title="Toggle active">
                        {plan.active ? <ToggleRight className="h-4 w-4 text-green-400" /> : <ToggleLeft className="h-4 w-4" />}
                      </button>
                      <button onClick={() => openEdit(plan)} className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteId(plan.id)} className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <SAModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Plan" : "Create Plan"} width="max-w-xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Plan Name *</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full h-10 px-3 rounded-lg text-sm text-white bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" placeholder="e.g. Professional" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Description</label>
              <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full h-10 px-3 rounded-lg text-sm text-white bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" placeholder="Short description" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Monthly Price ($)</label>
              <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: +e.target.value }))}
                className="w-full h-10 px-3 rounded-lg text-sm text-white bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Yearly Price ($)</label>
              <input type="number" value={form.yearlyPrice} onChange={e => setForm(f => ({ ...f, yearlyPrice: +e.target.value }))}
                className="w-full h-10 px-3 rounded-lg text-sm text-white bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Users Limit</label>
              <input type="number" value={form.usersLimit} onChange={e => setForm(f => ({ ...f, usersLimit: +e.target.value }))}
                className="w-full h-10 px-3 rounded-lg text-sm text-white bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">API Limit</label>
              <input type="number" value={form.apiLimit} onChange={e => setForm(f => ({ ...f, apiLimit: +e.target.value }))}
                className="w-full h-10 px-3 rounded-lg text-sm text-white bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Storage (GB)</label>
              <input type="number" value={form.storageLimit} onChange={e => setForm(f => ({ ...f, storageLimit: +e.target.value }))}
                className="w-full h-10 px-3 rounded-lg text-sm text-white bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Features</label>
            <div className="flex gap-2 mb-2">
              <input value={featureInput} onChange={e => setFeatureInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }}
                className="flex-1 h-10 px-3 rounded-lg text-sm text-white bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" placeholder="Add feature and press Enter" />
              <button onClick={addFeature} className="px-3 h-10 rounded-lg bg-[#ff6d00]/10 text-[#ff6d00] hover:bg-[#ff6d00]/20 transition-colors text-sm font-medium">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.features.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">
                  <Check className="h-3 w-3 text-[#ff6d00]" />
                  {f}
                  <button onClick={() => removeFeature(i)} className="text-zinc-500 hover:text-red-400 ml-0.5"><X className="h-3 w-3" /></button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs font-medium text-zinc-400">Active</label>
            <button onClick={() => setForm(f => ({ ...f, active: !f.active }))}
              className={`w-10 h-5 rounded-full transition-colors relative ${form.active ? "bg-[#ff6d00]" : "bg-white/10"}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.active ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
            <Button variant="dark-outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="accent" onClick={handleSave}>{editing ? "Save Changes" : "Create Plan"}</Button>
          </div>
        </div>
      </SAModal>

      {/* Delete confirm */}
      <SAModal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Plan" width="max-w-sm">
        <p className="text-zinc-400 text-sm mb-5">Are you sure you want to delete this plan? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <Button variant="dark-outline" onClick={() => setDeleteId(null)}>Cancel</Button>
          <button onClick={() => deleteId && handleDelete(deleteId)} className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </SAModal>
    </div>
  );
}
