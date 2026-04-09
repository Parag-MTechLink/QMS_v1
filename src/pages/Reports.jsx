import React from "react";
import { BarChart3, Download, Filter, LineChart, PieChart, ShieldCheck, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

function MiniStat({ icon: Icon, label, value, delta, variant }) {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</div>
            <div className="text-2xl font-black text-slate-900 tabular-nums">{value}</div>
          </div>
          {typeof delta === "string" ? (
            <div
              className={cn(
                "rounded-full px-2 py-1 text-[10px] font-bold whitespace-nowrap",
                variant === "green" && "bg-green-50 text-green-700 border border-green-100",
                variant === "blue" && "bg-blue-50 text-blue-700 border border-blue-100",
                variant === "amber" && "bg-amber-50 text-amber-700 border border-amber-100"
              )}
            >
              {delta}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Reports() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reports & Analytics</h1>
          <p className="text-sm text-gray-500">Performance tracking and quality metrics overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 border-gray-200 text-xs">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="h-9 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold">
            New Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MiniStat icon={LineChart} label="Avg. Review Time" value="4.2 days" delta="↓ 12%" variant="green" />
        <MiniStat icon={PieChart} label="Docs in Review" value="56" delta="↑ 5%" variant="amber" />
        <MiniStat icon={Zap} label="Overdue Reviews" value="8" delta="↑ 2" variant="amber" />
        <MiniStat icon={ShieldCheck} label="Training Rate" value="94%" delta="↑ 3%" variant="blue" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <Card className="border-gray-200 shadow-sm xl:col-span-8">
          <CardHeader className="px-6 py-4 border-b border-gray-100 flex flex-row items-center justify-between bg-gray-50/30">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-gray-800">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              Review Trends
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="text-xs font-bold text-gray-500 bg-white rounded-md border border-gray-200 px-3 py-1">
                Last 6 months
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="rounded-xl border border-gray-100 bg-white p-5">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span>Average review duration</span>
                <span className="font-bold text-gray-700">trend</span>
              </div>
              <svg viewBox="0 0 800 220" className="w-full h-[160px]" role="img" aria-label="Review trends chart">
                <defs>
                  <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M40 160 C160 160, 160 120, 280 120 S 420 150, 520 110 S 650 140, 760 70" fill="none" stroke="#4f46e5" strokeWidth="4" />
                <path d="M40 160 C160 160, 160 120, 280 120 S 420 150, 520 110 S 650 140, 760 70 L760 200 L40 200 Z" fill="url(#g)" />
                <circle cx="280" cy="120" r="6" fill="#4f46e5" />
                <circle cx="520" cy="110" r="6" fill="#4f46e5" opacity="0.85" />
                <circle cx="760" cy="70" r="6" fill="#4f46e5" opacity="0.85" />
                <g stroke="#e5e7eb">
                  <line x1="40" y1="160" x2="760" y2="160" />
                  <line x1="40" y1="110" x2="760" y2="110" />
                  <line x1="40" y1="60" x2="760" y2="60" />
                </g>
                <g fill="#6b7280" fontSize="12">
                  <text x="80" y="195">Jan</text>
                  <text x="220" y="195">Mar</text>
                  <text x="360" y="195">Apr</text>
                  <text x="520" y="195">May</text>
                  <text x="680" y="195">Jun</text>
                </g>
              </svg>
            </div>
          </CardContent>
        </Card>

        <div className="xl:col-span-4 space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="px-6 py-4 border-b border-gray-100 flex flex-row items-center justify-between bg-gray-50/30">
              <CardTitle className="text-sm font-bold text-gray-800">Compliance Score</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">
                Details
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-gray-400">Overall</div>
                  <div className="text-3xl font-black text-slate-900 tabular-nums mt-1">88%</div>
                </div>
                <div className="rounded-full bg-green-50 border border-green-100 text-green-700 text-[10px] font-bold px-3 py-1">
                  +2.4%
                </div>
              </div>
              <div className="mt-4">
                <Progress value={88} className="[&>div]:bg-green-600" />
              </div>
              <div className="mt-3 text-xs text-gray-500">Based on compliance evidence completeness.</div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="px-6 py-4 border-b border-gray-100 flex flex-row items-center justify-between bg-gray-50/30">
              <CardTitle className="text-sm font-bold text-gray-800">Document Lifecycle</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="flex items-center justify-center">
                  <div className="relative w-28 h-28">
                    <svg viewBox="0 0 120 120" className="w-28 h-28">
                      <circle cx="60" cy="60" r="46" stroke="#f59e0b" strokeWidth="12" fill="none" opacity="0.2" />
                      <circle cx="60" cy="60" r="46" stroke="#f59e0b" strokeWidth="12" fill="none" strokeDasharray="289" strokeDashoffset="85" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-lg font-black text-slate-900 tabular-nums">1.2k</div>
                      <div className="text-[10px] text-gray-500 -mt-1">Total</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Effective", color: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
                    { label: "Review", color: "bg-indigo-500", bg: "bg-indigo-50", text: "text-indigo-700" },
                    { label: "Approval", color: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700" },
                    { label: "Draft", color: "bg-slate-400", bg: "bg-slate-50", text: "text-slate-600" },
                  ].map((x) => (
                    <div key={x.label} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className={cn("w-2 h-2 rounded-full", x.color)} />
                        <span className="text-gray-600">{x.label}</span>
                      </div>
                      <span className="font-bold text-gray-900">
                        {x.label === "Effective" ? "(65%)" : x.label === "Review" ? "(20%)" : x.label === "Approval" ? "(10%)" : "(5%)"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <Card className="border-gray-200 shadow-sm xl:col-span-8">
          <CardHeader className="px-6 py-4 border-b border-gray-100 flex flex-row items-center justify-between bg-gray-50/30">
            <CardTitle className="text-sm font-bold text-gray-800">Document Activity Report</CardTitle>
            <Button variant="outline" className="h-8 px-3 text-xs border-gray-200">
              Export Report
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 text-xs text-gray-500 border-b border-gray-100">
              This section shows recent activity entries (mock data).
            </div>
            <div className="px-6 py-6 text-xs text-gray-600">
              Activity table placeholder. (If you want, I can replace this with a real table like the other pages.)
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm xl:col-span-4">
          <CardHeader className="px-6 py-4 border-b border-gray-100 flex flex-row items-center justify-between bg-gray-50/30">
            <CardTitle className="text-sm font-bold text-gray-800">Filters</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Search</div>
              <Input className="bg-gray-50 border-gray-200" placeholder="Filter activity..." />
            </div>
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Quick filters</div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" className="h-8 border-gray-200">
                  Last 6 months
                </Button>
                <Button variant="outline" size="sm" className="h-8 border-gray-200">
                  Dept: All
                </Button>
              </div>
            </div>
            <Button className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold">
              Apply Filters
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

