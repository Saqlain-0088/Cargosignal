"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  Plus, 
  X,
  Globe,
  Anchor,
  Calendar
} from "lucide-react";

export default function AddShipmentPage() {
  const router = useRouter();
  const [containers, setContainers] = useState([{ number: "", size: "40ft", type: "standard" }]);

  const addContainer = () => {
    setContainers([...containers, { number: "", size: "40ft", type: "standard" }]);
  };

  const removeContainer = (index: number) => {
    const newContainers = [...containers];
    newContainers.splice(index, 1);
    setContainers(newContainers);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="secondary" className="h-9 w-9 p-0" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Add New Shipment</h1>
        </div>

        <form className="space-y-6 pb-20">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">General Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="trackingNumber">Shipment / Tracking ID</Label>
                  <Input id="trackingNumber" placeholder="e.g., CSL-55442211" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargoType">Cargo Type</Label>
                  <Input id="cargoType" placeholder="e.g., Electronics, Textiles" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input id="weight" type="number" placeholder="1000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select id="status" className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="pending">Pending</option>
                      <option value="in_transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                      <option value="delayed">Delayed</option>
                      <option value="customs_hold">Customs Hold</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Route & Logistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin Port / City</Label>
                  <div className="relative">
                    <Input id="origin" placeholder="Shanghai, China" className="pl-9" />
                    <Anchor className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination Port / City</Label>
                  <div className="relative">
                    <Input id="destination" placeholder="Los Angeles, USA" className="pl-9" />
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eta">Estimated Arrival</Label>
                  <div className="relative">
                    <Input id="eta" type="date" className="pl-9" />
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Containers</CardTitle>
              <Button type="button" variant="secondary" className="h-8 gap-1" onClick={addContainer}>
                <Plus className="h-3.5 w-3.5" />
                Add Container
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {containers.map((c, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-4 items-end bg-slate-50 p-4 rounded-lg border border-slate-200 relative group">
                  <div className="flex-1 space-y-2">
                    <Label className="text-xs text-slate-500">Container Number</Label>
                    <Input placeholder="MSKU..." />
                  </div>
                  <div className="w-full md:w-32 space-y-2">
                    <Label className="text-xs text-slate-500">Size</Label>
                    <select className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm">
                      <option>20ft</option>
                      <option>40ft</option>
                      <option>45ft</option>
                    </select>
                  </div>
                  <div className="w-full md:w-40 space-y-2">
                    <Label className="text-xs text-slate-500">Type</Label>
                    <select className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm">
                      <option>Standard</option>
                      <option>Reefer</option>
                      <option>Open Top</option>
                    </select>
                  </div>
                  {containers.length > 1 && (
                    <Button 
                      type="button" 
                      variant="secondary" 
                      className="h-10 w-10 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => removeContainer(idx)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" />
              Create Shipment
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
