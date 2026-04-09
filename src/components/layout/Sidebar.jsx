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
  Settings
} from "lucide-react";
import { 
  Users,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDocumentStore, ROLES, ROLE_LABELS } from "@/store/useDocumentStore";

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
  const { userRole, setUserRole } = useDocumentStore();
  const [isRoleMenuOpen, setIsRoleMenuOpen] = React.useState(false);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white flex flex-col z-50">
      <div className="p-6 flex-1">
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

      {/* Role Switcher */}
      <div className="p-4 border-t border-gray-100 bg-slate-50/50">
        <div className="relative">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2 block">
            Persona Impersonation
          </label>
          <button
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-indigo-200 hover:shadow-indigo-50/50 transition-all group"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Users className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-black text-slate-900 uppercase truncate tracking-tighter">
                {ROLE_LABELS[userRole] || userRole}
              </span>
            </div>
            <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform", isRoleMenuOpen && "rotate-180")} />
          </button>

          {isRoleMenuOpen && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-2 duration-200 z-[60]">
              <div className="p-2 space-y-0.5">
                {Object.values(ROLES).map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setUserRole(role);
                      setIsRoleMenuOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all",
                      userRole === role 
                        ? "bg-indigo-600 text-white" 
                        : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                    )}
                  >
                    {ROLE_LABELS[role] || role}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
