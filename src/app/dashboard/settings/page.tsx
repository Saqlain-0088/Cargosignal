"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { 
  Settings, 
  Users, 
  Shield, 
  Bell, 
  Building2, 
  Plus, 
  Mail, 
  UserPlus,
  Save,
  Trash2,
  Lock
} from "lucide-react";
import { users, roles } from "@/mock";
import { cn } from "@/lib/utils";

type SettingsTab = "general" | "team" | "security" | "notifications";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");

  const tabs = [
    { id: "general", label: "General", icon: Building2 },
    { id: "team", label: "Team", icon: Users },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Settings className="h-6 w-6 text-slate-600" />
            Company Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">Manage your organization's profile, team, and preferences.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 shrink-0">
            <nav className="flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as SettingsTab)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all whitespace-nowrap",
                      activeTab === tab.id 
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                        : "text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="flex-1 min-w-0">
            {activeTab === "general" && <GeneralSettings />}
            {activeTab === "team" && <TeamSettings />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "notifications" && <NotificationSettings />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function GeneralSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
          <CardDescription>Main information about your organization.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" defaultValue="Global Logistics Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID / VAT Number</Label>
              <Input id="taxId" defaultValue="GB 123 4567 89" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" defaultValue="https://www.globallogistics.com" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Headquarters Address</Label>
              <Input id="address" defaultValue="123 Logistics Way, London, UK" />
            </div>
          </div>
          <div className="pt-4">
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Regional Settings</CardTitle>
          <CardDescription>Manage your preferred units and localization.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Default Currency</Label>
              <div className="relative">
                <select className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                  <option>USD - US Dollar</option>
                  <option>EUR - Euro</option>
                  <option>GBP - British Pound</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Weight Unit</Label>
              <div className="relative">
                <select className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                  <option>KG - Kilograms</option>
                  <option>LB - Pounds</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TeamSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-slate-900">Team Members</h3>
        <Button className="gap-2 shrink-0">
          <UserPlus className="h-4 w-4" />
          Invite User
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">{user.name}</span>
                      <span className="text-xs text-slate-500">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-slate-600">{user.role}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "success" : "info"}>
                      {user.status === "active" ? "Active" : "Invited"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="text-slate-400 hover:text-red-500 p-2 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Role Management</CardTitle>
          <CardDescription>Define and restrict permissions for your team.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Users</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-bold text-slate-800">{role.name}</TableCell>
                  <TableCell className="text-sm text-slate-500">{role.description}</TableCell>
                  <TableCell className="text-right font-medium">
                    {users.filter(u => u.role === role.name).length}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Authentication and access control.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 border-slate-200">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">Two-Factor Authentication</p>
                <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
              </div>
            </div>
            <Button variant="secondary" className="text-xs h-8">Enable</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function NotificationSettings() {
  const preferences = [
    { id: "shipment_updates", label: "Shipment Status Updates", desc: "Receive alerts when shipments change status." },
    { id: "delays", label: "Delay Alerts", desc: "Get notified immediately about any logistics delays." },
    { id: "customs", label: "Customs Notifications", desc: "Alerts for documentation and clearance holds." },
    { id: "billing", label: "Billing & Invoices", desc: "Notifications for new invoices and payment receipts." },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Control how and when you receive alerts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {preferences.map((pref) => (
            <div key={pref.id} className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <p className="font-bold text-slate-900">{pref.label}</p>
                <p className="text-xs text-slate-500">{pref.desc}</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                   <input type="checkbox" id={`${pref.id}_email`} defaultChecked className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                   <label htmlFor={`${pref.id}_email`} className="text-xs text-slate-600 font-medium flex items-center gap-1">
                     <Mail className="h-3 w-3" /> Email
                   </label>
                 </div>
                 <div className="flex items-center gap-2">
                   <input type="checkbox" id={`${pref.id}_app`} defaultChecked className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                   <label htmlFor={`${pref.id}_app`} className="text-xs text-slate-600 font-medium flex items-center gap-1">
                     <Bell className="h-3 w-3" /> App
                   </label>
                 </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  );
}
