import React from "react";
import { cn } from "@/lib/utils";

const statusStyles = {
  Draft: "bg-blue-100 text-blue-800 border-blue-200",
  "Under Review": "bg-amber-100 text-amber-800 border-amber-200",
  Rework: "bg-red-100 text-red-800 border-red-200",
  "Under Approval": "bg-purple-100 text-purple-800 border-purple-200",
  "Approved – Pending Release": "bg-teal-100 text-teal-800 border-teal-200",
  "Released / Effective": "bg-green-100 text-green-800 border-green-200",
  Effective: "bg-green-100 text-green-800 border-green-200",
  Obsolete: "bg-gray-100 text-gray-600 border-gray-200",
  Archived: "bg-gray-200 text-gray-500 border-gray-300",
};

export const StatusBadge = ({ status, className }) => {
  const style = statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-200";
  
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors",
      style,
      className
    )}>
      {status}
    </span>
  );
};
