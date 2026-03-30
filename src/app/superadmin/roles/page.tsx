"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, Shield, Check, AlertCircle } from "lucide-react";
import { useAdminAuth, Role, Permission } from "@/context/AdminAuthContext";
import SAModal from "@/components/superadmin/SAModal";
import { useToast } from "@/components/ui/Toast";

const ALL_PERMISSIONS: { key: Permission; label: string; desc: string }[] = [
  { key: "dashboard", label: "Dashboard", desc: "View platform overview" },
  { key: "users", label: "Users", desc: "Manage platform users" },
  { key: "organizations", label: "Organizations", desc: "Manage tenant organizations" },
  { key: "plans", label: "Plans", desc: "Create and manage subscription plans" },
  { key: "logs", label: "Logs", desc: "View system audit logs" },
  { key: "settings", label: "Settings", desc: "Configure platform settings" },
  { key: "members", label: "Members", desc: "Manage admin panel members" },
  { key: "roles", label: "Roles", desc: "Create and manage RBAC roles" },
];

const COLORS = ["#3b82f6", "#06b6d4", "#10b981", "#8b5cf6", "#ec4899", "#f59e0b"];
const SA_STYLE = { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(59,130,246,0.12)" };
const inputStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(59,130,246,0.2)" };

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="flex items-center gap-1 text-xs text-red-400 mt-1"><AlertCircle className="h-3 w-3" />{msg}</p>;
}

