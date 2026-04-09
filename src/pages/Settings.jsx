import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Bell, KeyRound, ShieldCheck, User, Lock, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

function ToggleRow({ icon: Icon, title, description, defaultChecked = false }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-gray-100 bg-white px-4 py-3">
      <div className="flex gap-3">
        <div className="mt-0.5 w-9 h-9 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center">
          <Icon className="w-4 h-4 text-gray-600" />
        </div>
        <div className="space-y-1">
          <div className="text-sm font-bold text-gray-900">{title}</div>
          <div className="text-xs text-gray-500 leading-relaxed">{description}</div>
        </div>
      </div>
      <label className="inline-flex items-center cursor-pointer select-none">
        <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
        <div
          className={cn(
            "w-11 h-6 rounded-full relative transition-colors border",
            defaultChecked ? "bg-indigo-600 border-indigo-600" : "bg-gray-200 border-gray-200"
          )}
        >
          <div
            className={cn(
              "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform",
              defaultChecked && "translate-x-5"
            )}
          />
        </div>
      </label>
    </div>
  );
}

export default function Settings() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Settings</h1>
          <p className="text-sm text-gray-500">Manage profile, notifications, and security preferences.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 border-gray-200 text-xs">
            Cancel
          </Button>
          <Button className="h-9 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold">
            Save changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-4 space-y-4">
          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-gray-100 bg-slate-50/60 py-4">
              <CardTitle className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 border border-gray-200">
                  <AvatarFallback className="bg-indigo-50 text-indigo-700 text-sm font-bold">
                    AM
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  <div className="text-lg font-black text-gray-900">Alex Morgan</div>
                  <div className="text-sm text-gray-500">Quality Manager</div>
                  <div className="text-xs text-gray-400">alex.morgan@qms-enterprise.com</div>
                </div>
              </div>
              <div className="mt-4">
                <Button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 text-xs">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <Bell className="w-4 h-4 text-indigo-600" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ToggleRow
                icon={Bell}
                title="Review assignment"
                description="Notify me when a document is assigned for review."
                defaultChecked
              />
              <ToggleRow
                icon={KeyRound}
                title="Approval alerts"
                description="Notify me when a document approval status changes."
                defaultChecked
              />
              <ToggleRow
                icon={ShieldCheck}
                title="Training reminders"
                description="Reminders for mandatory compliance training."
              />
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-8 space-y-4">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-600" />
                Personal information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full name</div>
                  <Input defaultValue="Alex Morgan" className="bg-gray-50 border-gray-200" />
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email address</div>
                  <Input defaultValue="alex.morgan@qms-enterprise.com" className="bg-gray-50 border-gray-200" />
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone number</div>
                  <Input defaultValue="+1 (555) 0123-4567" className="bg-gray-50 border-gray-200" />
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Department</div>
                  <Input defaultValue="Quality Assurance" className="bg-gray-50 border-gray-200" />
                </div>
              </div>
              <div className="mt-4">
                <Separator />
                <div className="mt-4 text-xs text-gray-500">
                  Changes to personal information are applied instantly in this demo.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                Security settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-lg border border-gray-100 bg-white px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RefreshCcw className="w-4 h-4 text-gray-600" />
                    <div>
                      <div className="text-sm font-bold text-gray-900">Change password</div>
                      <div className="text-xs text-gray-500">Last changed 3 months ago</div>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs">›</span>
                </div>

                <div className="rounded-lg border border-gray-100 bg-white px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-gray-600" />
                    <div>
                      <div className="text-sm font-bold text-gray-900">Enable MFA</div>
                      <div className="text-xs text-gray-500">Add an extra layer of security</div>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs">›</span>
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-white px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <KeyRound className="w-4 h-4 text-gray-600" />
                    <div>
                      <div className="text-sm font-bold text-gray-900">Account activity alerts</div>
                      <div className="text-xs text-gray-500">Notify on sign-in from a new device</div>
                    </div>
                  </div>
                  <label className="inline-flex items-center cursor-pointer select-none">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 rounded-full relative transition-colors bg-indigo-600 border border-indigo-600">
                      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm translate-x-5" />
                    </div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

