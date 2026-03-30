import React from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Filter, 
  ExternalLink, 
  MoreVertical, 
  ArrowUpDown,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const documents = [
  {
    id: "QM-001",
    name: "Quality Manual 2024",
    type: "Policy",
    status: "Released / Effective",
    owner: "Alex Morgan",
    version: "v4.0",
    updated: "Oct 24, 2023",
    avatar: "AM"
  },
  {
    id: "SOP-ENG-12",
    name: "Equipment Calibration SOP",
    type: "SOP",
    status: "Under Review",
    owner: "James Reed",
    version: "v2.1",
    updated: "Dec 12, 2023",
    avatar: "JR"
  },
  {
    id: "FRM-SAF-05",
    name: "Annual Safety Audit Form",
    type: "Form",
    status: "Draft",
    owner: "Sarah Lee",
    version: "v1.0",
    updated: "Just now",
    avatar: "SL"
  },
  {
    id: "POL-QA-22",
    name: "Corrective Action Policy",
    type: "Policy",
    status: "Released / Effective",
    owner: "Alex Morgan",
    version: "v5.2",
    updated: "Sep 15, 2023",
    avatar: "AM"
  }
];

export default function Documents() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Document Library</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track all controlled documents across the organization.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gray-200 shadow-sm relative overflow-hidden group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">1,284</div>
            <div className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wider">Total Documents</div>
          </CardContent>
          <div className="absolute top-0 right-0 h-full w-1.5 bg-blue-500" />
        </Card>

        <Card className="border-gray-200 shadow-sm relative overflow-hidden group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-amber-50 rounded-lg group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">42</div>
            <div className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wider">Documents In Review</div>
          </CardContent>
          <div className="absolute top-0 right-0 h-full w-1.5 bg-amber-500" />
        </Card>

        <Card className="border-gray-200 shadow-sm relative overflow-hidden group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-50 rounded-lg group-hover:scale-110 transition-transform">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wider">Nearing Review Deadline</div>
          </CardContent>
          <div className="absolute top-0 right-0 h-full w-1.5 bg-red-500" />
        </Card>
      </div>

      <div className="flex items-center justify-between gap-4 py-4 px-1 bg-white">
        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-xs border-gray-200 rounded-md h-9 px-4 gap-2">
            Type: <span className="font-semibold">All Documents</span>
            <ChevronDown className="w-3 h-3" />
          </Button>
          <Button variant="outline" className="text-xs border-gray-200 rounded-md h-9 px-4 gap-2">
            Status: <span className="font-semibold">All Statuses</span>
            <ChevronDown className="w-3 h-3" />
          </Button>
          <Button variant="outline" className="text-xs border-gray-200 rounded-md h-9 px-4 gap-2">
            Department: <span className="font-semibold">All Departments</span>
            <ChevronDown className="w-3 h-3" />
          </Button>
          <Button variant="ghost" className="h-9 w-9 p-0 rounded-md">
            <Filter className="w-4 h-4 text-gray-500" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Sort by:</span>
          <Button variant="ghost" className="text-xs font-semibold h-9 px-3 gap-2 rounded-md">
            Last Updated
            <ArrowUpDown className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <Card className="border-gray-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-gray-200">
              <TableHead className="w-[300px] text-xs font-semibold uppercase tracking-wider text-gray-400">Document Name</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-400">ID</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-400">Type</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-400">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-400">Owner</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-400">Version</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-400">Last Updated</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id} className="group hover:bg-slate-50 transition-colors border-gray-100">
                <TableCell className="font-medium py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-md group-hover:bg-white border border-transparent group-hover:border-gray-200 transition-all">
                      <FileText className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="flex flex-col">
                      <Link 
                        to={`/documents/${doc.id}`}
                        className="text-sm text-slate-900 font-bold group-hover:text-indigo-600 transition-colors"
                      >
                        {doc.name}
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-xs font-medium text-slate-500 tabular-nums">{doc.id}</TableCell>
                <TableCell className="text-xs text-slate-500">{doc.type}</TableCell>
                <TableCell>
                  <StatusBadge status={doc.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6 border-gray-200">
                      <AvatarFallback className="text-[10px] bg-indigo-50 text-indigo-700">{doc.avatar}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium text-slate-700">{doc.owner}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs font-medium text-slate-500 tabular-nums">{doc.version}</TableCell>
                <TableCell className="text-xs text-slate-500 tabular-nums">{doc.updated}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Showing <span className="font-semibold text-gray-900">1 to 4</span> of <span className="font-semibold text-gray-900">1,284</span> documents
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-md border-gray-200" disabled>
              &lt;
            </Button>
            <Button size="sm" className="h-8 px-3 rounded-md bg-indigo-600 text-white text-xs">1</Button>
            <Button variant="ghost" size="sm" className="h-8 px-3 rounded-md text-xs text-slate-500">2</Button>
            <Button variant="ghost" size="sm" className="h-8 px-3 rounded-md text-xs text-slate-500">3</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-md border-gray-200">
              &gt;
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
