import React from "react";
import { Brain, Upload, FileText, Loader2, Activity } from "lucide-react";

export default function InputForm({ query, setQuery, file, setFile, onSubmit, isProcessing }) {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 backdrop-blur-sm">
      <h2 className="text-base font-semibold text-slate-200 mb-1 flex items-center gap-2">
        <Brain className="h-4 w-4 text-emerald-400" /> Workflow Configuration
      </h2>
      <p className="text-xs text-slate-400 mb-4">
        Upload raw epidemiological artifacts or enter direct prompts.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-2">Research Query</label>
          <textarea
            rows={4}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Analyze recent Dengue vector expansion trends..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-2">Surveillance Artifact (OCR)</label>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-lg p-4 text-center bg-slate-950/50 relative"
          >
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            {file ? (
              <div className="flex items-center justify-between bg-slate-900 p-2 rounded border border-slate-800">
                <div className="flex items-center space-x-2 truncate">
                  <FileText className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-300 truncate">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-xs text-rose-400 px-2"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center py-2 space-y-1">
                <Upload className="h-6 w-6 text-slate-500 mb-1" />
                <p className="text-xs text-slate-300 font-medium">Click or drag document here</p>
                <p className="text-[10px] text-slate-500">JPG, PNG, PDF (Max 10MB)</p>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Executing Pipeline...</span>
            </>
          ) : (
            <>
              <Activity className="h-4 w-4" />
              <span>Run Pipeline</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}