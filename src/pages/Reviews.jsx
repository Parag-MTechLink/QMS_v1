import React from "react";
import { 
  FileText, 
  Clock, 
  AlertCircle, 
  User, 
  ArrowRight,
  Upload,
  MoreVertical,
  CheckCircle2,
  Search,
  Plus
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
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

const history = [
  {
    name: "Lab Safety Protocol v3.0",
    id: "DCR-891",
    type: "MAJOR",
    status: "Pending Review",
    date: "Oct 24, 2023"
  },
  {
    name: "Cleanroom Entry Manual",
    id: "DCR-888",
    type: "ARCHIVAL",
    status: "Under Assessment",
    date: "Oct 19, 2023"
  },
  {
    name: "Calibration Grid Log",
    id: "DCR-874",
    type: "MINOR",
    status: "Approved",
    date: "Oct 12, 2023"
  }
];

export default function Reviews() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Document Change Request</h1>
        <p className="text-sm text-gray-500">Manage lifecycle revisions and archival requests for the precision ledger.</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100/50 p-1 rounded-lg w-fit">
        <button className="px-6 py-2 rounded-md text-sm font-semibold bg-white text-blue-600 shadow-sm border border-gray-100 transition-all">
          Raise Request
        </button>
        <button className="px-6 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
          My Requests
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Form Content */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-8 space-y-8">
              {/* Document Reference section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Document Reference</h3>
                  <div className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-100 uppercase letter-spacing-widest">
                    Effective
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 bg-slate-50/50">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-100">
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h4 className="text-base font-bold text-gray-900">Calibration & Maintenance Protocol</h4>
                    <div className="flex items-center gap-3 text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      <span>Ref: <span className="text-gray-700">SOP-2024-001</span></span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>Version: <span className="text-gray-700">v2.1.0</span></span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>Owner: <span className="text-gray-700">QA Engineering</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selection fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Change Type</label>
                  <div className="relative group">
                    <select className="appearance-none w-full h-11 bg-white border border-gray-200 rounded-lg px-4 text-sm font-medium focus:ring-2 focus:ring-blue-100 transition-all outline-none">
                      <option>Minor Correction</option>
                      <option>Major Revision</option>
                      <option>Procedural Update</option>
                      <option>Archival</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-focus-within:text-blue-600" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Urgency</label>
                  <div className="flex h-11 bg-gray-100/50 p-1 rounded-lg">
                    <button className="flex-1 rounded-md text-xs font-bold bg-white text-gray-900 shadow-sm border border-gray-100 transition-all">Routine</button>
                    <button className="flex-1 rounded-md text-xs font-medium text-gray-500 hover:text-gray-700">Urgent</button>
                    <button className="flex-1 rounded-md text-xs font-medium text-gray-500 hover:text-gray-700">Emergency</button>
                  </div>
                </div>
              </div>

              {/* Textareas */}
              <div className="space-y-3 pt-4">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Reason for Change</label>
                <textarea 
                  className="w-full min-h-[100px] p-4 bg-white border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="Describe the justification for this revision..."
                />
              </div>

              <div className="space-y-3 pt-4">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Proposed Changes</label>
                <textarea 
                  className="w-full min-h-[120px] p-4 bg-white border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="List the specific section updates or content deletions..."
                />
              </div>

              {/* Supporting Evidence (Drag Drop) */}
              <div className="space-y-3 pt-4 pb-4">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Supporting Evidence</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 bg-slate-50/50 flex flex-col items-center justify-center gap-3 group hover:bg-white hover:border-blue-400 transition-all cursor-pointer">
                  <div className="p-3 bg-white rounded-lg border border-gray-100 mb-2 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    Drag files here or <span className="text-blue-600 font-bold">browse</span>
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                    Max 25mb per file • PDF, DOCX, ZIP
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button className="h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-bold shadow-lg shadow-blue-200 transition-all">
                  Submit Change Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar panels */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          <Card className="border-gray-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500 transition-all hover:shadow-md">
            <CardHeader className="pb-2 border-b border-gray-50 bg-slate-50/50">
              <CardTitle className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Request Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium tracking-wide">Auto-generated ID</span>
                <span className="text-xs font-black text-gray-900 uppercase">DCR-2024-0892</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium tracking-wide">Initiated By</span>
                <span className="text-xs font-bold text-gray-900">Marcus Thorne</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium tracking-wide">Routing Path</span>
                <span className="text-[10px] font-black px-2 py-1 bg-blue-50 text-blue-700 rounded-md uppercase tracking-wider">Standard QA Path</span>
              </div>
              
              {/* Note panel */}
              <div className="p-4 bg-gray-50/80 rounded-lg border border-gray-100 mt-2">
                <p className="text-[11px] italic text-slate-500 leading-relaxed">
                  "Submission of this form triggers a formal impact assessment workflow. Ensure all critical safety parameters are addressed in the proposed changes."
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm transition-all hover:shadow-md">
            <CardHeader className="pb-2 border-b border-gray-50 bg-slate-50/50">
              <CardTitle className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Related Activities</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse ring-4 ring-amber-100" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-slate-900 leading-none">Pending Impact Review</span>
                  <span className="text-[10px] text-gray-500 font-medium">Assigned to: Safety Board</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-gray-200 ring-4 ring-gray-50" />
                <div className="flex flex-col gap-1 opacity-70">
                  <span className="text-xs font-bold text-slate-900 leading-none">Document Lock Active</span>
                  <span className="text-[10px] text-gray-500 font-medium uppercase tracking-tight">SOP-2024-001 is now read-only</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* History section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">Recent Request History</h3>
          <Button variant="ghost" className="text-blue-600 font-bold text-xs uppercase tracking-widest p-1 h-auto">
            View All Requests
          </Button>
        </div>
        
        <Card className="border-gray-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="hover:bg-transparent border-gray-200">
                <TableHead className="w-[300px] text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">Document Name</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">DCR ID</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">Type</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((row) => (
                <TableRow key={row.id} className="group hover:bg-slate-50 transition-colors border-gray-50">
                  <TableCell className="px-6 py-5">
                    <span className="text-sm font-bold text-slate-800">{row.name}</span>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <span className="text-xs font-medium text-slate-500 tracking-wider uppercase">{row.id}</span>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.1em]">{row.type}</span>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                     <StatusBadge status={row.status === "Pending Review" ? "under review" : row.status === "Under Assessment" ? "review" : "effective"} />
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <span className="text-xs text-slate-500 tabular-nums">{row.date}</span>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

function ChevronDown(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
