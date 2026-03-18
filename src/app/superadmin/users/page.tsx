"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
  Users, 
  Search, 
  Filter, 
  Building2, 
  ShieldCheck, 
  Mail, 
  Clock, 
  MoreHorizontal,
  Download,
  UserCheck,
  UserX
} from "lucide-react";
import { users, companyTenants } from "@/mock";
import { cn } from "@/lib/utils";

export default function GlobalUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 p-base">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-primary tracking-tight flex items-center gap-3">
            <Users className="h-8 w-8 text-indigo-600" />
            Global User Registry
          </h1>
          <p className="text-slate-500 mt-1">Monitoring and managing user accounts across all platform tenants.</p>
        </div>
        <Button variant="secondary" className="gap-2 border-surface-border font-bold">
          <Download className="h-4 w-4" />
          Export Audit Log
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-surface-border shadow-premium">
          <CardContent className="p-6 flex items-center gap-4">
             <div className="h-12 w-12 rounded-ui bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users className="h-6 w-6" />
             </div>
             <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Users</p>
                <h3 className="text-2xl font-bold text-brand-primary">1,248</h3>
             </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-surface-border shadow-premium">
          <CardContent className="p-6 flex items-center gap-4">
             <div className="h-12 w-12 rounded-ui bg-status-success/10 text-status-success flex items-center justify-center">
                <UserCheck className="h-6 w-6" />
             </div>
             <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">New Today</p>
                <h3 className="text-2xl font-bold text-brand-primary">+12</h3>
             </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-surface-border shadow-premium">
          <CardContent className="p-6 flex items-center gap-4">
             <div className="h-12 w-12 rounded-ui bg-status-warning/10 text-status-warning flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
             </div>
             <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Admin Roles</p>
                <h3 className="text-2xl font-bold text-brand-primary">84</h3>
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Global Search & Filters */}
      <Card className="border-surface-border shadow-premium overflow-hidden">
        <CardContent className="p-4 bg-slate-50/30">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search by name, email, or company..." 
                className="pl-10 h-10 border-surface-border focus:ring-brand-accent/20 focus:border-brand-accent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
               <Button variant="secondary" className="h-10 gap-2 border-surface-border font-bold">
                 <Filter className="h-4 w-4" />
                 Filters
               </Button>
               <Button variant="secondary" className="h-10 gap-2 border-surface-border font-bold">
                 <Building2 className="h-4 w-4" />
                 Tenant Selection
               </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Table */}
      <Card className="border-surface-border shadow-premium overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/80 border-b border-surface-border">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-bold text-slate-600 uppercase text-[11px] tracking-wider">Identity</TableHead>
                <TableHead className="font-bold text-slate-600 uppercase text-[11px] tracking-wider">Organization / Client</TableHead>
                <TableHead className="font-bold text-slate-600 uppercase text-[11px] tracking-wider">Role Profile</TableHead>
                <TableHead className="font-bold text-slate-600 uppercase text-[11px] tracking-wider">Status</TableHead>
                <TableHead className="font-bold text-slate-600 uppercase text-[11px] tracking-wider">Last Seen</TableHead>
                <TableHead className="text-right font-bold text-slate-600 uppercase text-[11px] tracking-wider px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const company = companyTenants[Math.floor(Math.random() * companyTenants.length)];
                return (
                  <TableRow key={user.id} className="group hover:bg-slate-50 transition-colors">
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 border border-surface-border group-hover:bg-brand-primary group-hover:text-white transition-all">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex flex-col">
                           <span className="font-bold text-brand-primary tracking-tight">{user.name}</span>
                           <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                             <Mail className="h-3 w-3" />
                             {user.email}
                           </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                       <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-slate-400" />
                          <span className="font-semibold text-slate-700">{company.name}</span>
                       </div>
                    </TableCell>
                    <TableCell>
                       <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-indigo-500" />
                          <span className="text-sm font-semibold text-slate-600">{user.role}</span>
                       </div>
                    </TableCell>
                    <TableCell>
                       <Badge variant={user.status === "active" ? "success" : "info"} className="font-bold uppercase text-[10px] min-w-[70px] justify-center">
                         {user.status}
                       </Badge>
                    </TableCell>
                    <TableCell>
                       <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                          <Clock className="h-3.5 w-3.5" />
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}
                       </div>
                    </TableCell>
                    <TableCell className="text-right px-6">
                       <div className="flex items-center justify-end gap-2">
                          <Button variant="secondary" className="h-8 w-8 p-0 border-surface-border text-slate-400 hover:text-status-error" title="Revoke Access">
                             <UserX className="h-4 w-4" />
                          </Button>
                          <Button variant="secondary" className="h-8 w-8 p-0 border-surface-border text-slate-400">
                             <MoreHorizontal className="h-4 w-4" />
                          </Button>
                       </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
