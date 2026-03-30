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
  { id: "10", event: "Login Failed", user: "unknown@hacker.io", timestamp: "2026-03-25 17:45:01", type: "auth" },
];

const typeBadge: Record<string, string> = {
  auth: "bg-blue-50 text-blue-700", billing: "bg-indigo-50 text-indigo-700",
  admin: "bg-purple-50 text-purple-700", system: "bg-slate-100 text-slate-600", shipment: "bg-green-50 text-green-700",
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
        <ScrollText className="h-6 w-6 text-blue-600" />
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">System Logs</h1>
          <p className="text-slate-500 mt-1 font-medium">Audit trail of all platform events.</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2"><Filter className="h-4 w-4 text-slate-400" /><span className="text-xs font-medium text-slate-500">Event Type:</span></div>
        {eventTypes.map(t => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${typeFilter === t ? "bg-blue-600 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)}
          className="h-8 px-3 rounded-xl text-xs text-slate-700 bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
          style={{ colorScheme: "light" }} />
        {dateFilter && <button onClick={() => setDateFilter("")} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Clear</button>}
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50"><tr>{["Event", "User", "Timestamp", "Type"].map(h => <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(log => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-slate-800">{log.event}</td>
                  <td className="px-5 py-3 text-slate-500">{log.user}</td>
                  <td className="px-5 py-3 font-mono text-xs text-slate-400">{log.timestamp}</td>
                  <td className="px-5 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${typeBadge[log.type] ?? "bg-slate-100 text-slate-500"}`}>{log.type}</span></td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={4} className="px-5 py-12 text-center text-sm text-slate-400">No logs match the current filters.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
