import React from "react";
import { 
  ShieldCheck, 
  Book, 
  LayoutList, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  FileText,
  BadgeAlert,
  Search,
  RefreshCcw,
  ClipboardList
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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

export default function Compliance() {
  const { nonConformities, documents } = useDocumentStore();
  
  // Aggregate all NCs across all documents
  const allNCs = Object.entries(nonConformities).flatMap(([docId, ncs]) => 
    ncs.map(nc => ({ ...nc, docId, docName: documents.find(d => d.id === docId)?.name || docId }))
  );

  const clauses = [
    { id: "4.1", description: "Understanding the organization and its context", standard: "ISO 9001", docs: 3, status: "Compliant" },
    { id: "6.1.2", description: "Information security risk assessment", standard: "ISO 27001", docs: 1, status: "Needs Review" },
    { id: "8.2", description: "Emergency preparedness and response", standard: "ISO 14001", docs: 0, status: "Gap Identified" },
    { id: "7.2", description: "Competence", standard: "ISO 9001", docs: 5, status: "Compliant" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex flex-wrap items-end justify-between gap-3 px-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Compliance Command</h1>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Regulatory Standards & Non-Conformance Register</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 border-slate-200 text-[10px] font-black uppercase tracking-widest">Standards Mapping</Button>
          <Button className="h-9 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100">Export Registry</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-12 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden bg-white group hover:translate-y-[-2px] transition-all duration-300">
               <CardContent className="p-6 flex items-center justify-between">
                 <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Compliance Score</span>
                    <div className="text-3xl font-black text-slate-900 tracking-tighter tabular-nums">88%</div>
                 </div>
                 <div className="relative w-16 h-16">
                   <svg className="w-full h-full transform -rotate-90">
                     <circle cx="32" cy="32" r="28" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
                     <circle cx="32" cy="32" r="28" stroke="#4f46e5" strokeWidth="6" fill="transparent" strokeDasharray="175.9" strokeDashoffset="21.1" className="transition-all duration-1000 ease-out" />
                   </svg>
                   <ShieldCheck className="absolute inset-0 m-auto w-5 h-5 text-indigo-600 opacity-20" />
                 </div>
               </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden bg-white group hover:translate-y-[-2px] transition-all duration-300">
              <CardContent className="p-6">
                 <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-red-50 rounded-lg group-hover:scale-110 transition-transform">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded">Critical</span>
                 </div>
                 <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Open Major NCs</span>
                    <div className="text-3xl font-black text-slate-900 tracking-tighter tabular-nums">{allNCs.length}</div>
                 </div>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden bg-white group hover:translate-y-[-2px] transition-all duration-300">
              <CardContent className="p-6">
                 <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-indigo-50 rounded-lg group-hover:scale-110 transition-transform">
                      <RefreshCcw className="w-4 h-4 text-indigo-600" />
                    </div>
                 </div>
                 <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Active CAPAs</span>
                    <div className="text-3xl font-black text-slate-900 tracking-tighter tabular-nums">3</div>
                 </div>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden bg-white group hover:translate-y-[-2px] transition-all duration-300">
              <CardContent className="p-6">
                 <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:scale-110 transition-transform">
                      <Book className="w-4 h-4 text-blue-600" />
                    </div>
                 </div>
                 <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Mapped Clauses</span>
                    <div className="text-3xl font-black text-slate-900 tracking-tighter tabular-nums">142</div>
                 </div>
              </CardContent>
            </Card>
          </div>

          {/* Global Non-Conformance Register */}
          <Card className="border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden bg-white">
            <CardHeader className="py-5 px-6 border-b border-slate-50 bg-slate-50/30 flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Non-Conformance & CAPA Register</CardTitle>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aggregated evidence-based violations</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                  <Input placeholder="Search observations..." className="h-8 w-48 pl-8 text-[10px] bg-white border-slate-200" />
                </div>
                <Button variant="outline" size="sm" className="h-8 px-3 border-slate-200 text-[10px] font-black uppercase tracking-widest gap-2">
                  <Filter className="w-3 h-3" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="hover:bg-transparent border-slate-100">
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-6 h-12">Log Date</TableHead>
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-6 h-12">Reference ID</TableHead>
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-6 h-12">Compliance Gap</TableHead>
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-6 h-12">Nature of Failure</TableHead>
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-6 h-12">Auditor</TableHead>
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-6 h-12">Status</TableHead>
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-6 h-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allNCs.map((nc) => (
                    <TableRow key={nc.id} className="group hover:bg-slate-50/50 transition-colors border-slate-50">
                      <TableCell className="px-6 py-5 text-[10px] font-bold text-slate-400 tabular-nums uppercase whitespace-nowrap">
                        {new Date(nc.timestamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-blue-600 tracking-tighter">{nc.docId}</span>
                          <span className="text-[9px] font-bold text-slate-400 truncate max-w-[120px]">{nc.docName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                          <span className="text-xs font-black text-slate-900 tracking-tight">{nc.requirement || "Process Deviation"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-5">
                        <p className="text-[11px] font-bold text-slate-600 line-clamp-1 max-w-[300px]">{nc.failure || nc.text}</p>
                      </TableCell>
                      <TableCell className="px-6 py-5">
                         <span className="text-[9px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-tighter whitespace-nowrap">
                           {nc.author}
                         </span>
                      </TableCell>
                      <TableCell className="px-6 py-5">
                        <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
                          <AlertCircle className="w-3 h-3 text-red-500" />
                          <span className="text-[10px] font-black text-red-600 uppercase tracking-tighter">Open Major NC</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-5 text-right">
                        <Button variant="ghost" size="icon" onClick={() => window.location.href=`/documents/${nc.docId}`} className="h-8 w-8 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg">
                          <ArrowUpRight className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {allNCs.length === 0 && (
                    <TableRow className="hover:bg-transparent">
                      <TableCell colSpan={7} className="h-48 text-center text-slate-300">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <ShieldCheck className="w-12 h-12 opacity-10" />
                          <div className="space-y-1">
                            <p className="text-xs font-black uppercase tracking-[0.2em]">0 Major Violations Detected</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Compliance Registry is currently healthy</p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
            <Card className="border-slate-100 shadow-xl shadow-slate-200/30 overflow-hidden bg-white">
              <CardHeader className="py-4 px-6 border-b border-slate-50 bg-slate-50/30">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Corrective Action Pipeline (CAPA)</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { title: "Risk Mitigation: Vendor Control", status: "In Progress", progress: 65, color: "indigo" },
                    { title: "SOP-ENG Refactoring", status: "Review", progress: 88, color: "emerald" },
                    { title: "Lab Safety Protocol Update", status: "Drafting", progress: 20, color: "amber" }
                  ].map((capa, i) => (
                    <div key={i} className="p-4 rounded-2xl border border-slate-50 bg-slate-50/30 space-y-3">
                      <div className="flex justify-between items-start">
                        <p className="text-[11px] font-black text-slate-900 tracking-tight">{capa.title}</p>
                        <span className={cn(
                          "text-[9px] font-black px-2 py-0.5 rounded uppercase",
                          capa.color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
                          capa.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                          "bg-amber-50 text-amber-600"
                        )}>{capa.status}</span>
                      </div>
                      <Progress value={capa.progress} className={`h-1.5 [&>div]:bg-indigo-600`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-xl shadow-slate-200/30 overflow-hidden bg-white">
              <CardHeader className="py-4 px-6 border-b border-slate-50 bg-slate-50/30">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Regulatory Watchlist</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {clauses.map((clause, i) => (
                   <div key={i} className="px-6 py-4 flex items-center justify-between border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="text-[10px] font-black text-indigo-600 bg-indigo-50 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                          {clause.id}
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-slate-900">{clause.description}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{clause.standard} • {clause.docs} Attached Docs</p>
                        </div>
                      </div>
                      <StatusIndicator status={clause.status} />
                   </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusIndicator({ status }) {
  const isErr = status === "Gap Identified" || status === "Needs Review";
  return (
    <div className="flex items-center gap-1.5">
      <div className={cn("w-1.5 h-1.5 rounded-full", isErr ? "bg-amber-500 animate-pulse" : "bg-emerald-500")} />
      <span className={cn("text-[9px] font-black uppercase tracking-tighter", isErr ? "text-amber-600" : "text-emerald-600")}>{status}</span>
    </div>
  );
}
