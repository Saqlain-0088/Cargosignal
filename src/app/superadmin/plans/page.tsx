"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, Check, X, AlertCircle } from "lucide-react";
import SAModal from "@/components/superadmin/SAModal";
import { useToast } from "@/components/ui/Toast";

interface Plan { id: string; name: string; price: number; yearlyPrice: number; description: string; usersLimit: number; apiLimit: number; storageLimit: number; features: string[]; active: boolean; }

const initialPlans: Plan[] = [
  { id: "1", name: "Starter", price: 49, yearlyPrice: 39, description: "For small teams.", usersLimit: 5, apiLimit: 1000, storageLimit: 10, features: ["Basic tracking", "Email alerts", "5 shipments/mo"], active: true },
  { id: "2", name: "Professional", price: 149, yearlyPrice: 119, description: "For growing teams.", usersLimit: 25, apiLimit: 10000, storageLimit: 100, features: ["Real-time GPS", "API access", "100 shipments/mo", "Priority support"], active: true },
  { id: "3", name: "Business", price: 399, yearlyPrice: 319, description: "For established companies.", usersLimit: 100, apiLimit: 100000, storageLimit: 500, features: ["Unlimited shipments", "Custom integrations", "SLA guarantee"], active: true },
  { id: "4", name: "Enterprise", price: 999, yearlyPrice: 799, description: "Custom enterprise solutions.", usersLimit: 999, apiLimit: 999999, storageLimit: 2000, features: ["White-label", "Custom AI", "24/7 support"], active: false },
];

