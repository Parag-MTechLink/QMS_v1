import React from "react";
import { cn } from "@/lib/utils";

const statusStyles = {
  // Classic Labels
  Draft: "bg-slate-100 text-slate-700 border-slate-200",
  "Under Review": "bg-blue-50 text-blue-700 border-blue-100",
  Rework: "bg-amber-50 text-amber-700 border-amber-100",
  "Under Approval": "bg-indigo-50 text-indigo-700 border-indigo-100",
  "Approved-Pending Release": "bg-purple-50 text-purple-700 border-purple-100",
  Released: "bg-emerald-50 text-emerald-700 border-emerald-100 shadow-sm shadow-emerald-100/50",
  Obsolete: "bg-red-50 text-red-700 border-red-100",
  Archived: "bg-gray-100 text-gray-500 border-gray-200 grayscale",

  // S-Codes
  S0: "bg-slate-100 text-slate-700 border-slate-200",
  S1: "bg-blue-50 text-blue-700 border-blue-100",
  S2: "bg-amber-50 text-amber-700 border-amber-100",
  S3: "bg-indigo-50 text-indigo-700 border-indigo-100 font-bold animate-pulse",
  S4: "bg-purple-50 text-purple-700 border-purple-100",
  S5: "bg-emerald-50 text-emerald-700 border-emerald-100 shadow-sm shadow-emerald-100/50 font-bold",
  S6: "bg-red-50 text-red-700 border-red-100",
  S7: "bg-gray-100 text-gray-500 border-gray-200 grayscale",
};

export const StatusBadge = ({ status, stateCode, className }) => {
  const key = stateCode || status;
  const style = statusStyles[key] || "bg-gray-100 text-gray-800 border-gray-200";
  
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all",
      style,
      className
    )}>
      {key === stateCode ? `${stateCode} ${status}` : status}
    </span>
  );
};

