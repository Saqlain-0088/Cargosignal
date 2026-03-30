"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, Check, X, AlertCircle } from "lucide-react";
import SAModal from "@/components/superadmin/SAModal";
import { useToast } from "@/components/ui/Toast";

interface Plan {
  id: string; name: string; price: number; yearlyPrice: number;
  description: string; usersLimit: number; apiLimit: number;
  storageLimit: number; features: string[]; active: boolean;
}

const initialPlans: Plan[] = [
  { id: "1", name: "Starter", price: 49, yearlyPrice: 39, description: "For small teams.", usersLimit: 5, apiLimit: 1000, storageLimit: 10, features: ["Basic tracking", "Email alerts", "5 shipments/mo"], active: true },
  { id: "2", name: "Professional", price: 149, yearlyPrice: 119, description: "For growing teams.", usersLimit: 25, apiLimit: 10000, storageLimit: 100, features: ["Real-time GPS", "API access", "100 shipments/mo", "Priority support"], active: true },
  { id: "3", name: "Business", price: 399, yearlyPrice: 319, description: "For established companies.", usersLimit: 100, apiLimit: 100000, storageLimit: 500, features: ["Unlimited shipments", "Custom integrations", "SLA guarantee"], active: true },
  { id: "4", name: "Enterprise", price: 999, yearlyPrice: 799, description: "Custom enterprise solutions.", usersLimit: 999, apiLimit: 999999, storageLimit: 2000, features: ["White-label", "Custom AI", "24/7 support"], active: false },
];

const emptyPlan: Omit<Plan, "id"> = { name: "", price: 0, yearlyPrice: 0, description: "", usersLimit: 10, apiLimit: 5000, storageLimit: 50, features: [], active: true };

