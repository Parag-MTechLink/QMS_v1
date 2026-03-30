import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  Share2, 
  MessageSquare, 
  History,
  CheckCircle2,
  Clock,
  User,
  MoreVertical,
  Minus,
  Plus,
  FileText,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/ui/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DocumentDetail() {
  const { id } = useParams();
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white hover:shadow-sm transition-all" asChild>
            <Link to="/documents">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Document details</span>
              <Separator orientation="vertical" className="h-3" />
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{id || "QM-001"}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Quality Manual 2024</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 px-3 gap-2 border-gray-200">
            <Printer className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-9 px-3 gap-2 border-gray-200">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-9 px-3 gap-2 border-gray-200">
            <Share2 className="w-4 h-4" />
          </Button>
          <div className="h-6 w-px bg-gray-200 mx-2" />
          <Button className="h-9 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm">
            Create New Version
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-gray-200 shadow-xl shadow-slate-200/50 min-h-[800px] relative overflow-hidden bg-white">
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />
            <CardContent className="p-12">
              <div className="flex justify-between items-start mb-16">
                <div className="w-24 h-24 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-indigo-600 opacity-20" />
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-1">Controlled Document</div>
                  <div className="text-xs font-bold text-slate-800">ID: QM-001</div>
                  <div className="text-xs font-bold text-slate-800">Revision: v4.0</div>
                  <div className="text-xs font-bold text-slate-800">Effective: Oct 24, 2023</div>
                </div>
              </div>

              <div className="max-w-2xl mx-auto space-y-12">
                <section className="text-center space-y-4">
                  <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Quality Manual 2024</h1>
                  <p className="text-slate-500 uppercase tracking-[0.3em] font-bold text-[10px]">Enterprise Standard Operating Procedure</p>
                  <Separator className="w-24 mx-auto bg-indigo-600 h-1 rounded-full" />
                </section>

                <section className="space-y-6 pt-10">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                      <span className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center text-xs">1.0</span>
                      Scope and Application
                    </h2>
                    <p className="text-slate-600 leading-relaxed indent-8">
                      This Quality Manual describes the Quality Management System (QMS) established, implemented, and maintained by MS Enterprise. It applies to all activities related to the design, development, manufacturing, and distribution of our products globally.
                    </p>
                    <p className="text-slate-600 leading-relaxed indent-8">
                      The scope of this QMS encompasses all operational facilities and departments. This manual outlines the policies, procedures, and responsibilities required to ensure compliance with ISO 9001:2015 standards and relevant regulatory requirements.
                    </p>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                      <span className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center text-xs">2.0</span>
                      Normative References
                    </h2>
                    <ul className="space-y-3 pl-12 list-disc text-slate-600">
                      <li>ISO 9000:2015 Quality management systems — Fundamentals and vocabulary</li>
                      <li>ISO 9001:2015 Quality management systems — Requirements</li>
                      <li>Internal Standard Operating Procedures (SOPs) as listed in the Master Document Index</li>
                    </ul>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                      <span className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center text-xs">3.0</span>
                      Terms and Definitions
                    </h2>
                    <p className="text-slate-600 leading-relaxed indent-8">
                      For the purposes of this document, the terms and definitions given in ISO 9000:2015 apply. Specific internal acronyms are defined in the Enterprise Glossary (DOC-GLOS-01).
                    </p>
                  </div>
                </section>
              </div>
            </CardContent>
            
            <div className="h-20 bg-slate-50 border-t border-gray-100 mt-20 flex items-center justify-center gap-8">
              <div className="flex flex-col items-center">
                <div className="text-[10px] uppercase font-bold text-gray-400">Page</div>
                <div className="text-sm font-bold text-slate-900">1 / 24</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded bg-white border-gray-200">
                  <Minus className="w-3 h-3" />
                </Button>
                <div className="text-xs font-bold w-12 text-center">100%</div>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded bg-white border-gray-200">
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Document Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-50 uppercase tracking-wider">
                <span className="text-[10px] font-bold text-gray-400">Document ID</span>
                <span className="text-[10px] font-black text-slate-900">QM-001</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50 uppercase tracking-wider">
                <span className="text-[10px] font-bold text-gray-400">Type</span>
                <span className="text-[10px] font-black text-slate-900">Policy</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50 uppercase tracking-wider">
                <span className="text-[10px] font-bold text-gray-400">Version</span>
                <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 rounded">v4.0</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50 uppercase tracking-wider">
                <span className="text-[10px] font-bold text-gray-400">Department</span>
                <span className="text-[10px] font-black text-slate-900">Quality Assurance</span>
              </div>
              <div className="pt-2">
                <StatusBadge status="Released / Effective" className="w-full justify-center py-1.5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600" />
                Workflow Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 pl-2 pt-2">
                {[
                  { label: "Drafted", date: "Oct 20, 2023", owner: "Alex Morgan", status: "complete" },
                  { label: "Reviewed", date: "Oct 22, 2023", owner: "Quality Team", status: "complete" },
                  { label: "Approved", date: "Oct 24, 2023", owner: "QA Director", status: "complete" },
                ].map((step, idx) => (
                  <div key={idx} className="relative flex gap-4">
                    {idx < 2 && <div className="absolute left-2 top-4 w-px h-10 bg-green-500" />}
                    <div className="relative z-10 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                    <div className="flex flex-col -mt-1">
                      <span className="text-xs font-bold text-slate-900">{step.label}</span>
                      <span className="text-[10px] text-gray-400">{step.date} by {step.owner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                Recent Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex gap-3 items-start group">
                  <Avatar className="w-8 h-8 border border-gray-100">
                    <AvatarFallback className="text-[10px] bg-slate-100">JR</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-slate-50 rounded-lg p-3 group-hover:bg-white group-hover:ring-1 group-hover:ring-gray-100 transition-all">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black text-slate-900 uppercase">James Reed</span>
                      <span className="text-[10px] text-gray-400">2d ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Section 2 needs minor updates to reflect the new ISO sub-clauses.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group pl-4">
                  <Avatar className="w-8 h-8 border border-gray-100">
                    <AvatarFallback className="text-[10px] bg-indigo-50 text-indigo-700">AM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-slate-50 rounded-lg p-3 group-hover:bg-white group-hover:ring-1 group-hover:ring-gray-100 transition-all border-l-2 border-indigo-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black text-slate-900 uppercase">Alex Morgan</span>
                      <span className="text-[10px] text-gray-400">1d ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Acknowledged. Will include in the v4.1 minor revision next week.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="outline" className="w-full text-xs font-bold border-indigo-100 text-indigo-600 hover:bg-indigo-50 rounded-md py-5">
                  Add Comment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
