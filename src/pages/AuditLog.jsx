import React from "react";
import { 
  Search, 
  Download, 
  ChevronDown, 
  X,
  Edit,
  MessageSquare,
  Trash2,
  CheckCircle2,
  Filter,
  Activity
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
import { useDocumentStore } from "@/store/useDocumentStore";

export default function AuditLog() {
  const { auditLogs } = useDocumentStore();
  
  // Aggregate all logs from all documents and sort by date descending
  const allLogs = Object.entries(auditLogs).flatMap(([docId, logs]) => 
    logs.map(log => ({ 
      ...log, 
      docId, 
      timestamp: new Date(log.timestamp).getTime() 
    }))
  ).sort((a, b) => b.timestamp - a.timestamp);

  // Take recent actions for the timeline (first 5)
  const timelineActions = allLogs.slice(0, 5).map(log => ({
    type: log.action.toLowerCase(),
    title: log.detail,
    meta: `By ${log.user} • ${log.docId}`,
    icon: log.action === 'TRANSITION' ? CheckCircle2 : log.action === 'EDITED' ? Edit : MessageSquare,
    iconColor: log.action === 'TRANSITION' ? "text-green-600" : "text-indigo-600",
    bgColor: log.action === 'TRANSITION' ? "bg-green-50" : "bg-indigo-50",
    docId: log.docId
  }));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-wrap items-end justify-between gap-3 px-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Audit Traceability Log</h1>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Immutable compliance ledger & activity stream</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 border-slate-200 text-[10px] font-black uppercase tracking-widest">Generate Report</Button>
          <Button className="h-9 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest gap-2 shadow-lg shadow-slate-200">
            <Download className="w-3 h-3" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-100/50 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[300px] flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
            <Input className="h-10 border-slate-100 bg-slate-50/50 pl-10 text-xs font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all rounded-xl" placeholder="Search user, action, document ID, or IP..." />
          </div>
          <FilterSelect label="All Entities" />
          <FilterSelect label="Action Type" />
          <FilterSelect label="Chronological" />
          
          <Button variant="ghost" size="sm" className="ml-auto text-[10px] font-black uppercase tracking-widest text-slate-400 gap-2 hover:bg-slate-50 transition-colors">
            <X className="w-3 h-3" />
            Reset Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Timeline Column */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-slate-100 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden bg-white">
            <CardHeader className="pb-4 border-b border-slate-50 bg-slate-50/30">
              <CardTitle className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Live Activity stream</CardTitle>
            </CardHeader>
            <CardContent className="pt-8 px-6 pb-6">
              <div className="relative space-y-8 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                {timelineActions.map((action, idx) => (
                  <div key={idx} className="relative pl-10 flex flex-col gap-1.5 group">
                    <div className={cn(
                      "absolute left-0 top-0 w-8 h-8 rounded-xl flex items-center justify-center ring-4 ring-white border border-slate-100 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
                      action.bgColor
                    )}>
                      <action.icon className={cn("w-4 h-4", action.iconColor)} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">{action.title}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{new Date(allLogs[idx].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span className="text-[9px] font-black text-indigo-600 uppercase tracking-tighter">{action.docId}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {timelineActions.length === 0 && (
                  <div className="py-8 text-center text-slate-300 italic text-xs uppercase tracking-widest">No recent stream detected</div>
                )}
              </div>
              
              <Button variant="outline" className="w-full mt-8 text-[9px] font-black uppercase tracking-widest h-10 border-slate-100 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all rounded-xl">
                View Detailed Timeline
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Table Column */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-slate-100 shadow-2xl shadow-slate-200/60 rounded-2xl overflow-hidden bg-white">
            <CardHeader className="py-5 px-6 border-b border-slate-50 flex flex-row items-center justify-between bg-white">
               <div className="space-y-1">
                <CardTitle className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Detailed Compliance Record</CardTitle>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total recorded events: {allLogs.length}</p>
               </div>
            </CardHeader>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                 <Table>
                   <TableHeader className="bg-slate-50/50">
                     <TableRow className="hover:bg-transparent border-slate-100">
                       <TableHead className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-6 h-12">Event Timestamp</TableHead>
                       <TableHead className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-6 h-12">Authorized User</TableHead>
                       <TableHead className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-6 h-12">Action</TableHead>
                       <TableHead className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-6 h-12">Entity Reference</TableHead>
                       <TableHead className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-6 h-12">Activity Detail</TableHead>
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     {allLogs.map((log, i) => (
                       <TableRow key={`${log.docId}-${i}`} className="group hover:bg-slate-50/50 transition-colors border-slate-50">
                         <TableCell className="px-6 py-4 text-[10px] font-bold text-slate-400 tabular-nums uppercase">
                           {new Date(log.timestamp).toLocaleString()}
                         </TableCell>
                         <TableCell className="px-6 py-4">
                           <div className="flex items-center gap-2.5">
                             <div className="w-7 h-7 rounded-lg bg-white border border-slate-100 shadow-sm flex items-center justify-center text-[9px] font-black text-indigo-600 uppercase">
                               {log.user.substring(0, 2)}
                             </div>
                             <span className="text-xs font-black text-slate-800 tracking-tight">{log.user}</span>
                           </div>
                         </TableCell>
                         <TableCell className="px-6 py-4">
                           <span className={cn(
                             "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                             log.action === "TRANSITION" ? "bg-green-50 text-green-700 border-green-100" :
                             log.action === "EDITED" ? "bg-amber-50 text-amber-700 border-amber-100" :
                             log.action === "OBSERVATION" ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                             "bg-slate-100 text-slate-700 border-slate-200"
                           )}>
                             {log.action}
                           </span>
                         </TableCell>
                         <TableCell className="px-6 py-4">
                           <div className="flex flex-col">
                             <span className="text-xs font-black text-blue-600 tracking-tighter">{log.docId}</span>
                           </div>
                         </TableCell>
                         <TableCell className="px-6 py-4">
                            <p className="text-[11px] font-bold text-slate-600 leading-snug">{log.detail}</p>
                         </TableCell>
                       </TableRow>
                     ))}
                   </TableBody>
                 </Table>
               </div>
               
               <div className="px-6 py-5 border-t border-slate-50 bg-slate-50/20 flex items-center justify-between">
                 <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                   Traceability Ledger Verified by Node: {Math.random().toString(36).substring(7).toUpperCase()}
                 </div>
                 <div className="flex items-center gap-2">
                    <button className="h-8 px-3 rounded-lg border border-slate-200 text-[10px] font-black uppercase text-slate-400 hover:bg-white transiton-all">Previous</button>
                    <button className="h-8 w-8 rounded-lg bg-indigo-600 text-white font-black text-[10px] shadow-lg shadow-indigo-100">1</button>
                    <button className="h-8 px-3 rounded-lg border border-slate-200 text-[10px] font-black uppercase text-slate-400 hover:bg-white transiton-all">Next</button>
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
      <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg bg-slate-50/50 border-slate-100 text-xs font-bold text-slate-600 gap-8 group-hover:bg-white transition-all">
        {label}
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
      </Button>
    </div>
  );
}
