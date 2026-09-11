import React from "react";
import { ShieldCheck, Activity } from "lucide-react";

export default function ReportView({ report }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 backdrop-blur-sm flex-1 flex flex-col min-h-100">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
        <h2 className="text-base font-semibold text-slate-200 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" /> Analytical Synthesis Report
        </h2>
        {report && (
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
            Report Ready
          </span>
        )}
      </div>

      <div className="flex-1 bg-slate-950 border border-slate-800/80 rounded-lg p-4 overflow-y-auto max-h-112.5">
        {report ? (
          <div className="prose prose-invert prose-xs max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
            {report}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-3">
            <Activity className="h-10 w-10 text-slate-700 stroke-1" />
            <p className="text-xs">No active analysis generated yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}