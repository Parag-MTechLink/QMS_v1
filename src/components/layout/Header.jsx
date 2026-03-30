import React from "react";
import { Search, Bell, Download, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-6">
      <div className="flex-1 max-w-lg">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
          <Input 
            className="pl-10 h-10 bg-gray-50 border-gray-200 focus:bg-white focus:ring-indigo-500 rounded-md text-sm w-full transition-all"
            placeholder="Search documents, standards, or audit events..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="hidden lg:flex items-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-md">
          <Download className="w-4 h-4" />
          Export Reports
        </Button>
        
        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 rounded-md shadow-sm">
          <Plus className="w-4 h-4" />
          New Document
        </Button>

        <div className="h-6 w-px bg-gray-200 mx-1" />

        <div className="relative">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-indigo-600 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full" />
          </Button>
        </div>

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block leading-none">
            <div className="text-sm font-semibold text-gray-900">Sarah Jenkins</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Document Control Lead</div>
          </div>
          <Avatar className="w-9 h-9 border border-gray-200 cursor-pointer">
            <AvatarImage src="https://i.pravatar.cc/150?u=sarah" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
