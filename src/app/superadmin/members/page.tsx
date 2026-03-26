"use client";

import { useState } from "react";
import { Plus, Edit2, UserCheck, UserX, Users, Shield } from "lucide-react";
import { useAdminAuth, AdminMember, Permission } from "@/context/AdminAuthContext";
import SAModal from "@/components/superadmin/SAModal";
import StatCard from "@/components/superadmin/StatCard";
import { Button } from "@/components/ui/Button";

const emptyMember = { name: "", email: "", roleId: "viewer", status: "active" as "active" | "inactive" };

export default function MembersPage() {
  const { members, setMembers, roles, currentRole } = useAdminAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminMember | null>(null);
  const [form, setForm] = useState<{ name: string; email: string; roleId: string; status: "active" | "inactive" }>(emptyMember);

  const canManage = currentRole?.permissions.includes("members" as Permission) ?? false;

  const openCreate = () => { setEditing(null); setForm(emptyMember); setModalOpen(true); };
  const openEdit = (m: AdminMember) => { setEditing(m); setForm({ name: m.name, email: m.email, roleId: m.roleId, status: m.status }); setModalOpen(true); };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    if (editing) {
      setMembers(members.map(m => m.id === editing.id ? { ...m, ...form } : m));
    } else {
      setMembers([...members, { ...form, id: Date.now().toString(), joinedAt: new Date().toISOString().split("T")[0] }]);
    }
    setModalOpen(false);
  };

  const toggleStatus = (id: string) => setMembers(members.map(m => m.id === id ? { ...m, status: m.status === "active" ? "inactive" : "active" } : m));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Members</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage admin panel members and their roles.</p>
        </div>
        {canManage && (
          <Button variant="accent" className="gap-2" onClick={openCreate}>
            <Plus className="h-4 w-4" /> Add Member
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Members" value={members.length} icon={Users} color="#3b82f6" />
        <StatCard title="Active" value={members.filter(m => m.status === "active").length} icon={UserCheck} trendUp color="#10b981" />
        <StatCard title="Roles Defined" value={roles.length} icon={Shield} color="#ff6d00" />
      </div>

      <div className="rounded-xl bg-[#1a1a1a] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {["Member", "Email", "Role", "Status", "Joined", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map(member => {
                const role = roles.find(r => r.id === member.roleId);
                return (
                  <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: role?.color + "30", border: `1px solid ${role?.color}40` }}>
                          {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="font-medium text-white">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-zinc-400">{member.email}</td>
                    <td className="px-5 py-3">
                      {role && (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase" style={{ backgroundColor: role.color + "20", color: role.color }}>
                          {role.name}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${member.status === "active" ? "bg-green-500/10 text-green-400" : "bg-zinc-500/10 text-zinc-400"}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-zinc-500 text-xs">{member.joinedAt}</td>
                    <td className="px-5 py-3">
                      {canManage && (
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEdit(member)} className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button onClick={() => toggleStatus(member.id)} className={`p-1.5 rounded-lg transition-all ${member.status === "active" ? "text-zinc-400 hover:text-red-400 hover:bg-red-500/10" : "text-zinc-400 hover:text-green-400 hover:bg-green-500/10"}`}>
                            {member.status === "active" ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
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
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Full Name *</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full h-10 px-3 rounded-lg text-sm text-white bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email *</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full h-10 px-3 rounded-lg text-sm text-white bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" placeholder="john@cargosignal.com" />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Role</label>
            <select value={form.roleId} onChange={e => setForm(f => ({ ...f, roleId: e.target.value }))}
              className="w-full h-10 px-3 rounded-lg text-sm text-white bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]">
              {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs font-medium text-zinc-400">Active</label>
            <button onClick={() => setForm(f => ({ ...f, status: f.status === "active" ? "inactive" : "active" }))}
              className={`w-10 h-5 rounded-full transition-colors relative ${form.status === "active" ? "bg-[#ff6d00]" : "bg-white/10"}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.status === "active" ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
            <Button variant="dark-outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="accent" onClick={handleSave}>{editing ? "Save Changes" : "Add Member"}</Button>
          </div>
        </div>
      </SAModal>
    </div>
  );
}
