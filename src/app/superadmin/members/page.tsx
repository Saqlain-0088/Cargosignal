"use client";
import { useState } from "react";
import { Plus, Edit2, UserCheck, UserX, Users, Shield, AlertCircle } from "lucide-react";
import { useAdminAuth, AdminMember, Permission } from "@/context/AdminAuthContext";
import SAModal from "@/components/superadmin/SAModal";
import StatCard from "@/components/superadmin/StatCard";
import { useToast } from "@/components/ui/Toast";

const SA_STYLE = { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(59,130,246,0.12)" };
const inputStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(59,130,246,0.2)" };

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="flex items-center gap-1 text-xs text-red-400 mt-1"><AlertCircle className="h-3 w-3" />{msg}</p>;
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
      success("Member added!", `${form.name} has been added to the panel.`);
    }
    setModalOpen(false);
  };

  const toggleStatus = (id: string) => {
    const member = members.find(m => m.id === id);
    setMembers(members.map(m => m.id === id ? { ...m, status: m.status === "active" ? "inactive" : "active" } : m));
    if (member) {
      member.status === "active"
        ? warning("Member deactivated", `${member.name} has been deactivated.`)
        : success("Member activated", `${member.name} is now active.`);
    }
  };

  const setField = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    if (formErrors[field]) setFormErrors(e => ({ ...e, [field]: "" }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Members</h1>
          <p className="text-sm mt-1" style={{ color: "#64748b" }}>Manage admin panel members and their roles.</p>
        </div>
        {canManage && (
          <button onClick={openCreate} className="flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 16px rgba(37,99,235,0.3)" }}>
            <Plus className="h-4 w-4" /> Add Member
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Members" value={members.length} icon={Users} color="#3b82f6" />
        <StatCard title="Active" value={members.filter(m => m.status === "active").length} icon={UserCheck} trendUp color="#34d399" />
        <StatCard title="Roles Defined" value={roles.length} icon={Shield} color="#60a5fa" />
      </div>
      <div className="rounded-xl border overflow-hidden" style={SA_STYLE}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(59,130,246,0.12)" }}>
                {["Member", "Email", "Role", "Status", "Joined", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map(member => {
                const role = roles.find(r => r.id === member.roleId);
                return (
                  <tr key={member.id} className="transition-colors" style={{ borderBottom: "1px solid rgba(59,130,246,0.06)" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,130,246,0.04)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "")}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ background: role?.color ? role.color + "30" : "rgba(37,99,235,0.2)", border: `1px solid ${role?.color ?? "#3b82f6"}40` }}>
                          {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="font-medium text-white">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3" style={{ color: "#94a3b8" }}>{member.email}</td>
                    <td className="px-5 py-3">
                      {role && <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                        style={{ background: role.color + "20", color: role.color }}>{role.name}</span>}
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                        style={member.status === "active"
                          ? { background: "rgba(52,211,153,0.12)", color: "#34d399" }
                          : { background: "rgba(100,116,139,0.12)", color: "#94a3b8" }}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs" style={{ color: "#64748b" }}>{member.joinedAt}</td>
                    <td className="px-5 py-3">
                      {canManage && (
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEdit(member)} className="p-1.5 rounded-lg text-zinc-500 hover:text-white transition-all"
                            style={{ background: "rgba(255,255,255,0.04)" }}><Edit2 className="h-4 w-4" /></button>
                          <button onClick={() => toggleStatus(member.id)} className="p-1.5 rounded-lg text-zinc-500 transition-all"
                            style={{ background: "rgba(255,255,255,0.04)" }}>
                            {member.status === "active" ? <UserX className="h-4 w-4 hover:text-red-400" /> : <UserCheck className="h-4 w-4 hover:text-green-400" />}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <SAModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Member" : "Add Member"} width="max-w-md">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Full Name *</label>
            <input value={form.name} onChange={e => setField("name", e.target.value)}
              className="w-full h-10 px-3 rounded-xl text-sm text-white outline-none"
              style={{ ...inputStyle, ...(formErrors.name ? { border: "1px solid #f87171" } : {}) }} placeholder="John Doe" />
            <FieldError msg={formErrors.name} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Email *</label>
            <input type="email" value={form.email} onChange={e => setField("email", e.target.value)}
              className="w-full h-10 px-3 rounded-xl text-sm text-white outline-none"
              style={{ ...inputStyle, ...(formErrors.email ? { border: "1px solid #f87171" } : {}) }} placeholder="john@cargosignal.com" />
            <FieldError msg={formErrors.email} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Role</label>
            <select value={form.roleId} onChange={e => setField("roleId", e.target.value)}
              className="w-full h-10 px-3 rounded-xl text-sm text-white outline-none"
              style={inputStyle}>
              {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs font-medium" style={{ color: "#94a3b8" }}>Active</label>
            <button onClick={() => setForm(f => ({ ...f, status: f.status === "active" ? "inactive" : "active" }))}
              className="w-10 h-5 rounded-full transition-colors relative"
              style={{ background: form.status === "active" ? "#2563eb" : "rgba(255,255,255,0.1)" }}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.status === "active" ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t" style={{ borderColor: "rgba(59,130,246,0.15)" }}>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 border"
              style={{ borderColor: "rgba(59,130,246,0.2)", background: "rgba(255,255,255,0.03)" }}>Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}>
              {editing ? "Save Changes" : "Add Member"}
            </button>
          </div>
        </div>
      </SAModal>
    </div>
  );
}
