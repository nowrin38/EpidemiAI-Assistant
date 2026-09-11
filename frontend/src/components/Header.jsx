import React from "react";
import { Activity, Database } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
          <Activity className="h-6 w-6 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight bg-linear-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent">
            EpidemiAI
          </h1>
          <p className="text-xs text-slate-400">Outbreak Intelligence & Surveillance Platform</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 text-xs font-mono">
        <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300">LangSmith Active</span>
        </div>
        <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
          <Database className="h-3.5 w-3.5 text-sky-400" />
          <span className="text-slate-300">Pinecone Connected</span>
        </div>
      </div>
    </header>
  );
}
