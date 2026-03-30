import React from "react";
import { 
  Search, 
  Filter, 
  Download, 
  ChevronDown, 
  X,
  Clock,
  User,
  FileCheck,
  Edit,
  MessageSquare,
  Trash2,
  CheckCircle2,
  History,
  ShieldCheck,
  ShieldAlert,
  ArrowUpRight,
  ExternalLink,
  MoreVertical
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const timelineActions = [
  {
    type: "approval",
    title: "Document SOP-104 approved",
    meta: "By QA Admin • 10 mins ago",
    icon: CheckCircle2,
    iconColor: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    type: "edit",
    title: "SOP-104 updated",
    meta: "By Jane Doe • 1 hour ago",
    icon: Edit,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50"
  },
  {
    type: "comment",
    title: "Comment added",
    meta: "By John Smith • 3 hours ago",
    icon: MessageSquare,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    comment: '"Please review section 4.2 for compliance with the new standard."'
  },
  {
    type: "delete",
    title: "Draft Policy deleted",
    meta: "By Admin • Yesterday",
    icon: Trash2,
    iconColor: "text-red-600",
    bgColor: "bg-red-50"
  }
];

const auditLogs = [
  {
    timestamp: "Oct 24, 2023 14:32:01",
    user: "QA Admin",
    action: "Approved",
    docId: "SOP-104",
    prev: "Draft",
    new: "Published",
    ip: "192.168.1.45"
  },
  {
    timestamp: "Oct 24, 2023 13:15:22",
    user: "Jane Doe",
    action: "Updated",
    docId: "SOP-104",
    prev: "v1.2",
    new: "v1.3",
    ip: "10.0.0.22"
  },
  {
    timestamp: "Oct 24, 2023 11:05:45",
    user: "John Smith",
    action: "Commented",
    docId: "SOP-104",
    prev: "-",
    new: '"Please review..."',
    ip: "172.16.254.1"
  },
  {
    timestamp: "Oct 23, 2023 09:12:10",
    user: "System",
    action: "Auto-Archived",
    docId: "POL-OLD-02",
    prev: "Active",
    new: "Archived",
    ip: "localhost"
  },
  {
    timestamp: "Oct 23, 2023 08:30:00",
    user: "Admin",
    action: "Role Changed",
    docId: "-",
    prev: "Viewer (Jane Doe)",
    new: "Editor (Jane Doe)",
    ip: "192.168.1.100"
  }
];

export default function AuditLog() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Audit & Activity Log</h1>
        <p className="text-sm text-gray-500">Monitor comprehensive traceability and audit logs across your QMS platform.</p>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <FilterSelect label="All Users" />
          <FilterSelect label="All Actions" />
          <FilterSelect label="All Documents" />
          <FilterSelect label="Last 7 Days" />
          <FilterSelect label="All Departments" />
          
          <Button variant="ghost" size="sm" className="ml-auto text-xs font-bold text-slate-500 gap-2 hover:bg-slate-50">
            <X className="w-3.5 h-3.5" />
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Activity (Left Sidebar) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-gray-200 shadow-sm sticky top-20">
            <CardHeader className="pb-4 border-b border-gray-50">
              <CardTitle className="text-sm font-black uppercase text-gray-400 tracking-widest">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="relative space-y-8 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
                {timelineActions.map((action, idx) => (
                  <div key={idx} className="relative pl-10 flex flex-col gap-1.5">
                    <div className={cn(
                      "absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-white border border-gray-100",
                      action.bgColor
                    )}>
                      <action.icon className={cn("w-4 h-4", action.iconColor)} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 leading-none">{action.title}</span>
                      <span className="text-[10px] font-medium text-gray-500 uppercase tracking-tight mt-1">{action.meta}</span>
                    </div>
                    {action.comment && (
                      <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-100 mt-1">
                        <p className="text-[11px] italic text-slate-500 leading-relaxed">
                          {action.comment}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-8 text-[10px] font-black uppercase tracking-widest h-10 border-gray-200 text-slate-500 hover:text-blue-600 transition-all">
                Load More
              </Button>
            </CardContent>
          </Card>
          
          {/* AI Governance online card - keeping it consistent with the UI theme */}
          <Card className="border-gray-200 bg-slate-900 p-6 space-y-4">
             <div className="flex flex-col gap-1">
               <div className="text-[10px] uppercase font-black tracking-[0.2em] text-blue-400">System Health Stable</div>
               <div className="text-lg font-black text-white leading-tight">AI Governance Online</div>
             </div>
             <p className="text-xs text-slate-400 leading-relaxed">
               11 actions recommended this week across document review and audit readiness.
             </p>
             <Button className="w-full bg-white text-slate-900 hover:bg-blue-50 font-black text-[10px] uppercase tracking-widest h-10">
               View Recommendations
             </Button>
          </Card>
        </div>

        {/* Detailed Audit Log (Right) */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="py-4 px-6 border-b border-gray-50 flex flex-row items-center justify-between bg-slate-50/30">
               <CardTitle className="text-sm font-black uppercase text-gray-400 tracking-widest">Detailed Audit Log</CardTitle>
               <Button variant="outline" size="sm" className="h-8 px-3 rounded-md border-gray-200 gap-2 text-[10px] font-black uppercase tracking-widest">
                 <Download className="w-3 h-3" />
                 Export CSV
               </Button>
            </CardHeader>
            <CardContent className="p-0">
               <Table>
                 <TableHeader className="bg-white">
                   <TableRow className="hover:bg-transparent border-gray-100">
                     <TableHead className="text-[9px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">Timestamp</TableHead>
                     <TableHead className="text-[9px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">User</TableHead>
                     <TableHead className="text-[9px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">Action</TableHead>
                     <TableHead className="text-[9px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">Document ID</TableHead>
                     <TableHead className="text-[9px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">Prev Value</TableHead>
                     <TableHead className="text-[9px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">New Value</TableHead>
                     <TableHead className="text-[9px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">IP Address</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {auditLogs.map((log, i) => (
                     <TableRow key={i} className="group hover:bg-slate-50 transition-colors border-gray-50">
                       <TableCell className="px-6 py-4 text-[11px] font-medium text-slate-500 tabular-nums">
                         {log.timestamp}
                       </TableCell>
                       <TableCell className="px-6 py-4">
                         <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-500">
                             {log.user.substring(0, 2).toUpperCase()}
                           </div>
                           <span className="text-xs font-bold text-slate-800">{log.user}</span>
                         </div>
                       </TableCell>
                       <TableCell className="px-6 py-4">
                         <span className={cn(
                           "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider",
                           log.action === "Approved" ? "bg-green-50 text-green-700" :
                           log.action === "Updated" ? "bg-amber-50 text-amber-700" :
                           log.action === "Commented" ? "bg-blue-50 text-blue-700" :
                           "bg-slate-100 text-slate-700"
                         )}>
                           {log.action}
                         </span>
                       </TableCell>
                       <TableCell className="px-6 py-4 text-xs font-bold text-blue-600">
                        {log.docId !== "-" ? log.docId : <span className="text-slate-300">-</span>}
                       </TableCell>
                       <TableCell className="px-6 py-4 text-[11px] text-slate-500 truncate max-w-[100px]">
                         {log.prev}
                       </TableCell>
                       <TableCell className="px-6 py-4 text-[11px] font-bold text-slate-700 truncate max-w-[100px]">
                         {log.new}
                       </TableCell>
                       <TableCell className="px-6 py-4 text-[11px] font-mono text-slate-400">
                         {log.ip}
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
               
               {/* Pagination Component - inspired by the mockup style */}
               <div className="px-6 py-4 border-t border-gray-50 bg-white flex items-center justify-between">
                 <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                   Showing <span className="text-slate-900">1 to 5</span> of 1,245 entries
                 </div>
                 <div className="flex items-center gap-1.5">
                    <button className="h-8 w-8 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 disabled:opacity-30 border border-transparent" disabled>&lt;</button>
                    <button className="h-8 w-8 rounded-md bg-blue-600 text-white font-black text-[11px] shadow-lg shadow-blue-100">1</button>
                    <button className="h-8 w-8 rounded-md font-black text-[11px] text-slate-500 hover:bg-gray-100 transition-colors">2</button>
                    <button className="h-8 w-8 rounded-md font-black text-[11px] text-slate-500 hover:bg-gray-100 transition-colors">3</button>
                    <span className="text-gray-400 text-xs px-1">...</span>
                    <button className="h-8 w-auto px-2 rounded-md font-black text-[11px] text-slate-500 hover:bg-gray-100 transition-colors">249</button>
                    <button className="h-8 w-8 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">&gt;</button>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ label }) {
  return (
    <div className="relative group">
      <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg bg-gray-50 border-gray-200 text-xs font-bold text-slate-600 gap-8 group-hover:bg-white transition-all">
        {label}
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
      </Button>
    </div>
  );
}