const emptyPlan = { name: "", price: 0, yearlyPrice: 0, description: "", usersLimit: 10, apiLimit: 5000, storageLimit: 50, features: [] as string[], active: true };
const inputCls = "w-full h-10 px-3 rounded-lg text-sm text-slate-800 bg-white border border-slate-300 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all";
const errInputCls = "w-full h-10 px-3 rounded-lg text-sm text-slate-800 bg-white border border-red-400 outline-none focus:ring-2 focus:ring-red-100 transition-all";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><AlertCircle className="h-3 w-3" />{msg}</p>;
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Plan | null>(null);
  const [form, setForm] = useState(emptyPlan);
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
    if (form.usersLimit < 1) errs.usersLimit = "Must be at least 1";
    if (form.apiLimit < 100) errs.apiLimit = "Must be at least 100";
    if (form.storageLimit < 1) errs.storageLimit = "Must be at least 1 GB";
    if (form.features.length === 0) errs.features = "Add at least one feature";
    return errs;
  };

  const openCreate = () => { setEditing(null); setForm(emptyPlan); setFormErrors({}); setFeatureInput(""); setModalOpen(true); };
  const openEdit = (p: Plan) => { setEditing(p); setForm({ name: p.name, price: p.price, yearlyPrice: p.yearlyPrice, description: p.description, usersLimit: p.usersLimit, apiLimit: p.apiLimit, storageLimit: p.storageLimit, features: [...p.features], active: p.active }); setFormErrors({}); setFeatureInput(""); setModalOpen(true); };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setFormErrors(errs); error("Validation failed", "Please fix the highlighted fields."); return; }
    if (editing) {
      setPlans(prev => prev.map(p => p.id === editing.id ? { ...form, id: editing.id } : p));
      success("Plan updated!", `"${form.name}" has been updated.`);
    } else {
      if (plans.find(p => p.name.toLowerCase() === form.name.toLowerCase())) { setFormErrors({ name: "A plan with this name already exists" }); error("Duplicate plan", "A plan with this name already exists."); return; }
      setPlans(prev => [...prev, { ...form, id: Date.now().toString() }]);
      success("Plan created!", `"${form.name}" has been created.`);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const plan = plans.find(p => p.id === id);
    setPlans(prev => prev.filter(p => p.id !== id));
    setDeleteId(null);
    success("Plan deleted", `"${plan?.name}" has been deleted.`);
  };

  const toggleActive = (id: string) => {
    const plan = plans.find(p => p.id === id);
    setPlans(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
    if (plan) plan.active ? warning("Plan deactivated", `"${plan.name}" is now inactive.`) : success("Plan activated", `"${plan.name}" is now active.`);
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    if (form.features.includes(featureInput.trim())) { warning("Duplicate", "This feature already exists."); return; }
    setForm(f => ({ ...f, features: [...f.features, featureInput.trim()] }));
    setFeatureInput("");
    if (formErrors.features) setFormErrors(e => ({ ...e, features: "" }));
  };

  const setField = (field: string, value: unknown) => { setForm(f => ({ ...f, [field]: value })); if (formErrors[field]) setFormErrors(e => ({ ...e, [field]: "" })); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Plans</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage subscription plans and pricing.</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="h-4 w-4" /> Create Plan
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>{["Plan", "Price", "Yearly", "Users", "API Limit", "Status", "Actions"].map(h => <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4"><div className="font-semibold text-slate-800">{plan.name}</div><div className="text-xs text-slate-400 mt-0.5">{plan.description}</div></td>
                  <td className="px-5 py-4 font-bold text-slate-800">${plan.price}<span className="text-xs font-normal text-slate-400">/mo</span></td>
                  <td className="px-5 py-4 text-slate-600">${plan.yearlyPrice}/mo</td>
                  <td className="px-5 py-4 text-slate-600">{plan.usersLimit >= 999 ? "Unlimited" : plan.usersLimit}</td>
                  <td className="px-5 py-4 text-slate-600">{plan.apiLimit >= 999999 ? "Unlimited" : plan.apiLimit.toLocaleString()}</td>
                  <td className="px-5 py-4"><span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${plan.active ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"}`}>{plan.active ? "Active" : "Inactive"}</span></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleActive(plan.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all" title="Toggle">
                        {plan.active ? <ToggleRight className="h-4 w-4 text-green-600" /> : <ToggleLeft className="h-4 w-4" />}
                      </button>
                      <button onClick={() => openEdit(plan)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"><Edit2 className="h-4 w-4" /></button>
                      <button onClick={() => setDeleteId(plan.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SAModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Plan" : "Create Plan"} width="max-w-xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Plan Name *</label><input value={form.name} onChange={e => setField("name", e.target.value)} className={formErrors.name ? errInputCls : inputCls} placeholder="e.g. Professional" /><FieldError msg={formErrors.name} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Description *</label><input value={form.description} onChange={e => setField("description", e.target.value)} className={formErrors.description ? errInputCls : inputCls} placeholder="Short description" /><FieldError msg={formErrors.description} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Monthly Price ($) *</label><input type="number" value={form.price} onChange={e => setField("price", +e.target.value)} className={formErrors.price ? errInputCls : inputCls} min="1" /><FieldError msg={formErrors.price} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Yearly Price ($) *</label><input type="number" value={form.yearlyPrice} onChange={e => setField("yearlyPrice", +e.target.value)} className={formErrors.yearlyPrice ? errInputCls : inputCls} min="1" /><FieldError msg={formErrors.yearlyPrice} /></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Users Limit *</label><input type="number" value={form.usersLimit} onChange={e => setField("usersLimit", +e.target.value)} className={formErrors.usersLimit ? errInputCls : inputCls} min="1" /><FieldError msg={formErrors.usersLimit} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">API Limit *</label><input type="number" value={form.apiLimit} onChange={e => setField("apiLimit", +e.target.value)} className={formErrors.apiLimit ? errInputCls : inputCls} min="100" /><FieldError msg={formErrors.apiLimit} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Storage (GB) *</label><input type="number" value={form.storageLimit} onChange={e => setField("storageLimit", +e.target.value)} className={formErrors.storageLimit ? errInputCls : inputCls} min="1" /><FieldError msg={formErrors.storageLimit} /></div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Features *</label>
            <div className="flex gap-2 mb-2">
              <input value={featureInput} onChange={e => setFeatureInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }} className={inputCls} placeholder="Add feature and press Enter" />
              <button onClick={addFeature} className="px-3 h-10 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors">Add</button>
            </div>
            <FieldError msg={formErrors.features} />
            <div className="flex flex-wrap gap-2 mt-2">
              {form.features.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-100">
                  <Check className="h-3 w-3" />{f}
                  <button onClick={() => setForm(f2 => ({ ...f2, features: f2.features.filter((_, idx) => idx !== i) }))} className="text-slate-400 hover:text-red-500 ml-0.5"><X className="h-3 w-3" /></button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-slate-600">Active</label>
            <button onClick={() => setField("active", !form.active)} className={`w-10 h-5 rounded-full transition-colors relative ${form.active ? "bg-blue-600" : "bg-slate-200"}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.active ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">{editing ? "Save Changes" : "Create Plan"}</button>
          </div>
        </div>
      </SAModal>

      <SAModal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Plan" width="max-w-sm">
        <p className="text-sm text-slate-600 mb-5">Are you sure you want to delete this plan? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
          <button onClick={() => deleteId && handleDelete(deleteId)} className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors">Delete</button>
        </div>
      </SAModal>
    </div>
  );
}
