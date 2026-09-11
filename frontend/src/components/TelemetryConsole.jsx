import React from "react";
import { Terminal } from "lucide-react";

export default function TelemetryConsole({ traces }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-slate-300 flex items-center gap-2 font-mono">
          <Terminal className="h-3.5 w-3.5 text-sky-400" /> Agent Execution Telemetry (LangSmith)
        </h3>
        <span className="text-[10px] text-slate-500 font-mono">Channel: SSE Logs</span>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-[11px] h-36 overflow-y-auto space-y-1.5">
        {traces.length === 0 ? (
          <p className="text-slate-600 italic">Waiting for pipeline execution logs...</p>
        ) : (
          traces.map((trace, idx) => (
            <div key={idx} className="flex space-x-2 text-slate-400 border-b border-slate-900/50 pb-1">
              <span className="text-slate-600">{trace.timestamp}</span>
              <span className="text-sky-400">[{trace.source}]</span>
              <span className="text-slate-300">{trace.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}