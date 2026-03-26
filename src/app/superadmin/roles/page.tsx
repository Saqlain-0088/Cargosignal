"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Shield, Check } from "lucide-react";
import { useAdminAuth, Role, Permission } from "@/context/AdminAuthContext";
import SAModal from "@/components/superadmin/SAModal";
import { Button } from "@/components/ui/Button";

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

const COLORS = ["#ff6d00", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899", "#f59e0b"];

const emptyRole = { name: "", permissions: [] as Permission[], color: COLORS[0] };

export default function RolesPage() {
  const { roles, setRoles, members } = useAdminAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Role | null>(null);
  const [form, setForm] = useState(emptyRole);

  const openCreate = () => { setEditing(null); setForm(emptyRole); setModalOpen(true); };
  const openEdit = (r: Role) => { setEditing(r); setForm({ name: r.name, permissions: [...r.permissions], color: r.color }); setModalOpen(true); };

  const togglePerm = (p: Permission) => setForm(f => ({
    ...f,
    permissions: f.permissions.includes(p) ? f.permissions.filter(x => x !== p) : [...f.permissions, p],
  }));

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setRoles(roles.map(r => r.id === editing.id ? { ...r, ...form } : r));
    } else {
      setRoles([...roles, { ...form, id: form.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now() }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setRoles(roles.filter(r => r.id !== id));
    setDeleteId(null);
  };

  const memberCountForRole = (roleId: string) => members.filter(m => m.roleId === roleId).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Roles & Permissions</h1>
          <p className="text-zinc-500 text-sm mt-1">Define roles and control access to admin panel modules.</p>
        </div>
        <Button variant="accent" className="gap-2" onClick={openCreate}>
          <Plus className="h-4 w-4" /> Create Role
        </Button>
      </div>

      {/* Roles grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map(role => (
          <div key={role.id} className="rounded-xl bg-[#1a1a1a] border border-white/10 p-5 hover:border-white/20 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: role.color + "20" }}>
                  <Shield className="h-4 w-4" style={{ color: role.color }} />
                </div>
                <div>
                  <div className="font-bold text-white">{role.name}</div>
                  <div className="text-xs text-zinc-500">{memberCountForRole(role.id)} member{memberCountForRole(role.id) !== 1 ? "s" : ""}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(role)} className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                {role.id !== "superadmin" && (
                  <button onClick={() => setDeleteId(role.id)} className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {ALL_PERMISSIONS.map(p => {
                const has = role.permissions.includes(p.key);
                return (
                  <span key={p.key} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${has ? "bg-white/10 text-zinc-300" : "bg-white/5 text-zinc-600 line-through"}`}>
                    {has && <Check className="h-2.5 w-2.5" style={{ color: role.color }} />}
                    {p.label}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Permissions matrix */}
      <div className="rounded-xl bg-[#1a1a1a] border border-white/10 overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h2 className="font-bold text-white text-sm">Permissions Matrix</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Overview of all role permissions</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Module</th>
                {roles.map(r => (
                  <th key={r.id} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center" style={{ color: r.color }}>{r.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_PERMISSIONS.map(p => (
                <tr key={p.key} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3">
                    <div className="font-medium text-white text-sm">{p.label}</div>
                    <div className="text-xs text-zinc-500">{p.desc}</div>
                  </td>
                  {roles.map(r => (
                    <td key={r.id} className="px-4 py-3 text-center">
                      {r.permissions.includes(p.key)
                        ? <div className="w-5 h-5 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: r.color + "20" }}><Check className="h-3 w-3" style={{ color: r.color }} /></div>
                        : <div className="w-5 h-5 rounded-full mx-auto bg-white/5 flex items-center justify-center"><span className="text-zinc-700 text-xs">—</span></div>
                      }
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
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Role Name *</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full h-10 px-3 rounded-lg text-sm text-white bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" placeholder="e.g. Manager" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Color</label>
              <div className="flex gap-2 flex-wrap">
                {COLORS.map(c => (
                  <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))}
                    className={`w-7 h-7 rounded-full transition-all ${form.color === c ? "ring-2 ring-white ring-offset-2 ring-offset-[#1a1a1a] scale-110" : ""}`}
                    style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-3">Permissions</label>
            <div className="space-y-2">
              {ALL_PERMISSIONS.map(p => (
                <label key={p.key} className="flex items-center gap-3 p-3 rounded-lg bg-[#0f0f0f] border border-white/10 cursor-pointer hover:border-white/20 transition-all">
                  <div
                    onClick={() => togglePerm(p.key)}
                    className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all cursor-pointer ${form.permissions.includes(p.key) ? "border-0" : "border border-white/20 bg-transparent"}`}
                    style={form.permissions.includes(p.key) ? { backgroundColor: form.color } : {}}
                  >
                    {form.permissions.includes(p.key) && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <div className="flex-1" onClick={() => togglePerm(p.key)}>
                    <div className="text-sm font-medium text-white">{p.label}</div>
                    <div className="text-xs text-zinc-500">{p.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
            <Button variant="dark-outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="accent" onClick={handleSave}>{editing ? "Save Changes" : "Create Role"}</Button>
          </div>
        </div>
      </SAModal>

      {/* Delete confirm */}
      <SAModal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Role" width="max-w-sm">
        <p className="text-zinc-400 text-sm mb-5">Deleting this role will affect all members assigned to it. This cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <Button variant="dark-outline" onClick={() => setDeleteId(null)}>Cancel</Button>
          <button onClick={() => deleteId && handleDelete(deleteId)} className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </SAModal>
    </div>
  );
}
