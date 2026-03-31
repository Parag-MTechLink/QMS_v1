import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  ChevronRight,
  ShieldCheck,
  Check,
  X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const findings = [
  { level: "HIGH", label: "ISO 9001 — Clause 7.5.3", text: "Document control requirements for external origin documents are not explicitly addressed in Section 4." },
  { level: "MEDIUM", label: "Internal Audit Policy", text: '"The audit frequency "at planned intervals" is vague. Previous auditor recommended "annually at minimum".' },
  { level: "LOW", label: "Clause 3.1", text: "Missing cross-reference to the new Risk Management Procedure (SOP-045)." }
];

export default function ReviewDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link to="/documents" className="rounded-full p-2 hover:bg-slate-100">
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Equipment Calibration SOP</h1>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="outline" className="text-[10px]">ID: {id || "SOP-ENG-12"}</Badge>
              <Badge variant="outline" className="text-[10px]">v2.1</Badge>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1">
          <WorkflowStep label="Draft" status="complete" />
          <WorkflowStep label="Review" status="active" />
          <WorkflowStep label="Approval" status="pending" />
          <WorkflowStep label="Training" status="pending" />
          <WorkflowStep label="Effective" status="pending" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <Card className="xl:col-span-8 border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-base">Document Preview</CardTitle>
          </CardHeader>
          <CardContent className="bg-slate-100/60 p-6">
            <div className="mx-auto max-w-3xl rounded-md border border-gray-200 bg-white p-10 shadow-sm">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900">Equipment Calibration SOP</h2>
                <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                  <div>Document ID: SOP-ENG-12</div>
                  <div>Version: 2.1</div>
                  <div>Department: Engineering</div>
                  <div>Effective Date: TBD</div>
                </div>
                <div className="space-y-6 border-t border-gray-200 pt-6 text-sm leading-7 text-slate-700">
                  <section>
                    <h3 className="text-2xl font-semibold text-slate-900">1. Purpose</h3>
                    <p className="mt-2">This Standard Operating Procedure (SOP) describes the process for the calibration and verification of measuring and test equipment used to ensure product quality.</p>
                  </section>
                  <section>
                    <h3 className="text-2xl font-semibold text-slate-900">2. Scope</h3>
                    <p className="mt-2">This procedure applies to all critical measuring equipment used at the manufacturing facility.</p>
                  </section>
                  <section>
                    <h3 className="text-2xl font-semibold text-slate-900">3. Definitions</h3>
                    <p className="mt-2">Calibration: The set of operations that establish, under specified conditions, the relationship between values of quantities indicated by a measuring instrument or measuring system, and corresponding values realized by standards.</p>
                    <p className="mt-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-900">
                      All critical measuring equipment must be calibrated annually by an accredited third-party laboratory.
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="xl:col-span-4 space-y-4">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Findings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {findings.map((f, i) => (
                <div key={i} className="rounded-lg border border-gray-100 bg-white p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className={cn(
                      "rounded px-1.5 py-0.5 text-[10px] font-bold",
                      f.level === "HIGH" ? "bg-red-50 text-red-700" : f.level === "MEDIUM" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"
                    )}>
                      {f.level}
                    </span>
                    <span className="text-[10px] text-gray-400">{f.label}</span>
                  </div>
                  <p className="text-xs leading-5 text-slate-600">{f.text}</p>
                  <button className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-blue-600">
                    Jump to section <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Review Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-indigo-50 text-[10px] text-indigo-700">SL</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Sarah Lee</div>
                  <p className="mt-1 text-xs text-slate-600">
                    Looks good, but please update references to the old quality manual before final approval.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Compliance Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 rounded-md border border-green-100 bg-green-50 px-3 py-2">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <span className="text-xs font-semibold text-green-800">Low Risk</span>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">ISO/IEC 17025</Badge>
                <Badge variant="outline">Quality Manual v4</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Final Decision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <textarea className="h-24 w-full rounded-md border border-gray-200 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-100" placeholder="Approval comments (optional)..." />
              <Button className="h-11 w-full bg-green-600 hover:bg-green-700 text-white">
                <Check className="mr-2 h-4 w-4" />
                Approve Document
              </Button>
              <Button variant="outline" className="h-11 w-full border-red-200 text-red-600 hover:bg-red-50">
                <X className="mr-2 h-4 w-4" />
                Reject / Revisions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function WorkflowStep({ label, status }) {
  return (
    <div className={cn(
      "flex items-center gap-1 rounded px-3 py-1.5 text-[10px] font-semibold",
      status === "active" ? "bg-blue-600 text-white" : 
      status === "complete" ? "text-slate-700" : "text-slate-400"
    )}>
      {status === "active" && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      {status === "complete" && <Check className="h-3 w-3 text-green-500" />}
      {label}
    </div>
  );
}
