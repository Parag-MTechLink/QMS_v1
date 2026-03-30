import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Printer, 
  Download, 
  Share2, 
  ChevronRight,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  FileText,
  User,
  Clock,
  MoreVertical,
  Plus,
  ExternalLink,
  ShieldCheck,
  Search,
  Check
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tocItems = [
  "1. Introduction",
  "2. Scope",
  "3. Definitions",
  "4. Policy Statement",
  "5. Responsibilities",
  "6. Procedure"
];

const findings = [
  { level: "HIGH", label: "ISO 9001 — Clause 7.5.3", text: "Document control requirements for external origin documents are not explicitly addressed in Section 4." },
  { level: "MEDIUM", label: "Internal Audit Policy", text: '"The audit frequency "at planned intervals" is vague. Previous auditor recommended "annually at minimum".' },
  { level: "LOW", label: "Clause 3.1", text: "Missing cross-reference to the new Risk Management Procedure (SOP-045)." }
];

export default function ReviewDetail() {
  const { id } = useParams();

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-700 bg-slate-50/30">
      {/* Top Breadcrumb/Status Bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-16 z-30">
        <div className="flex items-center gap-6">
          <Link to="/documents" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Equipment Calibration SOP</h1>
              <Badge variant="outline" className="text-[10px] uppercase font-black tracking-widest text-slate-400 border-slate-200">ID: SOP-ENG-12</Badge>
              <Badge variant="outline" className="text-[10px] uppercase font-black tracking-widest text-slate-400 border-slate-200">v2.1</Badge>
            </div>
          </div>
        </div>

        {/* Workflow Breadcrumb */}
        <div className="hidden lg:flex items-center bg-gray-50/50 p-1 rounded-lg border border-gray-100">
          <WorkflowStep label="Draft" status="complete" />
          <WorkflowStep label="Review" status="active" />
          <WorkflowStep label="Approval" status="pending" />
          <WorkflowStep label="Training" status="pending" />
          <WorkflowStep label="Effective" status="pending" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 relative">
        {/* Left Table of Contents */}
        <div className="lg:col-span-2 border-r border-gray-200 bg-white p-6 space-y-8 hidden xl:block">
          <div className="space-y-4">
             <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] px-2 flex items-center gap-2">
               <FileText className="w-3.5 h-3.5" />
               Contents
             </h3>
             <nav className="space-y-1">
               {tocItems.map((item, idx) => (
                 <a 
                   key={idx} 
                   href={`#section-${idx}`} 
                   className={cn(
                     "block px-3 py-2 text-xs font-bold rounded-md transition-all",
                     item === "3. Definitions" ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                   )}
                 >
                   {item}
                 </a>
               ))}
             </nav>
          </div>

          <div className="mt-20 px-2 space-y-4">
            <div className="flex flex-col gap-1 border-t border-gray-50 pt-8 uppercase tracking-[0.15em] text-[10px] font-black">
              <span className="text-gray-400">Metadata</span>
            </div>
            <div className="space-y-3">
              <MetadataRow label="ID" value="SOP-ENG-12" />
              <MetadataRow label="Version" value="v2.1" />
              <MetadataRow label="Owner" value="Engineering" />
            </div>
          </div>
        </div>

        {/* Center Main Preview */}
        <div className="lg:col-span-12 xl:col-span-6 p-8 overflow-y-auto max-h-[calc(100vh-140px)]">
           <Card className="border-gray-200 shadow-xl shadow-slate-200/40 bg-white min-h-[1000px] flex flex-col">
              <CardHeader className="py-6 px-12 border-b border-gray-50 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-black uppercase text-slate-400 tracking-widest leading-none">Document Preview</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400"><Download className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400"><Printer className="w-4 h-4" /></Button>
                </div>
              </CardHeader>
              <CardContent className="p-16 space-y-12 flex-1">
                 {/* SOP Document Content */}
                 <div className="space-y-24 max-w-3xl mx-auto">
                    <header className="text-center space-y-4 pb-12 border-b-2 border-gray-50">
                       <h2 className="text-3xl font-black text-slate-900 tracking-tight">Equipment Calibration Standard Operating Procedure</h2>
                       <div className="grid grid-cols-2 gap-4 text-left max-w-md mx-auto pt-4">
                         <div className="space-y-1">
                           <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Document ID</span>
                           <div className="text-xs font-bold text-slate-900">SOP-ENG-12</div>
                         </div>
                         <div className="space-y-1">
                           <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Department</span>
                           <div className="text-xs font-bold text-slate-900">Engineering</div>
                         </div>
                         <div className="space-y-1">
                           <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Version</span>
                           <div className="text-xs font-bold text-slate-900">2.1</div>
                         </div>
                         <div className="space-y-1">
                           <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Effective Date</span>
                           <div className="text-xs font-bold text-slate-900 italic">TBD</div>
                         </div>
                       </div>
                    </header>

                    <section className="space-y-6">
                      <div className="space-y-3">
                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                          <span className="p-1 bg-slate-900 text-white rounded text-[10px] min-w-[32px] text-center font-bold">1.</span>
                          Purpose
                        </h3>
                        <p className="text-sm font-medium text-slate-600 leading-relaxed indent-8">
                          This Standard Operating Procedure (SOP) describes the process for the calibration and verification of measuring and test equipment used to ensure product quality.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                          <span className="p-1 bg-slate-900 text-white rounded text-[10px] min-w-[32px] text-center font-bold">2.</span>
                          Scope
                        </h3>
                        <p className="text-sm font-medium text-slate-600 leading-relaxed indent-8">
                          This procedure applies to all critical measuring equipment used at the manufacturing facility.
                        </p>
                      </div>

                      <div className="space-y-3 pt-6 relative" id="section-2">
                        <div className="absolute -left-12 -top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Button size="icon" variant="ghost" className="rounded-full bg-blue-50 text-blue-600 h-8 w-8 ring-4 ring-blue-100/50">
                             <Plus className="w-4 h-4" />
                           </Button>
                        </div>
                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                          <span className="p-1 bg-slate-900 text-white rounded text-[10px] min-w-[32px] text-center font-bold">3.</span>
                          Definitions
                        </h3>
                        <div className="p-6 bg-amber-50 rounded-lg border border-amber-100 shadow-sm relative group cursor-pointer transition-all hover:bg-amber-100/30">
                           <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-[9px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-blue-200 flex items-center gap-2">
                             <MessageSquare className="w-2.5 h-2.5" />
                             1
                           </div>
                           <div className="space-y-4">
                             <p className="text-sm font-medium text-slate-600 leading-relaxed">
                               For the purpose of this SOP, the following definitions apply:
                             </p>
                             <div className="pl-4 border-l-2 border-amber-200 space-y-4 font-bold text-slate-700 text-sm">
                               <p className="leading-relaxed">
                                  Calibration: The set of operations that establish, under specified conditions, the relationship between values of quantities indicated by a measuring instrument or measuring system, or values represented by a material measure or a reference material, and the corresponding values realized by standards.
                               </p>
                               <p className="leading-relaxed">
                                 Traceability: The property of the result of a measurement or the value of a standard whereby it can be related to stated references, usually national or international standards, through an unbroken chain of comparisons all having stated uncertainties.
                               </p>
                             </div>
                           </div>
                        </div>
                        
                        <div className="p-6 bg-red-50/50 rounded-lg border-2 border-dashed border-red-200 mt-6 group select-none">
                           <p className="text-sm font-black text-red-800 leading-relaxed">
                             All critical measuring equipment must be calibrated annually by an accredited third-party laboratory.
                           </p>
                        </div>

                        <p className="text-sm font-medium text-slate-600 leading-relaxed pt-4">
                          Internal verifications may be performed quarterly using certified reference standards to ensure ongoing accuracy between formal calibration intervals.
                        </p>
                      </div>
                    </section>
                 </div>
              </CardContent>
           </Card>
        </div>

        {/* Right Task Pane */}
        <div className="lg:col-span-12 xl:col-span-4 p-8 xl:pl-0 border-l border-gray-200 bg-white/50 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
           <div className="flex bg-gray-100/50 p-1 rounded-xl w-full border border-gray-100">
             <button className="flex-1 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Comments</button>
             <button className="flex-1 py-2 text-[10px] font-black uppercase tracking-[0.2em] bg-white text-slate-900 rounded-lg shadow-sm border border-gray-100">Findings</button>
           </div>

           <div className="space-y-8">
              {/* Findings section from image 5 style */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center justify-between">
                  Findings
                  <span className="text-[10px] font-black text-slate-900 bg-slate-100 px-2 rounded-full">3</span>
                </h3>
                <div className="space-y-4">
                   {findings.map((f, i) => (
                     <div key={i} className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm space-y-2 group hover:ring-2 hover:ring-blue-100 transition-all cursor-pointer">
                        <div className="flex justify-between items-center">
                           <div className="flex items-center gap-2">
                             <span className={cn(
                               "text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter",
                               f.level === "HIGH" ? "bg-red-50 text-red-700" : f.level === "MEDIUM" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"
                             )}>
                               {f.level}
                             </span>
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{f.label}</span>
                           </div>
                        </div>
                        <p className="text-[11px] font-medium text-slate-600 leading-relaxed">{f.text}</p>
                        <button className="text-[10px] font-black text-blue-600 hover:text-blue-800 flex items-center gap-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Jump to Section <ChevronRight className="w-2.5 h-2.5" />
                        </button>
                     </div>
                   ))}
                </div>
              </div>

              {/* Review Summary */}
              <Card className="border-gray-200 bg-white/80 shadow-sm border-l-4 border-l-green-500">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                   <CardTitle className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Review Summary</CardTitle>
                   <span className="text-[10px] font-black text-green-700">3/3 Approved</span>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex gap-3 pt-2">
                      <Avatar className="w-8 h-8 ring-2 ring-white">
                        <AvatarFallback className="text-[10px] bg-indigo-50 text-indigo-600">SJ</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-black text-slate-900">Sarah Jenkins</span>
                        <p className="text-[10px] text-slate-500 italic">"Looks good, but please update the references to the old quality manual. Approved with conditions."</p>
                      </div>
                   </div>
                </CardContent>
              </Card>

              {/* Compliance Impact */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Compliance Impact</h3>
                <div className="p-4 bg-green-50/50 border border-green-100 rounded-xl flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="p-2 bg-white rounded-lg border border-green-100">
                       <ShieldCheck className="w-4 h-4 text-green-600" />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-xs font-black text-green-900 leading-none">Low Risk</span>
                       <span className="text-[10px] text-green-600 font-bold uppercase tracking-tight">Standard Update</span>
                     </div>
                   </div>
                   <div className="flex gap-1.5">
                     <span className="text-[8px] font-black bg-white px-2 py-1 rounded text-slate-400 uppercase border border-slate-100">ISO/IEC 17025</span>
                     <span className="text-[8px] font-black bg-white px-2 py-1 rounded text-slate-400 uppercase border border-slate-100">Quality Manual v4</span>
                   </div>
                </div>
              </div>

              {/* Final Decision Section */}
              <Card className="border-slate-900 bg-slate-900 shadow-2xl p-6 space-y-6">
                 <div className="flex flex-col gap-1">
                   <h3 className="text-sm font-black text-white flex items-center gap-2">
                     <ShieldCheck className="w-4 h-4 text-blue-400" />
                     Final Decision
                   </h3>
                   <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Requires Document Controller Approval</span>
                 </div>
                 
                 <div className="space-y-3">
                   <span className="text-[9px] font-black uppercase text-slate-500 tracking-[0.2em]">Approval Comments (Optional)</span>
                   <textarea className="w-full h-24 bg-slate-800 rounded-lg p-3 text-white text-[11px] border border-slate-700 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600" placeholder="Add any final notes..." />
                 </div>

                 <div className="space-y-3">
                   <Button className="w-full h-12 bg-green-500 hover:bg-green-600 text-slate-900 font-black text-xs uppercase tracking-widest gap-2 shadow-lg shadow-green-900/40">
                     <Check className="w-4 h-4" />
                     Approve Document
                   </Button>
                   <Button variant="ghost" className="w-full h-10 text-red-400 border border-red-900/30 hover:bg-red-900/20 font-black text-[10px] uppercase tracking-widest gap-2">
                     <X className="w-4 h-4" />
                     Reject / Revisions
                   </Button>
                 </div>
              </Card>
           </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowStep({ label, status }) {
  return (
    <div className={cn(
      "px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all",
      status === "active" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : 
      status === "complete" ? "text-slate-400 opacity-60" : "text-slate-400"
    )}>
      {status === "active" && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
      {status === "complete" && <Check className="w-3 h-3 text-green-500" />}
      {label}
    </div>
  );
}

function MetadataRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{value}</span>
    </div>
  );
}
