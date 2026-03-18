"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
  Building2, 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink, 
  Ban, 
  CheckCircle, 
  ArrowUpDown,
  Mail,
  Calendar,
  Layers,
  Plus,
  TrendingUp,
  Users
} from "lucide-react";
import { companyTenants } from "@/mock";
import { cn } from "@/lib/utils";

export default function CompaniesManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState(companyTenants);

  const handleToggleStatus = (id: string) => {
    setItems(prev => prev.map(company => {
      if (company.id === id) {
        return {
          ...company,
          status: company.status === "suspended" ? "active" : "suspended"
        };
      }
      return company;
    }));
  };

  const filteredCompanies = items.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 p-base">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-primary tracking-tight flex items-center gap-3">
            <Building2 className="h-8 w-8 text-brand-accent" />
            Company Tenants
          </h1>
          <p className="text-slate-500 mt-1">Manage and monitor all organizations using the platform.</p>
        </div>
        <Button className="gap-2 bg-brand-accent hover:bg-brand-accent/90 text-white shadow-premium font-bold">
          <Plus className="h-4 w-4" />
          Provision New Tenant
        </Button>
      </div>

      {/* Control Bar */}
      <Card className="border-surface-border shadow-premium overflow-hidden">
        <CardContent className="p-4 bg-slate-50/30">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search by company name, ID, or industry..." 
                className="pl-10 h-10 border-surface-border focus:ring-brand-accent/20 focus:border-brand-accent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="secondary" className="h-10 gap-2 font-bold px-6 border-surface-border">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Companies Table */}
      <Card className="border-surface-border shadow-premium overflow-hidden">
        <CardContent className="p-0">
           <Table>
             <TableHeader className="bg-slate-50/80 border-b border-surface-border">
               <TableRow className="hover:bg-transparent">
                 <TableHead className="w-[300px] font-bold text-slate-600 uppercase tracking-wider text-[11px]">Organization</TableHead>
                 <TableHead className="font-bold text-slate-600 uppercase tracking-wider text-[11px]">Usage Metrics</TableHead>
                 <TableHead className="font-bold text-slate-600 uppercase tracking-wider text-[11px]">Lifecycle GTV</TableHead>
                 <TableHead className="font-bold text-slate-600 uppercase tracking-wider text-[11px]">Status</TableHead>
                 <TableHead className="text-right font-bold text-slate-600 uppercase tracking-wider text-[11px]">Actions</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {filteredCompanies.map((company) => (
                 <TableRow key={company.id} className="group hover:bg-slate-50 transition-colors">
                   <TableCell className="py-4">
                     <div className="flex items-center gap-4">
                       <div className="h-12 w-12 bg-white border border-surface-border rounded-ui flex items-center justify-center font-bold text-xl text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-all">
                         {company.name.charAt(0)}
                       </div>
                       <div className="flex flex-col">
                         <span className="font-bold text-brand-primary tracking-tight">{company.name}</span>
                         <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                           <Layers className="h-3 w-3" />
                           {company.industry} • {company.id}
                         </span>
                       </div>
                     </div>
                   </TableCell>
                   <TableCell>
                      <div className="flex flex-col gap-2">
                         <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3 text-status-success" />
                              {company.activeShipments} Shipments
                            </span>
                            <span className="flex items-center gap-1 text-brand-accent">
                              <Users className="h-3 w-3" />
                              {company.userCount} Users
                            </span>
                         </div>
                         <div className="w-32 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-brand-accent h-full" 
                              style={{ width: `${Math.min((company.activeShipments / 150) * 100, 100)}%` }}
                            ></div>
                         </div>
                      </div>
                   </TableCell>
                   <TableCell>
                      <div className="flex flex-col">
                         <span className="font-bold text-brand-primary">${company.totalSpend.toLocaleString()}</span>
                         <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Total spend</span>
                      </div>
                   </TableCell>
                   <TableCell>
                      <Badge variant={company.status === "active" ? "success" : company.status === "trial" ? "info" : "error"} className="px-3 py-1 font-bold uppercase text-[10px] min-w-[80px] justify-center">
                        {company.status}
                      </Badge>
                   </TableCell>
                   <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2 px-2">
                        <Button 
                          variant="secondary" 
                          className={cn(
                            "h-9 w-9 p-0 border-surface-border",
                            company.status === "suspended" ? "text-status-success hover:bg-status-success/10" : "text-status-error hover:bg-status-error/10"
                          )}
                          title={company.status === "suspended" ? "Activate Tenant" : "Suspend Tenant"}
                          onClick={() => handleToggleStatus(company.id)}
                        >
                          {company.status === "suspended" ? <CheckCircle className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                        </Button>
                        <Button variant="secondary" className="h-9 w-9 p-0 border-surface-border text-slate-400 hover:text-brand-accent">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" className="h-9 w-9 p-0 border-surface-border text-slate-400">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                   </TableCell>
                 </TableRow>
               ))}
               {filteredCompanies.length === 0 && (
                 <TableRow className="hover:bg-transparent">
                   <TableCell colSpan={5} className="py-24 text-center">
                      <div className="flex flex-col items-center justify-center gap-4 text-slate-400">
                         <Search className="h-12 w-12 opacity-20" />
                         <p className="font-bold">No companies matching your search filters.</p>
                         <Button variant="secondary" onClick={() => setSearchTerm("")}>Clear All Filters</Button>
                      </div>
                   </TableCell>
                 </TableRow>
               )}
             </TableBody>
           </Table>
        </CardContent>
      </Card>
    </div>
  );
}
