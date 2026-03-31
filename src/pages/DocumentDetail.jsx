import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  Share2, 
  MessageSquare, 
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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link to="/documents">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quality Manual 2024</h1>
            <div className="mt-1 text-xs text-gray-500">Document ID: {id || "QM-001"} · Version v4.0</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 border-gray-200">
            <Printer className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-9 border-gray-200">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-9 border-gray-200">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <Card className="overflow-hidden border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100 bg-slate-50/60 px-5 py-3">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-3">
                  <span>100%</span>
                  <Separator orientation="vertical" className="h-3" />
                  <span>Page 1 of 24</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Minus className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Plus className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="bg-slate-100/60 p-6">
              <div className="mx-auto min-h-[820px] max-w-3xl rounded-md border border-gray-200 bg-white p-10 shadow-sm">
                <div className="space-y-3 border-b border-gray-200 pb-8">
                  <div className="text-xs uppercase tracking-widest text-gray-400">Quality Management Document</div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">QUALITY MANUAL</h2>
                  <div className="text-sm text-gray-500">Enterprise Standard Operating Procedure</div>
                </div>

                <div className="space-y-8 pt-8 text-slate-700">
                  <section>
                    <h3 className="text-3xl font-semibold text-slate-900">Quality Manual 2024</h3>
                    <p className="mt-2 text-base leading-8">
                      This Quality Manual describes the Quality Management System (QMS) established, implemented, and maintained by MS Enterprise. It applies to all activities related to the design, development, manufacturing, and distribution of our products.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-2xl font-semibold text-slate-900">1. Scope and Application</h4>
                    <p className="mt-2 text-base leading-8">
                      The scope of this QMS encompasses all operational facilities and departments globally. This manual outlines the policies, procedures, and responsibilities required to ensure compliance with ISO 9001:2015 standards and relevant regulatory requirements.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-2xl font-semibold text-slate-900">2. Normative References</h4>
                    <ul className="mt-2 list-disc space-y-2 pl-6 text-base leading-8">
                      <li>ISO 9000:2015 Quality management systems - Fundamentals and vocabulary</li>
                      <li>ISO 9001:2015 Quality management systems - Requirements</li>
                      <li>Internal Standard Operating Procedures (SOPs) as listed in the Master Document Index</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-2xl font-semibold text-slate-900">3. Terms and Definitions</h4>
                    <p className="mt-2 text-base leading-8">
                      For the purposes of this document, the terms and definitions given in ISO 9000:2015 apply. Specific internal acronyms are defined in the Enterprise Glossary (DOC-GLOS-01).
                    </p>
                  </section>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-4 space-y-4">
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
          <div className="space-y-2">
            <Button className="h-11 w-full bg-indigo-600 hover:bg-indigo-700 text-white">Edit Document</Button>
            <Button variant="outline" className="h-11 w-full border-gray-200">Create New Version</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
