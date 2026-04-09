import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  ChevronDown,
  Plus,
  UploadCloud,
  ChevronRight,
  ChevronLeft,
  Info,
  Layers,
  FileUp,
  X
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Dialog } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useDocumentStore, ROLES, ROLE_LABELS, REGISTER_LABELS, DOC_TYPE_LABELS } from "@/store/useDocumentStore";


export default function Documents() {
  const navigate = useNavigate();
  const { documents, isLoading, fetchDocuments, addDocument, userRole } = useDocumentStore();
  const [activeRegister, setActiveRegister] = useState("MDR");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  // New Document Wizard State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1); // 1: Metadata, 2: Content & Upload
  const [newDocName, setNewDocName] = useState("");
  const [newDocType, setNewDocType] = useState("SOP");
  const [newDocDept, setNewDocDept] = useState("Quality Assurance");
  const [newDocDescription, setNewDocDescription] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);



  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.owner.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "All Statuses" || doc.status.includes(statusFilter);
      const matchesRegister = doc.register === activeRegister;
      
      // Role-based restriction: DO only sees their own by default
      const matchesRole = (userRole === ROLES.DO) ? (doc.owner === "Alex Morgan" || doc.owner === "Current User") : true;

      // VAULT Logic: Only show S7 in VAULT, exclude S7 from MDR/CCR/EDR
      if (activeRegister === 'VAULT') {
        return matchesSearch && matchesStatus && doc.stateCode === 'S7' && matchesRole;
      }
      
      return matchesSearch && matchesStatus && matchesRegister && doc.stateCode !== 'S7' && matchesRole;
    });
  }, [documents, searchTerm, statusFilter, activeRegister, userRole]);

  const stats = useMemo(() => {
    return {
      total: documents.filter(d => d.register === activeRegister).length,
      underGovernance: documents.filter(d => ['S1', 'S2', 'S3', 'S4'].includes(d.stateCode)).length,
      effective: documents.filter(d => d.stateCode === 'S5').length
    };
  }, [documents, activeRegister]);

  const handleNextStep = async () => {
    if (activeStep === 1) {
      if (!newDocName.trim()) return;
      setActiveStep(2);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
        type: file.type
      });
    }
  };

  const handleRegister = async () => {
    setIsRegistering(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const doc = {
      name: newDocName,
      type: newDocType,
      department: newDocDept,
      owner: "Current User",
      description: newDocDescription,
      content: "This is the initial draft content. Edit in Detail view.",
      register: activeRegister,
      hasAttachment: !!uploadedFile,
      attachmentName: uploadedFile?.name
    };

    addDocument(doc);
    setIsRegistering(false);
    resetForm();
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setActiveStep(1);
    setNewDocName("");
    setNewDocType("SOP");
    setNewDocDept("Quality Assurance");
    setNewDocDescription("");
    setUploadedFile(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Documents</h1>
          <p className="text-sm text-gray-500 mt-1">Authoritative index of all controlled organizational assets.</p>
        </div>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg hover:shadow-indigo-200 transition-all px-5"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Add to Register
        </Button>
      </div>

      {/* Register Selector Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit border border-slate-200/60 shadow-sm">
        {[
          { id: "MDR", label: REGISTER_LABELS.MDR, icon: FileText },
          { id: "CCR", label: REGISTER_LABELS.CCR, icon: Clock },
          { id: "EDR", label: REGISTER_LABELS.EDR, icon: ExternalLink },
          { id: "VAULT", label: REGISTER_LABELS.VAULT, icon: Layers, isRestricted: true }
        ].filter(tab => !tab.isRestricted || (userRole === 'RM' || userRole === 'INTERNAL_AUDITOR' || userRole === 'EXTERNAL_AUDITOR')).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveRegister(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
              activeRegister === tab.id
                ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => !open && resetForm()}
        title={`Register: ${REGISTER_LABELS[activeRegister] || activeRegister}`}
        description={`Initiate new controlled entry in the ${REGISTER_LABELS[activeRegister] || activeRegister} system.`}
      >
        <div className="space-y-6 pt-2">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <div className={`h-1.5 rounded-full transition-all duration-500 ${activeStep === 1 ? 'w-10 bg-indigo-600' : 'w-4 bg-slate-200'}`} />
            <div className={`h-1.5 rounded-full transition-all duration-500 ${activeStep === 2 ? 'w-10 bg-indigo-600' : 'w-4 bg-slate-200'}`} />
          </div>

          {activeStep === 1 ? (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Document Identity</label>
                <Input
                  placeholder="e.g. Environmental Monitoring SOP"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  className="border-slate-200 focus:ring-indigo-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Type</label>
                  <select
                    className="w-full flex h-10 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newDocType}
                    onChange={(e) => setNewDocType(e.target.value)}
                  >
                    <option value="SOP">{DOC_TYPE_LABELS.SOP}</option>
                    <option value="Policy">{DOC_TYPE_LABELS.Policy}</option>
                    <option value="Form">{DOC_TYPE_LABELS.Form}</option>
                    <option value="Manual">{DOC_TYPE_LABELS.Manual}</option>
                    <option value="TRS">{DOC_TYPE_LABELS.TRS}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Department</label>
                  <select
                    className="w-full h-10 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newDocDept}
                    onChange={(e) => setNewDocDept(e.target.value)}
                  >
                    <option value="Quality Assurance">Quality Assurance</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Safety">Safety</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Functional Intent</label>
                <Textarea
                  placeholder="Summarize the purpose of this controlled document..."
                  value={newDocDescription}
                  onChange={(e) => setNewDocDescription(e.target.value)}
                  className="min-h-[100px] border-slate-200 focus:ring-indigo-600"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-700">Document Source</h4>
                <p className="text-[10px] text-slate-400">Upload a draft or final document if available, or proceed without one.</p>
              </div>

              {!uploadedFile ? (
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => { 
                    e.preventDefault(); 
                    setIsDragging(false);
                    const file = e.dataTransfer.files[0];
                    if (file) handleFileChange({ target: { files: [file] } });
                  }}
                  className={cn(
                    "relative border-2 border-dashed rounded-xl p-8 transition-all flex flex-col items-center justify-center gap-3",
                    isDragging ? "border-indigo-400 bg-indigo-50/50" : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50/50"
                  )}
                >
                  <div className="p-3 bg-indigo-50 rounded-full">
                    <UploadCloud className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-700">Drop your document here</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Supports PDF, DOCX, XLSX (Max 10MB)</p>
                  </div>
                  <label className="cursor-pointer">
                    <span className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 px-3 py-1.5 bg-white border border-indigo-100 rounded-md shadow-sm transition-all hover:shadow-indigo-100">
                      Browse Files
                    </span>
                    <input type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-indigo-100/50 rounded-lg">
                      <FileUp className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-slate-800 truncate">{uploadedFile.name}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-medium">{uploadedFile.size}</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    onClick={() => setUploadedFile(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 flex items-start gap-3">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-700 leading-relaxed">
                  <strong>Note:</strong> Registering without a document will create a placeholder entry that can be populated later.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4 justify-end border-t border-gray-100 mt-4">
            <Button variant="ghost" type="button" onClick={() => activeStep === 1 ? resetForm() : setActiveStep(1)} className="text-slate-500">
              {activeStep === 1 ? "Discard" : "Back"}
            </Button>

            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[124px] shadow-lg shadow-indigo-100"
              onClick={activeStep === 1 ? handleNextStep : handleRegister}
              disabled={isRegistering || (activeStep === 1 && !newDocName.trim())}
            >
              {activeStep === 1 ? (
                <span className="flex items-center gap-2">Continue <ChevronRight className="w-4 h-4" /></span>
              ) : (
                isRegistering ? "Registering..." : (uploadedFile ? "Upload & Finish" : "Finalize Entry")
              )}
            </Button>
          </div>
        </div>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gray-200 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-all cursor-default">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-indigo-50 rounded-lg group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 tabular-nums">{stats.total}</div>
            <div className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-widest">{REGISTER_LABELS[activeRegister] || activeRegister} Total Assets</div>
          </CardContent>
          <div className="absolute top-0 right-0 h-full w-1 bg-indigo-500" />
        </Card>

        <Card className="border-gray-200 shadow-sm relative overflow-hidden group hover:border-amber-200 transition-all cursor-default">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-amber-50 rounded-lg group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 tabular-nums">{stats.underGovernance}</div>
            <div className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-widest">Under Governance (S1-S4)</div>
          </CardContent>
          <div className="absolute top-0 right-0 h-full w-1 bg-amber-500" />
        </Card>

        <Card className="border-gray-200 shadow-sm relative overflow-hidden group hover:border-green-200 transition-all cursor-default">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-50 rounded-lg group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 tabular-nums">{stats.effective}</div>
            <div className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-widest">Effective Versions (S5)</div>
          </CardContent>
          <div className="absolute top-0 right-0 h-full w-1 bg-emerald-500" />
        </Card>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="relative min-w-[260px] flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              className="h-9 border-gray-200 bg-gray-50 pl-9 text-sm focus:bg-white"
              placeholder={`Search ${activeRegister}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="text-[10px] border-gray-200 rounded-md h-9 px-4 gap-2 font-black uppercase text-slate-600">
            Lifecycle: <span className="text-indigo-600">{statusFilter === "All Statuses" ? "All Nodes" : statusFilter}</span>
            <ChevronDown className="w-3 h-3" />
          </Button>
          <Button variant="ghost" className="h-9 w-9 p-0 rounded-md border border-transparent hover:border-gray-100">
            <Filter className="w-4 h-4 text-gray-500" />
          </Button>
        </div>
      </div>

      <Card className="border-gray-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-gray-200">
              <TableHead className="w-[300px] text-[10px] font-bold uppercase tracking-wider text-slate-400">Controlled Identity</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Node ID</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Lifecycle State</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Owner role</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ver.</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Last Synced</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <span className="font-bold text-slate-400 uppercase text-[10px]">Synchronizing Registers...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <AlertCircle className="w-8 h-8 text-slate-200" />
                    <span className="font-bold text-slate-400 uppercase text-[10px]">No entries in {activeRegister}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredDocuments.map((doc) => (
                <TableRow key={doc.id} className="group hover:bg-slate-50/80 transition-colors border-gray-100">
                  <TableCell className="font-medium py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50/50 rounded-md group-hover:bg-white border border-transparent group-hover:border-indigo-100 transition-all shadow-sm shrink-0">
                        <FileText className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <Link
                          to={`/documents/${doc.id}`}
                          className="text-sm text-slate-900 font-bold group-hover:text-indigo-600 transition-colors truncate"
                        >
                          {doc.name}
                        </Link>
                        <span className="text-[10px] text-slate-400 truncate">{doc.department}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-slate-500 tabular-nums">{doc.id}</TableCell>
                  <TableCell>
                    <StatusBadge status={doc.status} stateCode={doc.stateCode} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-7 h-7 border border-slate-100 shadow-sm">
                        <AvatarFallback className="text-[10px] bg-slate-50 text-indigo-600 font-bold">{doc.avatar || 'DO'}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-bold text-slate-700">{ROLE_LABELS['DO']}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-[11px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md tabular-nums">{doc.version}</span>
                  </TableCell>
                  <TableCell className="text-xs text-slate-400 tabular-nums font-medium">
                    {new Date(doc.updated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:shadow-sm">
                      <MoreVertical className="w-4 h-4 text-slate-400" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {activeRegister} Integrity Check: <span className="text-green-600 transition-pulse inline-flex items-center gap-1"><CheckCircle2 className="w-2.5 h-2.5" /> Validated</span>
          </div>
          <div className="flex items-center gap-1">
            <Button size="sm" className="h-8 px-3 rounded-md bg-indigo-600 text-white text-xs font-bold shadow-sm">1</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