const SA_STYLE = { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(59,130,246,0.12)" };
const inputCls = "w-full h-10 px-3 rounded-xl text-sm text-white outline-none transition-all";
const inputStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(59,130,246,0.2)" };

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="flex items-center gap-1 text-xs text-red-400 mt-1"><AlertCircle className="h-3 w-3" />{msg}</p>;
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Plan | null>(null);
  const [form, setForm] = useState<Omit<Plan, "id">>(emptyPlan);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [featureInput, setFeatureInput] = useState("");
  const { success, error, warning } = useToast();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Plan name is required";
    else if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (form.price <= 0) errs.price = "Monthly price must be greater than 0";
    if (form.yearlyPrice <= 0) errs.yearlyPrice = "Yearly price must be greater than 0";
    if (form.yearlyPrice >= form.price) errs.yearlyPrice = "Yearly price should be less than monthly";
    if (!form.description.trim()) errs.description = "Description is required";
    if (form.usersLimit < 1) errs.usersLimit = "Users limit must be at least 1";
    if (form.apiLimit < 100) errs.apiLimit = "API limit must be at least 100";
    if (form.storageLimit < 1) errs.storageLimit = "Storage limit must be at least 1 GB";
    if (form.features.length === 0) errs.features = "Add at least one feature";
    return errs;
  };

  const openCreate = () => { setEditing(null); setForm(emptyPlan); setFormErrors({}); setFeatureInput(""); setModalOpen(true); };
  const openEdit = (p: Plan) => { setEditing(p); setForm({ name: p.name, price: p.price, yearlyPrice: p.yearlyPrice, description: p.description, usersLimit: p.usersLimit, apiLimit: p.apiLimit, storageLimit: p.storageLimit, features: [...p.features], active: p.active }); setFormErrors({}); setFeatureInput(""); setModalOpen(true); };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      error("Validation failed", "Please fix the highlighted fields.");
      return;
    }
    if (editing) {
      setPlans(prev => prev.map(p => p.id === editing.id ? { ...form, id: editing.id } : p));
      success("Plan updated!", `"${form.name}" has been updated successfully.`);
    } else {
      const duplicate = plans.find(p => p.name.toLowerCase() === form.name.toLowerCase());
      if (duplicate) { setFormErrors({ name: "A plan with this name already exists" }); error("Duplicate plan", "A plan with this name already exists."); return; }
      setPlans(prev => [...prev, { ...form, id: Date.now().toString() }]);
      success("Plan created!", `"${form.name}" has been created successfully.`);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const plan = plans.find(p => p.id === id);
    setPlans(prev => prev.filter(p => p.id !== id));
    setDeleteId(null);
    success("Plan deleted", `"${plan?.name}" has been permanently deleted.`);
  };

  const toggleActive = (id: string) => {
    const plan = plans.find(p => p.id === id);
    setPlans(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
    if (plan) {
      plan.active
        ? warning("Plan deactivated", `"${plan.name}" is now inactive.`)
        : success("Plan activated", `"${plan.name}" is now active.`);
    }
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    if (form.features.includes(featureInput.trim())) { warning("Duplicate feature", "This feature already exists."); return; }
    setForm(f => ({ ...f, features: [...f.features, featureInput.trim()] }));
    setFeatureInput("");
    if (formErrors.features) setFormErrors(e => ({ ...e, features: "" }));
  };

  const setField = (field: string, value: unknown) => {
    setForm(f => ({ ...f, [field]: value }));
    if (formErrors[field]) setFormErrors(e => ({ ...e, [field]: "" }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Plans</h1>
          <p className="text-sm mt-1" style={{ color: "#64748b" }}>Manage subscription plans and pricing.</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 16px rgba(37,99,235,0.3)" }}>
          <Plus className="h-4 w-4" /> Create Plan
        </button>
      </div>

      <div className="rounded-xl border overflow-hidden" style={SA_STYLE}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(59,130,246,0.12)" }}>
                {["Plan", "Price", "Yearly", "Users", "API Limit", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="transition-colors" style={{ borderBottom: "1px solid rgba(59,130,246,0.06)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,130,246,0.04)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-white">{plan.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#64748b" }}>{plan.description}</div>
                  </td>
                  <td className="px-5 py-4 text-white font-bold">${plan.price}<span className="text-xs font-normal" style={{ color: "#64748b" }}>/mo</span></td>
                  <td className="px-5 py-4" style={{ color: "#cbd5e1" }}>${plan.yearlyPrice}/mo</td>
                  <td className="px-5 py-4" style={{ color: "#cbd5e1" }}>{plan.usersLimit >= 999 ? "Unlimited" : plan.usersLimit}</td>
                  <td className="px-5 py-4" style={{ color: "#cbd5e1" }}>{plan.apiLimit >= 999999 ? "Unlimited" : plan.apiLimit.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                      style={plan.active ? { background: "rgba(52,211,153,0.12)", color: "#34d399" } : { background: "rgba(100,116,139,0.12)", color: "#94a3b8" }}>
                      {plan.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleActive(plan.id)} className="p-1.5 rounded-lg transition-all text-zinc-500 hover:text-white"
                        style={{ background: "rgba(255,255,255,0.04)" }} title="Toggle active">
                        {plan.active ? <ToggleRight className="h-4 w-4" style={{ color: "#34d399" }} /> : <ToggleLeft className="h-4 w-4" />}
                      </button>
                      <button onClick={() => openEdit(plan)} className="p-1.5 rounded-lg transition-all text-zinc-500 hover:text-white"
                        style={{ background: "rgba(255,255,255,0.04)" }}>
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteId(plan.id)} className="p-1.5 rounded-lg transition-all text-zinc-500 hover:text-red-400"
                        style={{ background: "rgba(255,255,255,0.04)" }}>
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
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Plan Name *</label>
              <input value={form.name} onChange={e => setField("name", e.target.value)}
                className={inputCls} style={inputStyle} placeholder="e.g. Professional" />
              <FieldError msg={formErrors.name} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Description *</label>
              <input value={form.description} onChange={e => setField("description", e.target.value)}
                className={inputCls} style={inputStyle} placeholder="Short description" />
              <FieldError msg={formErrors.description} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Monthly Price ($) *</label>
              <input type="number" value={form.price} onChange={e => setField("price", +e.target.value)}
                className={inputCls} style={inputStyle} min="1" />
              <FieldError msg={formErrors.price} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Yearly Price ($) *</label>
              <input type="number" value={form.yearlyPrice} onChange={e => setField("yearlyPrice", +e.target.value)}
                className={inputCls} style={inputStyle} min="1" />
              <FieldError msg={formErrors.yearlyPrice} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Users Limit *</label>
              <input type="number" value={form.usersLimit} onChange={e => setField("usersLimit", +e.target.value)}
                className={inputCls} style={inputStyle} min="1" />
              <FieldError msg={formErrors.usersLimit} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>API Limit *</label>
              <input type="number" value={form.apiLimit} onChange={e => setField("apiLimit", +e.target.value)}
                className={inputCls} style={inputStyle} min="100" />
              <FieldError msg={formErrors.apiLimit} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Storage (GB) *</label>
              <input type="number" value={form.storageLimit} onChange={e => setField("storageLimit", +e.target.value)}
                className={inputCls} style={inputStyle} min="1" />
              <FieldError msg={formErrors.storageLimit} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Features *</label>
            <div className="flex gap-2 mb-2">
              <input value={featureInput} onChange={e => setFeatureInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }}
                className={`flex-1 ${inputCls}`} style={inputStyle} placeholder="Add feature and press Enter" />
              <button onClick={addFeature} className="px-3 h-10 rounded-xl text-sm font-medium text-white transition-all"
                style={{ background: "rgba(37,99,235,0.2)", border: "1px solid rgba(59,130,246,0.3)" }}>Add</button>
            </div>
            <FieldError msg={formErrors.features} />
            <div className="flex flex-wrap gap-2 mt-2">
              {form.features.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                  style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: "#93c5fd" }}>
                  <Check className="h-3 w-3" style={{ color: "#60a5fa" }} />{f}
                  <button onClick={() => setForm(f2 => ({ ...f2, features: f2.features.filter((_, idx) => idx !== i) }))}
                    className="text-zinc-500 hover:text-red-400 ml-0.5"><X className="h-3 w-3" /></button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs font-medium" style={{ color: "#94a3b8" }}>Active</label>
            <button onClick={() => setField("active", !form.active)}
              className="w-10 h-5 rounded-full transition-colors relative"
              style={{ background: form.active ? "#2563eb" : "rgba(255,255,255,0.1)" }}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.active ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t" style={{ borderColor: "rgba(59,130,246,0.15)" }}>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-white transition-colors border"
              style={{ borderColor: "rgba(59,130,246,0.2)", background: "rgba(255,255,255,0.03)" }}>Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}>
              {editing ? "Save Changes" : "Create Plan"}
            </button>
          </div>
        </div>
      </SAModal>

      {/* Delete confirm */}
      <SAModal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Plan" width="max-w-sm">
        <p className="text-sm mb-5" style={{ color: "#94a3b8" }}>Are you sure you want to delete this plan? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 border"
            style={{ borderColor: "rgba(59,130,246,0.2)", background: "rgba(255,255,255,0.03)" }}>Cancel</button>
          <button onClick={() => deleteId && handleDelete(deleteId)} className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)" }}>Delete</button>
        </div>
      </SAModal>
    </div>
  );
}
