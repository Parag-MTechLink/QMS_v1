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
  Sparkles,
  RefreshCcw,
  Zap
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

const clauses = [
  { id: "4.1", description: "Understanding the organization and its context", standard: "ISO 9001", docs: 3, status: "Compliant" },
  { id: "6.1.2", description: "Information security risk assessment", standard: "ISO 27001", docs: 1, status: "Needs Review" },
  { id: "8.2", description: "Emergency preparedness and response", standard: "ISO 14001", docs: 0, status: "Gap Identified" },
  { id: "7.2", description: "Competence", standard: "ISO 9001", docs: 5, status: "Compliant" }
];

export default function Compliance() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Compliance & Standards</h1>
          <p className="text-sm text-gray-500">Track standards mapping and compliance gaps across your organization.</p>
        </div>
        <Button className="h-9 bg-indigo-600 hover:bg-indigo-700 text-white">New Document</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-9 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-gray-200">
               <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
                 <div className="relative w-24 h-24">
                   <svg className="w-full h-full transform -rotate-90">
                     <circle cx="48" cy="48" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" className="stroke-slate-100" />
                     <circle cx="48" cy="48" r="40" stroke="#2563eb" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="30.14" className="stroke-blue-600 transition-all duration-1000 ease-out" />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-xl font-black text-gray-900">88%</span>
                     <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest leading-none">Overall</span>
                   </div>
                 </div>
               </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                   <div className="p-2 bg-blue-50 rounded-lg">
                     <Book className="w-4 h-4 text-blue-600" />
                   </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">8</span>
                  <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-gray-400">
                    Monitored Standards
                    <span className="text-green-600 flex items-center h-min mt-0.5"><Zap className="w-2.5 h-2.5 fill-current" />+1</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                   <div className="p-2 bg-indigo-50 rounded-lg">
                     <LayoutList className="w-4 h-4 text-indigo-600" />
                   </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">142</span>
                  <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-gray-400">
                    Mapped Clauses
                    <span className="text-slate-400 h-min mt-0.5">—</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                   <div className="p-2 bg-red-50 rounded-lg">
                     <AlertTriangle className="w-4 h-4 text-red-600" />
                   </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">12</span>
                  <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-gray-400">
                    Identified Gaps
                    <span className="text-red-600 flex items-center h-min mt-0.5"><Zap className="w-2.5 h-2.5 fill-current" />+3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Standards Coverage</h3>
              <Button variant="ghost" className="text-blue-600 font-bold text-xs uppercase tracking-widest p-1 h-auto">View All</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[ 
                { name: "ISO 9001:2015", area: "Quality Management", p: 92, clauses: "64/70 Clauses", style: "blue" },
                { name: "ISO 27001:2022", area: "Information Security", p: 76, clauses: "86/114 Clauses", style: "amber" },
                { name: "ISO 14001:2015", area: "Environmental Management", p: 45, clauses: "23/62 Clauses", style: "red" }
              ].map((iso) => (
                <Card key={iso.name} className="border-gray-200 shadow-sm group">
                  <CardContent className="p-6 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-base font-black text-slate-900">{iso.name}</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider h-4">{iso.area}</span>
                      </div>
                      <span className={cn(
                        "text-[10px] font-black px-2 py-0.5 rounded-full uppercase",
                        iso.style === "blue" ? "bg-green-50 text-green-700" : iso.style === "amber" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                      )}>
                        {iso.p}%
                      </span>
                    </div>

                    <div className="space-y-2">
                       <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                         <div 
                           className={cn("h-full rounded-full transition-all duration-1000", iso.style === "blue" ? "bg-green-500" : iso.style === "amber" ? "bg-blue-500" : "bg-red-500")}
                           style={{ width: `${iso.p}%` }}
                         />
                       </div>
                       <div className="flex justify-between text-[8px] font-black uppercase text-gray-400 tracking-widest">
                         <span>Coverage</span>
                         <span>{iso.clauses}</span>
                       </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
                       <div className="flex items-center gap-1 text-[10px] text-gray-400">
                         <FileText className="w-3 h-3" />
                         128 Docs
                       </div>
                       <Button variant="link" className="text-blue-600 text-[10px] p-0 font-black uppercase tracking-widest gap-1">
                         Details <ArrowRight className="w-2.5 h-2.5" />
                       </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
             <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Clause Coverage</h3>
             </div>
             <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="relative min-w-[260px] flex-1 max-w-md">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input className="h-9 border-gray-200 bg-gray-50 pl-9 text-sm focus:bg-white" placeholder="Search clauses, standards, or keywords..." />
                </div>
                <Button variant="outline" className="text-xs h-9 px-3 rounded-md border-gray-200 gap-2">
                  <Filter className="w-3 h-3" />
                  Filter
                </Button>
             </div>
             
             <Card className="border-gray-200 shadow-sm overflow-hidden bg-white">
                <Table>
                  <TableHeader className="bg-gray-50/50">
                    <TableRow className="hover:bg-transparent border-gray-200">
                      <TableHead className="w-[120px] text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">Clause ID</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">Description</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">Standard</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4 text-center">Docs</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clauses.map((c, i) => (
                      <TableRow key={i} className="group hover:bg-slate-50 transition-colors border-gray-50">
                        <TableCell className="px-6 py-5 font-black text-slate-700 text-xs tracking-wider">{c.id}</TableCell>
                        <TableCell className="px-6 py-5 text-xs font-semibold text-slate-500 leading-relaxed max-w-sm">{c.description}</TableCell>
                        <TableCell className="px-6 py-5 text-[10px] font-black text-slate-900 flex items-center gap-1.5 h-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                          {c.standard}
                        </TableCell>
                        <TableCell className="px-6 py-5 text-center text-xs font-bold text-slate-600">{c.docs}</TableCell>
                        <TableCell className="px-6 py-5">
                          <div className={cn(
                            "px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit uppercase tracking-widest border",
                            c.status === "Compliant" ? "bg-green-50 text-green-700 border-green-100" : 
                            c.status === "Needs Review" ? "bg-amber-50 text-amber-700 border-amber-100" :
                            "bg-red-50 text-red-700 border-red-100"
                          )}>
                            {c.status}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Showing <span className="text-slate-900">1 to 4</span> of 142 entries
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="h-8 w-8 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 disabled:opacity-30" disabled>&lt;</button>
                    <button className="h-8 w-8 rounded-md bg-blue-600 text-white font-black text-[11px] shadow-lg shadow-blue-200">1</button>
                    <button className="h-8 w-8 rounded-md font-black text-[11px] text-slate-500 hover:bg-gray-100 transition-colors">2</button>
                    <button className="h-8 w-8 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">&gt;</button>
                  </div>
                </div>
             </Card>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <Card className="border-gray-200 shadow-xl shadow-slate-200/50 bg-white sticky top-20">
            <CardHeader className="pb-2 border-b border-gray-50 flex flex-row items-center justify-between">
               <CardTitle className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] flex items-center gap-2">
                 <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                 AI Insights
               </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
               {/* Gap Detected Alert */}
               <div className="p-4 border-l-4 border-red-500 bg-red-50/50 rounded-r-lg space-y-1.5 transition-all hover:bg-red-50">
                  <div className="flex items-center gap-2 mb-1">
                    <BadgeAlert className="w-4 h-4 text-red-600" />
                    <span className="text-xs font-black text-red-900 uppercase tracking-wide">Gap Detected</span>
                  </div>
                  <p className="text-[11px] font-medium text-red-700 leading-relaxed">
                    Document <span className="font-black">POL-ENV-01</span> needs update to map to ISO 14001 Clause 8.2 (Emergency Response). Last updated 18 months ago.
                  </p>
               </div>

               {/* Standard Update Alert */}
               <div className="p-4 border-l-4 border-amber-500 bg-amber-50/50 rounded-r-lg space-y-1.5 transition-all hover:bg-amber-50">
                  <div className="flex items-center gap-2 mb-1">
                    <RefreshCcw className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-black text-amber-900 uppercase tracking-wide">Standard Update</span>
                  </div>
                  <p className="text-[11px] font-medium text-amber-700 leading-relaxed">
                    ISO 27001:2022 transition deadline approaching. 14 documents still require review against new Annex A controls.
                  </p>
               </div>

               {/* Optimization Alert */}
               <div className="p-4 border-l-4 border-green-500 bg-green-50/50 rounded-r-lg space-y-1.5 transition-all hover:bg-green-50">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-black text-green-900 uppercase tracking-wide">Optimization</span>
                  </div>
                  <p className="text-[11px] font-medium text-green-700 leading-relaxed">
                    Found 3 duplicate policies covering ISO 9001 Clause 7.2. Consolidating could improve compliance efficiency.
                  </p>
               </div>

               <div className="pt-4 mt-4 border-t border-gray-100 flex justify-center">
                 <Button variant="outline" className="w-full text-[10px] font-black uppercase tracking-widest h-10 border-gray-200 text-gray-500 hover:text-blue-600 transition-all">
                   View All Insights
                 </Button>
               </div>
            </CardContent>
          </Card>

          {/* Bottom Card in sidebar */}
          <Card className="border-gray-200 bg-slate-900 p-6 space-y-4">
             <div className="flex flex-col gap-1">
               <div className="text-[10px] uppercase font-black tracking-[0.2em] text-blue-400">System Health Stable</div>
               <div className="text-lg font-black text-white leading-tight">AI Governance Online</div>
             </div>
             <p className="text-xs text-slate-400 leading-relaxed">
               11 actions recommended this week across document review and audit readiness.
             </p>
             <Button className="w-full bg-white text-slate-900 hover:bg-blue-50 font-black text-[10px] uppercase tracking-widest h-10 transition-all">
               View Recommendations
             </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
