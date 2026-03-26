"use client";
import { useState } from "react";
import { ScrollText, Filter } from "lucide-react";

const allLogs = [
  { id: "1", event: "User Login", user: "john.doe@acme.com", timestamp: "2026-03-26 09:45:12", type: "auth" },
  { id: "2", event: "Plan Upgraded", user: "sarah@logistics.co", timestamp: "2026-03-26 09:30:05", type: "billing" },
  { id: "3", event: "Organization Suspended", user: "admin@cargosignal.com", timestamp: "2026-03-26 08:15:44", type: "admin" },
  { id: "4", event: "API Limit Exceeded", user: "dev@fastship.com", timestamp: "2026-03-26 07:55:22", type: "system" },
  { id: "5", event: "Password Reset", user: "mike@cargoplus.net", timestamp: "2026-03-26 07:20:11", type: "auth" },
  { id: "6", event: "New Shipment Created", user: "ops@globalfreight.com", timestamp: "2026-03-26 06:45:33", type: "shipment" },
  { id: "7", event: "User Suspended", user: "admin@cargosignal.com", timestamp: "2026-03-25 22:10:08", type: "admin" },
  { id: "8", event: "Invoice Generated", user: "billing@acme.com", timestamp: "2026-03-25 20:00:00", type: "billing" },
  { id: "9", event: "API Key Rotated", user: "dev@techlogix.io", timestamp: "2026-03-25 18:30:55", type: "system" },
  { id: "10", event: "User Login Failed", user: "unknown@hacker.io", timestamp: "2026-03-25 17:45:01", type: "auth" },
  { id: "11", event: "Plan Downgraded", user: "finance@smallco.com", timestamp: "2026-03-25 16:20:44", type: "billing" },
  { id: "12", event: "Container Alert Triggered", user: "system", timestamp: "2026-03-25 15:10:30", type: "system" },
];

const typeColors: Record<string, string> = {
  auth: "bg-blue-500/10 text-blue-400",
  billing: "bg-[#ff6d00]/10 text-[#ff6d00]",
  admin: "bg-purple-500/10 text-purple-400",
  system: "bg-zinc-500/10 text-zinc-400",
  shipment: "bg-green-500/10 text-green-400",
};

const eventTypes = ["All", "auth", "billing", "admin", "system", "shipment"];

export default function LogsPage() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const filtered = allLogs.filter(l => {
    const matchType = typeFilter === "All" || l.type === typeFilter;
    const matchDate = !dateFilter || l.timestamp.startsWith(dateFilter);
    return matchType && matchDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ScrollText className="h-6 w-6 text-[#ff6d00]" />
        <div><h1 className="text-2xl font-extrabold text-white">System Logs</h1><p className="text-zinc-500 text-sm">Audit trail of all platform events.</p></div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-500" />
          <span className="text-xs text-zinc-500 font-medium">Event Type:</span>
        </div>
        {eventTypes.map(t => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${typeFilter === t ? "bg-[#ff6d00] text-white" : "bg-[#1a1a1a] border border-white/10 text-zinc-400 hover:text-white"}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)}
          className="h-8 px-3 rounded-lg text-xs text-white bg-[#1a1a1a] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" />
        {dateFilter && <button onClick={() => setDateFilter("")} className="text-xs text-zinc-500 hover:text-white transition-colors">Clear date</button>}
      </div>

      {/* Table */}
      <div className="rounded-xl bg-[#1a1a1a] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/10">{["Event","User","Timestamp","Type"].map(h => <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map(log => (
                <tr key={log.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3 font-medium text-white">{log.event}</td>
                  <td className="px-5 py-3 text-zinc-400">{log.user}</td>
                  <td className="px-5 py-3 text-zinc-500 font-mono text-xs">{log.timestamp}</td>
                  <td className="px-5 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${typeColors[log.type]}`}>{log.type}</span></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={4} className="px-5 py-12 text-center text-zinc-500">No logs match the current filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
