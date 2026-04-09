import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  Share2, 
  MessageSquare, 
  Minus,
  Plus,
  FileText,
  Activity,
  Send,
  Zap,
  Edit2,
  History,
  Layers,
  Save,
  XCircle,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Clock,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/ui/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  useAIPrecheck, 
  useAIReworkSummary 
} from "@/hooks/useAIHooks";
import { useDocumentStore, ROLES, ROLE_LABELS, DOC_TYPE_LABELS } from "@/store/useDocumentStore";
import { workflowService } from "@/services/mockServices";
import { cn } from "@/lib/utils";

export default function DocumentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    documents, 
    selectedDocument, 
    setSelectedDocument, 
    userRole, 
    transitionStatus,
    updateDocumentContent,
    comments,
    addComment,
    auditLogs
  } = useDocumentStore();

  const [activeTab, setActiveTab] = useState("document");
  const [commentText, setCommentText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [changeSummary, setChangeSummary] = useState("");
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editDept, setEditDept] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [signatureToken, setSignatureToken] = useState("");
  const [isRetiring, setIsRetiring] = useState(false);
  const [retirementReason, setRetirementReason] = useState("");
  const [editHeader1, setEditHeader1] = useState("");
  const [editHeader2, setEditHeader2] = useState("");
  const [editIndex1, setEditIndex1] = useState("");
  const [editIndex2, setEditIndex2] = useState("");
  const [editWatermark, setEditWatermark] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const { runCheck, isAnalyzing, report, clearReport } = useAIPrecheck();
  const { generateSummary, isGenerating, summary } = useAIReworkSummary();

  useEffect(() => {
    setSelectedDocument(id);
  }, [id, setSelectedDocument, documents]);

  useEffect(() => {
    if (selectedDocument) {
      setEditName(selectedDocument.name);
      setEditType(selectedDocument.type);
      setEditDept(selectedDocument.department);
      setEditHeader1(selectedDocument.header1 || "EXECUTIVE DESCRIPTION");
      setEditHeader2(selectedDocument.header2 || "CONTROLLED CONTENT");
      setEditIndex1(selectedDocument.index1 || "01");
      setEditIndex2(selectedDocument.index2 || "02");
      setEditWatermark(selectedDocument.watermark || "CONTROLLED COPY");
      setEditContent(selectedDocument.content);
      setEditDescription(selectedDocument.description);
    }
  }, [selectedDocument]);

  useEffect(() => {
    if (selectedDocument?.status === 'Draft' && (comments[selectedDocument.id]?.length || 0) > 0 && !summary && !isGenerating) {
      generateSummary(comments[selectedDocument.id]);
    }
  }, [selectedDocument?.status, comments, generateSummary, summary, isGenerating]);

  const allVersions = React.useMemo(() => {
    if (!selectedDocument || !documents) return [];
    return documents
      .filter(d => d.docNumber === selectedDocument.docNumber)
      .sort((a, b) => b.version.localeCompare(a.version));
  }, [selectedDocument, documents]);

  if (!selectedDocument) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="p-4 bg-slate-100 rounded-full">
          <FileText className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900">Document Not Found</h2>
        <Button asChild variant="outline">
          <Link to="/documents">Return to Library</Link>
        </Button>
      </div>
    );
  }

  const availableActions = workflowService.getAvailableActions(selectedDocument.stateCode, userRole);
  const docComments = comments[selectedDocument.id] || [];
  const docLogs = auditLogs[selectedDocument.id] || [];
  
  // Loosened for demo testing as requested by user
  const canEdit = userRole === 'DO'; 

  const handleAction = (actionId) => {
    if (actionId === 'APPROVE' && selectedDocument.stateCode === 'S3' && userRole === 'APP') {
      setIsSigning(true);
      return;
    }
    
    // RETIREMENT CHECK: RM obsoleting an Effective doc
    if (actionId === 'OBSOLETE' && selectedDocument.stateCode === 'S5' && userRole === 'RM') {
      setIsRetiring(true);
      return;
    }

    const nextStateCode = workflowService.getNextStatus(selectedDocument.stateCode, actionId);
    const newId = transitionStatus(selectedDocument.id, nextStateCode);
    
    // If a new record was created (Revision case), navigate to it
    if (newId && typeof newId === 'string' && newId !== selectedDocument.id) {
      navigate(`/documents/${newId}`);
    }
    
    setIsEditing(false);
  };

  const handleRetireConfirm = () => {
    if (!retirementReason.trim()) return;
    transitionStatus(selectedDocument.id, 'S6');
    // Add audit note for reason (already handled by transitionStatus if we extend it, 
    // but here we can just close the modal)
    setIsRetiring(false);
    setRetirementReason("");
  };

  const handleFinalSign = () => {
    if (!signatureToken.trim()) return;
    transitionStatus(selectedDocument.id, 'S4');
    setIsSigning(false);
    setSignatureToken("");
  };

  const handleSaveEdit = () => {
    updateDocumentContent(
      selectedDocument.id, 
      editContent, 
      editDescription, 
      changeSummary, 
      editName, 
      editType, 
      editDept, 
      editHeader1, 
      editHeader2,
      editIndex1,
      editIndex2,
      editWatermark
    );
    setIsEditing(false);
    setShowSaveDialog(false);
    setChangeSummary("");
  };





  const handleAddComment = (parentId = null, replyText = "") => {
    const text = parentId ? replyText : commentText;
    if (!text.trim()) return;

    if (parentId) {
      addReply(selectedDocument.id, parentId, {
        user: "Current User",
        avatar: "CU",
        content: text
      });
    } else {
      addComment(selectedDocument.id, {
        user: "Current User",
        avatar: "CU",
        content: text
      });
      setCommentText("");
    }
  };

  const CommentItem = ({ comment, isReply = false }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [replyValue, setReplyValue] = useState("");

    return (
      <div className={`space-y-3 ${isReply ? 'ml-8 mt-3 border-l-2 border-slate-100 pl-4' : 'p-4 bg-slate-50/50 rounded-xl mb-4 border border-transparent hover:border-slate-200 transition-all'}`}>
        <div className="flex gap-3 items-start">
          <Avatar className={`${isReply ? 'w-6 h-6' : 'w-8 h-8'} border border-slate-100`}>
            <AvatarFallback className="text-[10px] bg-white font-bold">{comment.avatar}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-900">{comment.user}</span>
              </div>
              <span className="text-[10px] text-slate-400">{new Date(comment.timestamp).toLocaleDateString()}</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">{comment.content}</p>
            
            {!isReply && (
              <button 
                onClick={() => setIsReplying(!isReplying)}
                className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 pt-1"
              >
                Reply
              </button>
            )}
          </div>
        </div>

        {isReplying && (
          <div className="ml-8 flex gap-2 pt-1 animate-in slide-in-from-top-1">
            <Input 
              placeholder="Write a reply..." 
              className="h-8 text-[10px] bg-white"
              value={replyValue}
              onChange={(e) => setReplyValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddComment(comment.id, replyValue);
                  setIsReplying(false);
                  setReplyValue("");
                }
              }}
            />
            <Button size="sm" className="h-8 bg-indigo-600 px-3" onClick={() => {
              handleAddComment(comment.id, replyValue);
              setIsReplying(false);
              setReplyValue("");
            }}>
              <Send className="w-3 h-3 text-white" />
            </Button>
          </div>
        )}

        {comment.replies?.map(reply => (
          <CommentItem key={reply.id} comment={reply} isReply={true} />
        ))}
      </div>
    );
  };

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
            <h1 className="text-2xl font-bold text-gray-900">{selectedDocument.name}</h1>
            <div className="mt-1 text-xs text-gray-500">
              Document ID: {selectedDocument.id} · Version {selectedDocument.version} · Role: <span className="font-bold text-indigo-600">{userRole}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {canEdit && !isEditing && (
            <Button 
              variant="default" 
              size="sm" 
              className="h-9 bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="w-4 h-4" />
              Edit Mode
            </Button>
          )}
          {isEditing && (
            <>
              <Button variant="ghost" size="sm" className="h-9 text-slate-500 hover:text-red-600" onClick={() => setIsEditing(false)}>
                <XCircle className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button variant="default" size="sm" className="h-9 bg-green-600 hover:bg-green-700 text-white px-4" onClick={() => setShowSaveDialog(true)}>
                <Save className="w-4 h-4 mr-2" />
                Save Revision
              </Button>
            </>
          )}
          <Separator orientation="vertical" className="h-6 mx-1" />
          <Button variant="outline" size="sm" className="h-9 border-gray-200">
            <Printer className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-9 border-gray-200">
            <Download className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`h-9 border-indigo-100 text-indigo-600 hover:bg-indigo-50 ${isAnalyzing ? 'animate-pulse' : ''}`}
            onClick={() => runCheck(editContent)}
            disabled={isAnalyzing}
          >
            <Zap className={`w-4 h-4 mr-2 ${isAnalyzing ? 'fill-indigo-600' : ''}`} />
            {isAnalyzing ? 'AI Analyzing...' : 'AI Pre-check'}
          </Button>
        </div>
      </div>

      {showSaveDialog && (
        <Card className="border-indigo-200 bg-indigo-50/50 p-6 animate-in zoom-in-95 duration-200">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <Save className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-tighter">Finalize Document Update</h3>
                <p className="text-xs text-indigo-700/70">Recording this edit in the persistent audit trail.</p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-indigo-900 uppercase">Change Summary (Required)</label>
              <Input 
                placeholder="Briefly describe what changed..." 
                className="bg-white border-indigo-100"
                value={changeSummary}
                onChange={(e) => setChangeSummary(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" className="text-indigo-900" onClick={() => setShowSaveDialog(false)}>Discard</Button>
              <Button 
                className="bg-indigo-600 text-white px-6 font-bold" 
                onClick={handleSaveEdit}
                disabled={!changeSummary.trim()}
              >
                Commit Changes
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Retirement Confirmation Modal */}
      {isRetiring && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 border border-slate-100 animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Retire Document</h3>
            </div>
            
            <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">
              You are about to mark <span className="font-bold text-slate-900">{selectedDocument.id}</span> as Obsolete. 
              <br/><br/>
              <span className="text-red-600 font-bold underline">Warning:</span> If a new version is required, please ensure it is Released (S5) first. This action should only be used for process decommissioning.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Retirement Reason</label>
                <Textarea 
                  placeholder="e.g., Process decommissioning, superseded by external standard..."
                  value={retirementReason}
                  onChange={(e) => setRetirementReason(e.target.value)}
                  className="bg-slate-50 border-slate-200 focus:ring-red-500 h-24"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button 
                  className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white font-black uppercase text-[11px] tracking-widest shadow-lg shadow-red-200"
                  onClick={handleRetireConfirm}
                  disabled={!retirementReason.trim()}
                >
                  Confirm Obsolescence
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 h-12 border-slate-200 text-slate-500 font-black uppercase text-[11px] tracking-widest"
                  onClick={() => setIsRetiring(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSigning && (
        <Dialog 
          open={isSigning} 
          onOpenChange={setIsSigning}
        >
          <div className="space-y-8 p-1">
            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner border border-indigo-100/50">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter pt-2">Digital Signature</h3>
              <p className="text-xs text-slate-400 font-medium px-4">
                You are formally authorizing <span className="text-indigo-600 font-bold">{selectedDocument.id}</span>. This action will be recorded in the immutable compliance ledger.
              </p>
            </div>

            <div className="p-8 bg-slate-50/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-inner space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-end px-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Authorized Signatory</label>
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter bg-indigo-50 px-2 py-0.5 rounded">{userRole}</span>
                </div>
                <div className="relative group">
                  <Input 
                    type="password"
                    placeholder="ENTER SIGNING TOKEN" 
                    className="bg-white border-slate-200 text-slate-900 focus:ring-4 focus:ring-indigo-500/10 h-14 text-center text-xl font-black tracking-[0.4em] rounded-2xl shadow-sm transition-all duration-300 group-hover:border-indigo-200"
                    value={signatureToken}
                    onChange={(e) => setSignatureToken(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
                    <Zap className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setIsSigning(false)} 
                  className="flex-1 h-12 border-slate-200 text-slate-500 font-black uppercase text-[11px] tracking-widest hover:bg-slate-100 rounded-xl"
                >
                  Discard
                </Button>
                <Button 
                  className="flex-[2] h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[11px] tracking-[0.15em] shadow-xl shadow-indigo-200 rounded-xl transition-all duration-300 hover:translate-y-[-2px] active:translate-y-[0px]"
                  disabled={!signatureToken.trim()}
                  onClick={handleFinalSign}
                >
                  Sign & Finalize
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1.5 opacity-50">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Secure 256-bit Encryption Active</span>
              </div>
              <p className="text-[8px] text-slate-400 font-medium">Node ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
            </div>
          </div>
        </Dialog>
      )}

      {summary && (
        <Card className="border-amber-100 bg-amber-50/30 overflow-hidden animate-in d-300">
          <CardHeader className="py-3 px-5 border-b border-amber-100 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold text-amber-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-600" />
              AI Rework Synthesis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <p className="text-xs text-amber-900 leading-relaxed font-medium italic">" {summary} "</p>
          </CardContent>
        </Card>
      )}

      {report && (
        <Card className="border-indigo-100 bg-indigo-50/30 overflow-hidden">
          <CardHeader className="py-3 px-5 border-b border-indigo-100 flex flex-row items-center justify-between font-bold text-indigo-900 flex items-center gap-2">
            <CardTitle className="text-sm font-bold text-indigo-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              AI Compliance Analysis
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-6 text-[10px] text-indigo-600" onClick={clearReport}>Dismiss</Button>
          </CardHeader>
          <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-indigo-900/60">Risk Profile</h4>
              {report.risks.map(risk => (
                <div key={risk.id} className="flex gap-3 bg-white/60 p-3 rounded-lg border border-indigo-50">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${risk.type === 'CRITICAL' ? 'bg-red-500' : 'bg-amber-500'}`} />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{risk.title}</div>
                    <div className="text-[10px] text-slate-600">{risk.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-indigo-900/60">Gap Analysis</h4>
              {report.gaps.map(gap => (
                <div key={gap.id} className="flex gap-3 bg-white/60 p-3 rounded-lg border border-indigo-50">
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-blue-500" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{gap.title}</div>
                    <div className="text-[10px] text-slate-600">{gap.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8 space-y-6">
          <div className="flex p-1 bg-slate-100 rounded-lg border border-slate-200 w-fit">
            {[
              { id: 'document', label: 'Document', icon: FileText },
              { id: 'history', label: 'History', icon: History },
              { id: 'versions', label: 'Versions', icon: Layers }
            ].map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                size="sm"
                className={`h-8 px-4 text-xs gap-2 rounded-md transition-all ${
                  activeTab === tab.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-indigo-600'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </Button>
            ))}
          </div>

          <Card className="overflow-hidden border-gray-200 shadow-sm min-h-[600px]">
            {activeTab === 'document' && (
              <>
                <CardHeader className="border-b border-gray-100 bg-slate-50/60 px-5 py-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3 italic">
                      {isEditing ? "Editing Mode Active" : "Read-only View"}
                      <Separator orientation="vertical" className="h-3 mx-2" />
                      Last sync: Just now
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="bg-slate-100/60 p-6">
                  <div className="mx-auto max-w-3xl rounded-md border border-gray-200 bg-white p-10 shadow-sm h-full font-sans">
                    <div className="space-y-3 border-b-2 border-slate-900 pb-8">
                      <div className="flex justify-between items-start">
                        <div />
                        {isEditing ? (
                          <input 
                            value={editWatermark}
                            onChange={(e) => setEditWatermark(e.target.value)}
                            className="text-[10px] font-bold text-slate-400 bg-transparent border-none p-0 focus:ring-0 text-right w-32"
                          />
                        ) : (
                          <div className="text-[10px] font-bold text-slate-400">{editWatermark || "CONTROLLED COPY"}</div>
                        )}
                      </div>
                      {isEditing ? (
                        <Input 
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="text-4xl font-black text-slate-900 tracking-tighter leading-none border-none p-0 h-auto focus-visible:ring-0 placeholder:text-slate-200"
                          placeholder="Document Title"
                        />
                      ) : (
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{selectedDocument.name.toUpperCase()}</h2>
                      )}
                    </div>

                    <div className="space-y-8 pt-8">
                      <section className="relative group">
                        <h3 className="text-xs font-black text-slate-900 mb-2 uppercase tracking-wide flex items-center gap-2">
                          {isEditing ? (
                            <div className="flex items-center gap-1 border-b border-indigo-100">
                              <input 
                                value={editIndex1}
                                onChange={(e) => setEditIndex1(e.target.value)}
                                className="text-indigo-600 bg-transparent border-none p-0 focus:ring-0 w-6 font-black"
                              />
                              <input 
                                value={editHeader1}
                                onChange={(e) => setEditHeader1(e.target.value)}
                                className="bg-transparent border-none p-0 focus:ring-0 w-64"
                              />
                            </div>
                          ) : (
                            `${editIndex1 || '01'} ${editHeader1}`
                          )}
                          {isEditing && <span className="text-[10px] text-indigo-500 animate-pulse">● EDITING</span>}
                        </h3>
                        {isEditing ? (
                          <Textarea 
                            value={editDescription} 
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="text-base font-medium min-h-[100px] border-indigo-200 focus:ring-indigo-600"
                          />
                        ) : (
                          <p className="text-base leading-relaxed text-slate-700 font-medium">{selectedDocument.description}</p>
                        )}
                      </section>

                      <section className="relative group">
                        <h4 className="text-xs font-black text-slate-900 mb-2 uppercase tracking-wide flex items-center gap-2">
                          {isEditing ? (
                            <div className="flex items-center gap-1 border-b border-indigo-100">
                              <input 
                                value={editIndex2}
                                onChange={(e) => setEditIndex2(e.target.value)}
                                className="text-indigo-600 bg-transparent border-none p-0 focus:ring-0 w-6 font-black"
                              />
                              <input 
                                value={editHeader2}
                                onChange={(e) => setEditHeader2(e.target.value)}
                                className="bg-transparent border-none p-0 focus:ring-0 w-64"
                              />
                            </div>
                          ) : (
                            `${editIndex2 || '02'} ${editHeader2}`
                          )}
                          {isEditing && <span className="text-[10px] text-indigo-500 animate-pulse">● EDITING</span>}
                        </h4>
                        {isEditing ? (
                          <Textarea 
                            value={editContent} 
                            onChange={(e) => setEditContent(e.target.value)}
                            className="min-h-[400px] text-lg leading-relaxed font-serif p-8 border-indigo-200 focus:ring-indigo-600 shadow-inner"
                          />
                        ) : (
                          <div className="p-8 bg-slate-50/50 rounded-xl border border-slate-100 italic text-slate-700 leading-loose text-lg font-serif">
                            {selectedDocument.content}
                          </div>
                        )}
                      </section>
                    </div>
                  </div>
                </CardContent>
              </>
            )}

            {activeTab === 'history' && (
              <CardContent className="p-8">
                <div className="space-y-8">
                  {docLogs.map((log, idx) => (
                    <div key={log.id} className="relative flex gap-6 group">
                      {idx < docLogs.length - 1 && <div className="absolute left-4 top-10 w-px h-[calc(100%-24px)] bg-slate-200" />}
                      <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border-2 ${
                        log.action === 'TRANSITION' ? 'bg-indigo-600 text-white border-indigo-700' : 
                        log.action === 'EDITED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        log.action === 'COMMENTED' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        'bg-slate-50 text-slate-600 border-slate-100'
                      }`}>
                        {log.action === 'TRANSITION' ? <Activity className="w-5 h-5" /> : 
                         log.action === 'EDITED' ? <Edit2 className="w-5 h-5" /> :
                         log.action === 'COMMENTED' ? <MessageSquare className="w-5 h-5" /> :
                         <Clock className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 italic">
                              {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <p className="text-sm font-black text-slate-900 leading-tight mb-1">{log.detail}</p>
                            <p className="text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
                              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                              Authored by <span className="font-bold text-indigo-600">{log.user}</span>
                            </p>
                          </div>
                          <p className="text-[10px] text-slate-300 font-black tabular-nums">{new Date(log.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}

            {activeTab === 'versions' && (
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allVersions.length > 0 ? allVersions.map((v) => (
                    <Card 
                      key={v.id} 
                      onClick={() => navigate(`/documents/${v.id}`)}
                      className={cn(
                        "border-slate-100 bg-slate-50/30 hover:bg-white hover:border-indigo-200 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden",
                        v.id === selectedDocument.id && "ring-2 ring-indigo-600 ring-offset-2 border-transparent"
                      )}
                    >
                      {v.id === selectedDocument.id && (
                        <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-bl-lg tracking-tighter">
                          Current View
                        </div>
                      )}
                      <CardContent className="p-5 flex items-center justify-between">
                        <div className="flex items-center gap-5">
                          <div className="relative">
                            <div className={cn(
                              "w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center font-black text-white text-lg",
                              v.stateCode === 'S5' ? 'bg-emerald-500 shadow-emerald-100' : 
                              v.stateCode === 'S6' ? 'bg-slate-400 shadow-slate-100' : 
                              'bg-indigo-600 shadow-indigo-100'
                            )}>
                              {v.version}
                            </div>
                            {v.stateCode === 'S5' && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white border-2 border-emerald-500 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="text-xs font-black text-slate-900">{v.status}</p>
                              {v.stateCode === 'S5' && (
                                <span className="text-[8px] font-black text-emerald-600 uppercase tracking-tighter">Effective</span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight italic">
                              {new Date(v.updated).toLocaleDateString()} · {v.id}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-slate-300 group-hover:text-indigo-600 transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </CardContent>
                    </Card>
                  )) : (
                    <div className="col-span-2 py-20 flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-slate-100 rounded-3xl">
                      <Layers className="w-12 h-12 text-slate-200" />
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No Other Versions Found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        <div className="xl:col-span-4 space-y-4">
          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="pb-3 bg-slate-50/50 border-b border-gray-100">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Governance Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-0.5 p-0">
              {[
                { label: "Document ID", val: selectedDocument.id, readOnly: true },
                { 
                  label: "Category", 
                  val: editType, 
                  isSelect: true, 
                  options: Object.keys(DOC_TYPE_LABELS),
                  setter: setEditType
                },
                { label: "Active Version", val: selectedDocument.version, highlight: 'text-indigo-600 bg-indigo-50', readOnly: true },
                { 
                  label: "Department", 
                  val: editDept, 
                  isSelect: true, 
                  options: ["Quality Assurance", "Manufacturing", "Engineering", "Safety"],
                  setter: setEditDept
                }
              ].map(item => (
                <div key={item.label} className="flex justify-between px-5 py-3 border-b border-gray-50 last:border-0 items-center hover:bg-slate-50/30 transition-colors">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.label}</span>
                  {isEditing && !item.readOnly ? (
                    <select 
                      value={item.val}
                      onChange={(e) => item.setter(e.target.value)}
                      className="text-[10px] font-black text-slate-900 bg-slate-100 border-none rounded px-1.5 py-0.5 focus:ring-1 focus:ring-indigo-600 outline-none"
                    >
                      {item.options.map(opt => <option key={opt} value={opt}>{DOC_TYPE_LABELS[opt] || opt}</option>)}
                    </select>
                  ) : (
                    <span className={`text-[10px] font-black text-slate-900 px-2 py-1 rounded uppercase ${item.highlight || ""}`}>
                      {item.label === 'Category' ? (DOC_TYPE_LABELS[item.val] || item.val) : item.val}
                    </span>
                  )}
                </div>
              ))}
              <div className="px-5 py-4 bg-white">
                <StatusBadge status={selectedDocument.status} className="w-full justify-center py-2.5 font-black text-xs uppercase" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-xl shadow-slate-100/50 bg-white overflow-hidden">
            <CardHeader className="pb-3 bg-slate-50 border-b border-slate-100">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-500">Document Lifecycle Pipeline (S0-S5)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 px-6 py-6">
              {(() => {
                const sc = selectedDocument.stateCode;
                const creationSteps = [
                  { label: 'Drafting & Rework', role: 'DO',
                    state: (sc === 'S0' || sc === 'S2') ? 'active' : (sc >= 'S1' ? 'done' : 'upcoming') },
                  { label: 'Technical Review', role: 'REV',
                    state: sc === 'S1' ? 'active' : (sc >= 'S3' ? 'done' : 'upcoming') },
                  { label: 'Formal Approval', role: 'APP',
                    state: sc === 'S3' ? 'active' : (sc >= 'S4' ? 'done' : 'upcoming') },
                  { label: 'Compliance Release & Indexing', role: 'DCA',
                    state: sc === 'S4' ? 'active' : (sc >= 'S5' ? 'done' : 'upcoming') },
                  { label: 'Effective Record', role: 'PO', isOversight: true,
                    state: sc >= 'S5' ? 'done' : 'upcoming' } 
                ];

                const retirementSteps = [];
                if (sc >= 'S6' || (userRole === ROLES.RM && sc >= 'S5')) {
                  retirementSteps.push({
                    label: 'Obsolescence',
                    role: 'RM',
                    color: 'text-red-500',
                    activeColor: 'bg-red-600',
                    doneColor: 'bg-red-500',
                    state: sc === 'S6' ? 'active' : (sc >= 'S7' ? 'done' : 'upcoming')
                  });
                  
                  if (sc >= 'S7' || (userRole === ROLES.RM && sc >= 'S6')) {
                    retirementSteps.push({
                      label: 'Archive Record',
                      role: 'RM',
                      color: 'text-slate-400',
                      activeColor: 'bg-slate-700',
                      doneColor: 'bg-slate-500',
                      state: sc === 'S7' ? 'active' : 'upcoming'
                    });
                  }
                }

                const renderStep = (step, idx, list, offset = 0) => (
                  <div key={idx + offset} className="relative flex gap-4">
                    {idx < list.length - 1 && (
                      <div className={cn(
                        "absolute left-4 top-8 w-0.5 h-10 transition-all duration-500",
                        step.state === 'done' ? (step.doneColor || 'bg-emerald-500') : 'bg-slate-100'
                      )} />
                    )}
                    <div className={cn(
                      "relative z-10 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 border-2",
                      step.state === 'done' ? (step.doneColor ? `bg-white border-${step.doneColor.split('-')[1]}-500 text-${step.doneColor.split('-')[1]}-500` : 'bg-emerald-50 border-emerald-500 text-emerald-600') : 
                      step.state === 'active' ? (step.activeColor || 'bg-indigo-600') + ' border-transparent text-white shadow-lg scale-110' : 
                      'bg-white border-slate-200 text-slate-300'
                    )}>
                      {step.state === 'done' ? <CheckCircle2 className="w-5 h-5" /> : 
                       step.state === 'active' ? <Zap className="w-4 h-4 animate-pulse fill-white" /> : 
                       <span className="text-xs font-bold">{idx + 1 + offset}</span>}
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <p className={cn(
                          "text-[11px] font-black uppercase tracking-widest leading-none mb-1", 
                          step.state === 'active' ? (step.color || 'text-indigo-600') : step.state === 'done' ? (step.color || 'text-emerald-600') : 'text-slate-400'
                        )}>
                          {step.label}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{step.isOversight ? 'Oversight:' : 'Authorized:'}</span>
                          <span className={cn(
                            "text-[9px] px-1.5 py-0.5 rounded font-black tracking-tighter",
                            step.state === 'active' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'
                          )}>{ROLE_LABELS[step.role] || step.role}</span>
                        </div>
                      </div>
                      {step.state === 'active' && (
                        <div className="px-2 py-1 bg-indigo-50 rounded-md border border-indigo-100 animate-in fade-in slide-in-from-right-2">
                          <p className="text-[9px] text-indigo-600 font-bold uppercase tracking-tight">Active Node: {selectedDocument.stateCode}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );

                return (
                  <div className="space-y-6">
                    <div className="space-y-6">
                      <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2 border-b border-slate-50 pb-1">Creation Lifecycle</div>
                      {creationSteps.map((step, idx) => renderStep(step, idx, creationSteps))}
                    </div>

                    {retirementSteps.length > 0 && (
                      <div className="space-y-6 pt-4 border-t border-slate-100 border-dashed">
                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2 border-b border-slate-50 pb-1">Retirement Roadmap</div>
                        {retirementSteps.map((step, idx) => renderStep(step, idx, retirementSteps, creationSteps.length))}
                      </div>
                    )}
                  </div>
                );
              })()}
              
              <div className="space-y-3 pt-6 border-t border-slate-100">
                {availableActions.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {availableActions.map((action) => (
                      <Button
                        key={action.id}
                        variant={action.variant || "default"}
                        onClick={() => handleAction(action.id)}
                        className={cn(
                          "h-10 text-[10px] font-black uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95",
                          action.variant === 'destructive' ? 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-red-100 shadow-sm' : 
                          action.variant === 'outline' ? 'border-slate-200 text-slate-600 hover:bg-slate-50' : 
                          'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                        )}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-100 border-dashed rounded-xl p-6 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      {selectedDocument.stateCode === 'S5' ? 'Controlled Phase: Version Live' : 'Waiting for Authorized Sign-off'}
                    </p>
                    {selectedDocument.stateCode === 'S5' && (
                      <p className="text-[9px] text-slate-400 font-bold mt-1 italic">Monitoring effective index in {selectedDocument.register} register.</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-xl shadow-slate-200/50">
            <CardHeader className="pb-3 flex flex-row items-center justify-between border-b border-gray-50 bg-slate-50/30 px-5">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-sans">
                Review Threads
              </CardTitle>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Live Syncing</span>
              </div>
            </CardHeader>
            <CardContent className="px-0">
              <div className="space-y-0 max-h-[400px] overflow-y-auto px-5 py-4 bg-white">
                {docComments.length > 0 ? docComments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                )) : (
                  <div className="py-10 text-center text-slate-300">
                    <MessageSquare className="w-8 h-8 mx-auto opacity-20 mb-2" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">No active discussion</p>
                  </div>
                )}
              </div>
              <div className="p-5 bg-slate-50/50 border-t border-gray-100 flex flex-col gap-3">
                <div className="flex gap-2">
                  <Input 
                    id="comment-input"
                    placeholder="Write a comment..." 
                    className="h-10 text-[11px] bg-white border-slate-200 focus:ring-indigo-600 shadow-sm"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  />
                  <Button size="icon" className="h-10 w-10 bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 shrink-0" onClick={() => handleAddComment()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
