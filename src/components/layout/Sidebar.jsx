import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  FileCheck, 
  CheckCircle2, 
  ShieldCheck, 
  ClipboardCheck, 
  BarChart3, 
  Settings,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Documents", href: "/documents" },
  { icon: FileCheck, label: "Reviews", href: "/reviews" },
  { icon: CheckCircle2, label: "Approvals", href: "/approvals" },
  { icon: ClipboardCheck, label: "Audits", href: "/audits" },
  { icon: ShieldCheck, label: "Compliance", href: "/compliance" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white flex flex-col z-50">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">QMS</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-indigo-50 text-indigo-700" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-gray-100">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-gray-500 font-medium">System Health: Stable</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs text-gray-500 font-medium">AI Governance: Online</span>
            </div>
          </div>
          <NavLink to="#" className="flex items-start gap-2 group">
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 mt-0.5 group-hover:text-indigo-600" />
            <span className="text-xs text-gray-500 leading-tight group-hover:text-indigo-600">
              11 actions recommended this week
            </span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};