export default function RolesPage() {
  const { roles, setRoles, members } = useAdminAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Role | null>(null);
  const [form, setForm] = useState({ name: "", permissions: [] as Permission[], color: COLORS[0] });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { success, error, warning } = useToast();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Role name is required";
    else if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    else if (!editing && roles.find(r => r.name.toLowerCase() === form.name.toLowerCase())) errs.name = "A role with this name already exists";
    if (form.permissions.length === 0) errs.permissions = "Select at least one permission";
    return errs;
  };

  const openCreate = () => { setEditing(null); setForm({ name: "", permissions: [], color: COLORS[0] }); setFormErrors({}); setModalOpen(true); };
  const openEdit = (r: Role) => { setEditing(r); setForm({ name: r.name, permissions: [...r.permissions], color: r.color }); setFormErrors({}); setModalOpen(true); };

  const togglePerm = (p: Permission) => {
    setForm(f => ({ ...f, permissions: f.permissions.includes(p) ? f.permissions.filter(x => x !== p) : [...f.permissions, p] }));
    if (formErrors.permissions) setFormErrors(e => ({ ...e, permissions: "" }));
  };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setFormErrors(errs); error("Validation failed", "Please fix the highlighted fields."); return; }
    if (editing) {
      setRoles(roles.map(r => r.id === editing.id ? { ...r, ...form } : r));
      success("Role updated!", `"${form.name}" has been updated.`);
    } else {
      setRoles([...roles, { ...form, id: form.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now() }]);
      success("Role created!", `"${form.name}" has been created.`);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const role = roles.find(r => r.id === id);
    const inUse = members.filter(m => m.roleId === id).length;
    if (inUse > 0) { warning("Cannot delete", `This role is assigned to ${inUse} member(s). Reassign them first.`); setDeleteId(null); return; }
    setRoles(roles.filter(r => r.id !== id));
    setDeleteId(null);
    success("Role deleted", `"${role?.name}" has been deleted.`);
  };

  const memberCount = (roleId: string) => members.filter(m => m.roleId === roleId).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Roles & Permissions</h1>
          <p className="text-sm mt-1" style={{ color: "#64748b" }}>Define roles and control access to admin panel modules.</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 16px rgba(37,99,235,0.3)" }}>
          <Plus className="h-4 w-4" /> Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map(role => (
          <div key={role.id} className="rounded-xl border p-5 hover:border-blue-500/30 transition-all" style={SA_STYLE}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: role.color + "20" }}>
                  <Shield className="h-4 w-4" style={{ color: role.color }} />
                </div>
                <div>
                  <div className="font-bold text-white">{role.name}</div>
                  <div className="text-xs" style={{ color: "#64748b" }}>{memberCount(role.id)} member{memberCount(role.id) !== 1 ? "s" : ""}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(role)} className="p-1.5 rounded-lg text-zinc-500 hover:text-white transition-all"
                  style={{ background: "rgba(255,255,255,0.04)" }}><Edit2 className="h-3.5 w-3.5" /></button>
                {role.id !== "superadmin" && (
                  <button onClick={() => setDeleteId(role.id)} className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 transition-all"
                    style={{ background: "rgba(255,255,255,0.04)" }}><Trash2 className="h-3.5 w-3.5" /></button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ALL_PERMISSIONS.map(p => {
                const has = role.permissions.includes(p.key);
                return (
                  <span key={p.key} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
                    style={has
                      ? { background: "rgba(255,255,255,0.08)", color: "#cbd5e1" }
                      : { background: "rgba(255,255,255,0.03)", color: "#475569", textDecoration: "line-through" }}>
                    {has && <Check className="h-2.5 w-2.5" style={{ color: role.color }} />}
                    {p.label}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Matrix */}
      <div className="rounded-xl border overflow-hidden" style={SA_STYLE}>
        <div className="p-5 border-b" style={{ borderColor: "rgba(59,130,246,0.12)" }}>
          <h2 className="font-bold text-white text-sm">Permissions Matrix</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(59,130,246,0.12)" }}>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Module</th>
                {roles.map(r => (
                  <th key={r.id} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center" style={{ color: r.color }}>{r.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_PERMISSIONS.map(p => (
                <tr key={p.key} className="transition-colors" style={{ borderBottom: "1px solid rgba(59,130,246,0.06)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,130,246,0.04)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="px-5 py-3">
                    <div className="font-medium text-white text-sm">{p.label}</div>
                    <div className="text-xs" style={{ color: "#64748b" }}>{p.desc}</div>
                  </td>
                  {roles.map(r => (
                    <td key={r.id} className="px-4 py-3 text-center">
                      {r.permissions.includes(p.key)
                        ? <div className="w-5 h-5 rounded-full mx-auto flex items-center justify-center" style={{ background: r.color + "20" }}>
                            <Check className="h-3 w-3" style={{ color: r.color }} />
                          </div>
                        : <div className="w-5 h-5 rounded-full mx-auto flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                            <span style={{ color: "#475569", fontSize: 10 }}>—</span>
                          </div>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <SAModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Role" : "Create Role"} width="max-w-lg">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Role Name *</label>
              <input value={form.name} onChange={e => { setForm(f => ({ ...f, name: e.target.value })); if (formErrors.name) setFormErrors(e2 => ({ ...e2, name: "" })); }}
                className="w-full h-10 px-3 rounded-xl text-sm text-white outline-none"
                style={{ ...inputStyle, ...(formErrors.name ? { border: "1px solid #f87171" } : {}) }} placeholder="e.g. Manager" />
              <FieldError msg={formErrors.name} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Color</label>
              <div className="flex gap-2 flex-wrap">
                {COLORS.map(c => (
                  <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))}
                    className="w-7 h-7 rounded-full transition-all"
                    style={{ backgroundColor: c, ...(form.color === c ? { outline: "2px solid white", outlineOffset: 2 } : {}) }} />
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-3" style={{ color: "#94a3b8" }}>Permissions *</label>
            <FieldError msg={formErrors.permissions} />
            <div className="space-y-2 mt-2">
              {ALL_PERMISSIONS.map(p => (
                <label key={p.key} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(59,130,246,0.1)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.25)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.1)")}>
                  <div onClick={() => togglePerm(p.key)}
                    className="w-5 h-5 rounded flex items-center justify-center shrink-0 cursor-pointer transition-all"
                    style={form.permissions.includes(p.key)
                      ? { background: form.color }
                      : { border: "1px solid rgba(255,255,255,0.2)", background: "transparent" }}>
                    {form.permissions.includes(p.key) && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <div className="flex-1" onClick={() => togglePerm(p.key)}>
                    <div className="text-sm font-medium text-white">{p.label}</div>
                    <div className="text-xs" style={{ color: "#64748b" }}>{p.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t" style={{ borderColor: "rgba(59,130,246,0.15)" }}>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 border"
              style={{ borderColor: "rgba(59,130,246,0.2)", background: "rgba(255,255,255,0.03)" }}>Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}>
              {editing ? "Save Changes" : "Create Role"}
            </button>
          </div>
        </div>
      </SAModal>

      <SAModal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Role" width="max-w-sm">
        <p className="text-sm mb-5" style={{ color: "#94a3b8" }}>Deleting this role will affect all members assigned to it. This cannot be undone.</p>
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
