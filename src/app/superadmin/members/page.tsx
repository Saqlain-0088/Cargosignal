"use client";
import { useState } from "react";
import { Plus, Edit2, UserCheck, UserX, Users, Shield, AlertCircle } from "lucide-react";
import { useAdminAuth, AdminMember, Permission } from "@/context/AdminAuthContext";
import SAModal from "@/components/superadmin/SAModal";
import StatCard from "@/components/superadmin/StatCard";
import { useToast } from "@/components/ui/Toast";

const inputCls = "w-full h-10 px-3 rounded-lg text-sm text-slate-800 bg-white border border-slate-300 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all";
const errInputCls = "w-full h-10 px-3 rounded-lg text-sm text-slate-800 bg-white border border-red-400 outline-none focus:ring-2 focus:ring-red-100 transition-all";
const selectCls = "w-full h-10 px-3 rounded-lg text-sm text-slate-800 bg-white border border-slate-300 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><AlertCircle className="h-3 w-3" />{msg}</p>;
}

export default function MembersPage() {
  const { members, setMembers, roles, currentRole } = useAdminAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminMember | null>(null);
  const [form, setForm] = useState<{ name: string; email: string; roleId: string; status: "active" | "inactive" }>({ name: "", email: "", roleId: "viewer", status: "active" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { success, warning, error } = useToast();
  const canManage = currentRole?.permissions.includes("members" as Permission) ?? false;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    else if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email address";
    else if (!editing && members.find(m => m.email.toLowerCase() === form.email.toLowerCase())) errs.email = "This email is already registered";
    return errs;
  };

  const openCreate = () => { setEditing(null); setForm({ name: "", email: "", roleId: "viewer", status: "active" }); setFormErrors({}); setModalOpen(true); };
  const openEdit = (m: AdminMember) => { setEditing(m); setForm({ name: m.name, email: m.email, roleId: m.roleId, status: m.status }); setFormErrors({}); setModalOpen(true); };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setFormErrors(errs); error("Validation failed", "Please fix the highlighted fields."); return; }
    if (editing) {
      setMembers(members.map(m => m.id === editing.id ? { ...m, ...form } : m));
      success("Member updated!", `${form.name}'s details have been updated.`);
    } else {
      setMembers([...members, { ...form, id: Date.now().toString(), joinedAt: new Date().toISOString().split("T")[0] }]);
      success("Member added!", `${form.name} has been added.`);
    }
    setModalOpen(false);
  };

  const toggleStatus = (id: string) => {
    const member = members.find(m => m.id === id);
    setMembers(members.map(m => m.id === id ? { ...m, status: m.status === "active" ? "inactive" : "active" } : m));
    if (member) member.status === "active" ? warning("Member deactivated", `${member.name} has been deactivated.`) : success("Member activated", `${member.name} is now active.`);
  };

  const setField = (field: string, value: string) => { setForm(f => ({ ...f, [field]: value })); if (formErrors[field]) setFormErrors(e => ({ ...e, [field]: "" })); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Members</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage admin panel members and their roles.</p>
        </div>
        {canManage && <button onClick={openCreate} className="flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"><Plus className="h-4 w-4" /> Add Member</button>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Members" value={members.length} icon={Users} color="#2563eb" />
        <StatCard title="Active" value={members.filter(m => m.status === "active").length} icon={UserCheck} trendUp color="#10b981" />
        <StatCard title="Roles Defined" value={roles.length} icon={Shield} color="#2563eb" />
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50"><tr>{["Member", "Email", "Role", "Status", "Joined", "Actions"].map(h => <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-50">
              {members.map(member => {
                const role = roles.find(r => r.id === member.roleId);
                return (
                  <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">{member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</div><span className="font-medium text-slate-800">{member.name}</span></div></td>
                    <td className="px-5 py-3 text-slate-500">{member.email}</td>
                    <td className="px-5 py-3">{role && <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase" style={{ background: role.color + "15", color: role.color }}>{role.name}</span>}</td>
                    <td className="px-5 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${member.status === "active" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"}`}>{member.status}</span></td>
                    <td className="px-5 py-3 text-xs text-slate-400">{member.joinedAt}</td>
                    <td className="px-5 py-3">{canManage && <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(member)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"><Edit2 className="h-4 w-4" /></button>
                      <button onClick={() => toggleStatus(member.id)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-all">{member.status === "active" ? <UserX className="h-4 w-4 hover:text-red-500" /> : <UserCheck className="h-4 w-4 hover:text-green-600" />}</button>
                    </div>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <SAModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Member" : "Add Member"} width="max-w-md">
        <div className="space-y-4">
          <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name *</label><input value={form.name} onChange={e => setField("name", e.target.value)} className={formErrors.name ? errInputCls : inputCls} placeholder="John Doe" /><FieldError msg={formErrors.name} /></div>
          <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Email *</label><input type="email" value={form.email} onChange={e => setField("email", e.target.value)} className={formErrors.email ? errInputCls : inputCls} placeholder="john@cargosignal.com" /><FieldError msg={formErrors.email} /></div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Role</label>
            {/* Native select with explicit light styling — fixes white dropdown issue */}
            <select value={form.roleId} onChange={e => setField("roleId", e.target.value)} className={selectCls} style={{ colorScheme: "light" }}>
              {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-slate-600">Active</label>
            <button onClick={() => setForm(f => ({ ...f, status: f.status === "active" ? "inactive" : "active" }))} className={`w-10 h-5 rounded-full transition-colors relative ${form.status === "active" ? "bg-blue-600" : "bg-slate-200"}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.status === "active" ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">{editing ? "Save Changes" : "Add Member"}</button>
          </div>
        </div>
      </SAModal>
    </div>
  );
}
