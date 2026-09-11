import React from "react";
import { CheckCircle } from "lucide-react";

export default function WorkflowTracker({ activeStep }) {
  const steps = [
    { step: 1, label: "Document Ingestion & OCR", desc: "Extract raw text from images/PDFs" },
    { step: 2, label: "Vector Database RAG", desc: "Query literature similarity in Pinecone" },
    { step: 3, label: "Search Grounding Engine", desc: "Retrieve real-time web & weather data" },
    { step: 4, label: "Supervisor Agent Synthesis", desc: "Consolidate findings & structure report" },
  ];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 backdrop-blur-sm">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Multi-Agent Workflow Execution
      </h3>
      <div className="space-y-3">
        {steps.map((item) => (
          <div key={item.step} className="flex items-start space-x-3">
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                activeStep > item.step
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : activeStep === item.step
                  ? "bg-sky-500/20 text-sky-400 border border-sky-500/50 animate-pulse"
                  : "bg-slate-900 text-slate-600 border border-slate-800"
              }`}
            >
              {activeStep > item.step ? <CheckCircle className="h-3.5 w-3.5" /> : item.step}
            </div>
            <div>
              <p className={`text-xs font-medium ${activeStep >= item.step ? "text-slate-200" : "text-slate-500"}`}>
                {item.label}
              </p>
              <p className="text-[10px] text-slate-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}