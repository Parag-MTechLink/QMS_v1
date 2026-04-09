import React from "react";
import { Bell, Plus, ChevronDown, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDocumentStore } from "@/store/useDocumentStore";

export const Header = () => {
  const { userRole, setUserRole } = useDocumentStore();

  const roles = [
    { id: 'DO', label: 'Owner', full: 'Document Owner' },
    { id: 'REV', label: 'Review', full: 'Reviewer' },
    { id: 'APP', label: 'Approve', full: 'Approver' },
    { id: 'DCA', label: 'Admin', full: 'Document Control Admin' },
    { id: 'INTERNAL_AUDITOR', label: 'I-Audit', full: 'Internal Auditor' },
    { id: 'EXTERNAL_AUDITOR', label: 'E-Audit', full: 'External Auditor' }
  ];

  return (
    <header className="fixed left-64 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg border border-slate-200">
        <span className="text-[10px] font-bold text-slate-400 uppercase px-2">Role:</span>
        {roles.map(role => (
          <Button 
            key={role.id}
            variant={userRole === role.id ? "default" : "ghost"}
            size="sm"
            className={`h-7 px-3 text-[10px] font-bold rounded-md transition-all ${
              userRole === role.id 
              ? 'bg-indigo-600 text-white shadow-sm' 
              : 'text-slate-500 hover:text-indigo-600 hover:bg-white'
            }`}
            onClick={() => setUserRole(role.id)}
            title={role.full}
          >
            {role.label}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {(userRole === 'DO' || userRole === 'DCA') && (
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 rounded-md shadow-sm">
            <Plus className="w-4 h-4" />
            New Document
          </Button>
        )}

        <div className="h-6 w-px bg-gray-200 mx-1" />

        <div className="relative">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-indigo-600 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full" />
          </Button>
        </div>

        <div className="flex items-center gap-3 pl-1">
          <div className="text-right hidden sm:block leading-none">
            <div className="text-sm font-semibold text-gray-900">Sarah Jenkins</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
              {roles.find(r => r.id === userRole)?.full}
            </div>
          </div>
          <Avatar className="w-9 h-9 border border-gray-200 cursor-pointer">
            <AvatarImage src={`https://i.pravatar.cc/150?u=${userRole}`} />
            <AvatarFallback>{userRole}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
