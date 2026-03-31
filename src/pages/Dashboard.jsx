import React from "react";
import { cn } from "@/lib/utils";
import { 
  FileEdit, 
  Eye, 
  UserCheck, 
  GraduationCap, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Zap, 
  Activity, 
  ShieldCheck,
  ArrowRight,
  FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const pipelineStages = [
  { icon: FileEdit, label: "Drafting", count: 24, status: "Queued", color: "blue" },
  { icon: Eye, label: "Review", count: 12, status: "Pending", color: "amber" },
  { icon: UserCheck, label: "Approval", count: 5, status: "Escalated", color: "purple" },
  { icon: GraduationCap, label: "Training", count: 38, status: "Assigned", color: "indigo" },
  { icon: CheckCircle, label: "Effective", count: 1204, status: "Compliant", color: "green" },
];

const insights = [
  {
    icon: AlertTriangle,
    title: "Standards update requires controlled document changes",
    description: "ISO 9001 revisions affect 3 SOPs and 1 work instruction tied to supplier qualification workflows.",
    variant: "warning",
    action: "Check"
  },
  {
    icon: Clock,
    title: "Review deadlines are approaching overdue state",
    description: "QM-001 and SOP-004 are within 48 hours of escalation and could affect upcoming audit evidence readiness.",
    variant: "info",
    action: "Notify owners"
  },
  {
    icon: Zap,
    title: "Workflow inefficiency detected in approval handoff",
    description: "Average approval cycle time for procedures increased by 2.4 days after legal review was added as a sequential step.",
    variant: "error",
    action: "Analyze"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold uppercase rounded border border-green-200 tracking-wider">Operational Overview</span>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded border border-slate-200 tracking-wider">QMS</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">Quality Operations</h1>
          <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
            Monitor document lifecycle throughput, review risks, and compliance posture at a glance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="h-9 border-gray-200 bg-white text-xs font-semibold">
            Export snapshot
          </Button>
          <Button className="h-9 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm">
            Create document
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Quality pulse</div>
                <div className="mt-2 text-3xl font-black text-slate-900 tabular-nums">96.4</div>
              </div>
              <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-700">+4.3 WoW</span>
            </div>
            <div className="mt-3 text-xs text-gray-500">Composite score across audits, reviews, and CAPA closure.</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-5">
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Pending reviews</div>
            <div className="mt-2 text-3xl font-black text-slate-900 tabular-nums">18</div>
            <div className="mt-3 text-xs text-gray-500">Items requiring review within 7 days.</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-5">
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Open gaps</div>
            <div className="mt-2 text-3xl font-black text-slate-900 tabular-nums">7</div>
            <div className="mt-3 text-xs text-gray-500">Unmapped clauses and missing evidence.</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-5">
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Critical risks</div>
            <div className="mt-2 text-3xl font-black text-red-600 tabular-nums">3</div>
            <div className="mt-3 text-xs text-gray-500">Escalations likely to affect audit readiness.</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200 shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 bg-gray-50/30 px-6 py-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-600" />
            <CardTitle className="text-sm font-bold text-gray-800">Document Lifecycle Pipeline</CardTitle>
          </div>
          <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold uppercase rounded border border-green-200 tracking-wider flex items-center gap-1">
            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
            Live operations monitor
          </span>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
            
            {pipelineStages.map((stage) => (
              <div key={stage.label} className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="bg-white p-1 rounded-full mb-3 ring-1 ring-gray-100">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all group-hover:scale-110",
                    stage.color === "blue" && "bg-blue-50 text-blue-600",
                    stage.color === "amber" && "bg-amber-50 text-amber-600",
                    stage.color === "purple" && "bg-purple-50 text-purple-600",
                    stage.color === "indigo" && "bg-indigo-50 text-indigo-600",
                    stage.color === "green" && "bg-green-50 text-green-600",
                  )}>
                    <stage.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-lg font-bold text-gray-900">{stage.count}</div>
                <div className="text-xs font-semibold text-gray-500 mb-2">{stage.label}</div>
                <div className={cn(
                  "px-2 py-0.5 text-[9px] font-bold uppercase rounded-md tracking-wider border",
                  stage.color === "blue" && "bg-blue-50 text-blue-700 border-blue-100",
                  stage.color === "amber" && "bg-amber-50 text-amber-700 border-amber-100",
                  stage.color === "purple" && "bg-purple-50 text-purple-700 border-purple-100",
                  stage.color === "indigo" && "bg-indigo-50 text-indigo-700 border-indigo-100",
                  stage.color === "green" && "bg-green-50 text-green-700 border-green-100",
                )}>
                  {stage.status}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              <h2 className="text-lg font-bold text-gray-900">Insights</h2>
            </div>
            <span className="text-xs text-gray-400 font-medium tracking-tight">Prioritized by impact</span>
          </div>
          
          <div className="space-y-4">
            {insights.map((insight, idx) => (
              <Card key={idx} className="border-gray-200 shadow-sm hover:border-indigo-200 transition-colors cursor-pointer group">
                <CardContent className="p-5 flex gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                    insight.variant === "warning" && "bg-amber-50 text-amber-600",
                    insight.variant === "info" && "bg-blue-50 text-blue-600",
                    insight.variant === "error" && "bg-red-50 text-red-600",
                  )}>
                    <insight.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-indigo-600 transition-colors">{insight.title}</h3>
                      <Button variant="outline" size="sm" className="h-7 text-[10px] font-bold uppercase tracking-wider rounded border-gray-200 hover:bg-gray-50 px-3">
                        {insight.action}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-md">{insight.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <h2 className="text-lg font-bold text-gray-900">Compliance Health</h2>
            </div>
            <span className="text-xs text-gray-400 font-medium tracking-tight">Updated 5 min ago</span>
          </div>

          <Card className="border-gray-200 shadow-sm relative pt-10 pb-6 h-[400px]">
            <CardContent className="flex flex-col items-center">
              <div className="relative w-44 h-44 mb-10">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r="80"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-gray-100"
                  />
                  <circle
                    cx="88"
                    cy="88"
                    r="80"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 80}
                    strokeDashoffset={2 * Math.PI * 80 * (1 - 0.92)}
                    className="text-green-500 transition-all duration-1000 ease-in-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl font-black text-gray-900 tracking-tighter">92%</div>
                  <div className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-1">Healthy posture</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full px-6">
                <div className="bg-gray-50/50 rounded-lg p-3 border border-gray-100">
                  <div className="text-xl font-bold text-slate-800">98%</div>
                  <div className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Audit pass rate</div>
                </div>
                <div className="bg-gray-50/50 rounded-lg p-3 border border-gray-100">
                  <div className="text-xl font-bold text-slate-800">85%</div>
                  <div className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">CAPA success rate</div>
                </div>
                <div className="bg-gray-50/50 rounded-lg p-3 border border-gray-100">
                  <div className="text-xl font-bold text-slate-800">31</div>
                  <div className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Open corrective actions</div>
                </div>
                <div className="bg-gray-50/50 rounded-lg p-3 border border-gray-100">
                  <div className="text-xl font-bold text-red-600">6</div>
                  <div className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Critical findings</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 px-6 py-4">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              Active Quality Documents
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 h-7 px-2">
              View all <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {[
                { id: "SOP-004", name: "Supplier Qualification", type: "Procedure", status: "In Review", owner: "D. Chen", avatar: "https://i.pravatar.cc/150?u=dchen", color: "amber" },
                { id: "QM-001", name: "Global Quality Manual", type: "Manual", status: "Approval", owner: "S. Jenkins", avatar: "https://i.pravatar.cc/150?u=sjenkins", color: "purple" },
                { id: "WI-042", name: "Calibration Process", type: "Work Inst.", status: "Effective", owner: "M. Rowe", avatar: "https://i.pravatar.cc/150?u=mrowe", color: "green" },
              ].map((doc) => (
                <div key={doc.id} className="p-4 flex items-center justify-between group hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:ring-1 group-hover:ring-gray-200 transition-all">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{doc.id} · {doc.name}</div>
                      <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{doc.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className={cn(
                      "px-2 py-0.5 text-[9px] font-bold uppercase rounded-md tracking-wider border",
                      doc.color === "amber" && "bg-amber-50 text-amber-700 border-amber-100",
                      doc.color === "purple" && "bg-purple-50 text-purple-700 border-purple-100",
                      doc.color === "green" && "bg-green-50 text-green-700 border-green-100",
                    )}>
                      {doc.status}
                    </div>
                    <Avatar className="w-6 h-6 border-gray-200">
                      <AvatarImage src={doc.avatar} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 px-6 py-4">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              Reviewer Workload
            </CardTitle>
            <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Bottleneck visibility</span>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {[
              { name: "Marcus Thorne", workload: 82, color: "bg-indigo-600" },
              { name: "Sarah Jenkins", workload: 60, color: "bg-indigo-500" },
              { name: "Alex Morgan", workload: 45, color: "bg-indigo-400" },
              { name: "Elena Rodriguez", workload: 25, color: "bg-indigo-300" },
            ].map((reviewer) => (
              <div key={reviewer.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">{reviewer.name}</span>
                  <span className="text-xs font-black text-gray-900 tabular-nums">{reviewer.workload}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full transition-all duration-1000", reviewer.color)} 
                    style={{ width: `${reviewer.workload}%` }} 
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
