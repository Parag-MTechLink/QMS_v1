import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock, Filter, Search, MoreVertical, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

const approvals = [
  {
    id: "QM-001",
    title: "Global Quality Manual 2024",
    type: "Manual",
    requester: "Alex Morgan",
    due: "Oct 28, 2023",
    status: "Under Approval",
  },
  {
    id: "SOP-ENG-12",
    title: "Equipment Calibration SOP",
    type: "SOP",
    requester: "James Reed",
    due: "Nov 02, 2023",
    status: "Under Review",
  },
  {
    id: "WI-042",
    title: "Calibration Process",
    type: "Work Inst.",
    requester: "M. Rowe",
    due: "Nov 09, 2023",
    status: "Released / Effective",
  },
  {
    id: "POL-QA-22",
    title: "Corrective Action Policy",
    type: "Policy",
    requester: "Alex Morgan",
    due: "Nov 16, 2023",
    status: "Rework",
  },
];

export default function Approvals() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Approvals</h1>
          <p className="text-sm text-gray-500">Review and approve document changes before release.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 border-gray-200 text-xs">
            Export approvals
          </Button>
          <Button className="h-9 bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
            Batch approve
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative min-w-[260px] flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              className="h-9 border-gray-200 bg-gray-50 pl-9 text-sm focus:bg-white"
              placeholder="Search by document, requester, or ID..."
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-9 px-3 text-xs border-gray-200">
              <Filter className="w-3.5 h-3.5 mr-2" />
              Filter
            </Button>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs font-semibold text-gray-700">Due soon</span>
            </div>
          </div>
        </div>
      </div>

      <Card className="border-gray-200 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-5 py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            Pending approvals
          </CardTitle>
          <span className="text-xs text-gray-500">Showing {approvals.length} items</span>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="hover:bg-transparent border-gray-200">
                <TableHead className="w-[320px]">Document</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvals.map((row) => (
                <TableRow key={row.id} className="group hover:bg-slate-50 transition-colors border-gray-100">
                  <TableCell className="py-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center text-gray-500">
                        <Eye className="w-4 h-4" />
                      </div>
                      <div className="leading-tight">
                        <Link
                          to={`/documents/${row.id}`}
                          className="text-sm font-bold text-slate-900 hover:text-indigo-700 transition-colors"
                        >
                          {row.title}
                        </Link>
                        <div className="text-[11px] text-gray-500 font-medium mt-1">{row.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">{row.type}</TableCell>
                  <TableCell className="text-xs text-slate-500">{row.requester}</TableCell>
                  <TableCell className="text-xs text-slate-500 tabular-nums">{row.due}</TableCell>
                  <TableCell>
                    <StatusBadge status={row.status} />
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        className={cn(
                          "h-8 px-3 text-xs font-bold rounded-md",
                          row.status === "Released / Effective" ? "bg-green-600 hover:bg-green-700 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        )}
                      >
                        Review
                      </Button>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Showing <span className="font-semibold text-gray-900">1 to {approvals.length}</span> of{" "}
          <span className="font-semibold text-gray-900">12</span> approvals
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-md" disabled>
            &lt;
          </Button>
          <Button size="sm" className="h-8 px-3 rounded-md bg-indigo-600 text-white text-xs font-bold">
            1
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-3 rounded-md text-xs text-slate-500">
            2
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-3 rounded-md text-xs text-slate-500">
            3
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-md border-gray-200">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}

