# 🦠 EpidemiAI — Public Health Surveillance & Epidemic Analysis Platform

> **An intelligent, multimodal public health surveillance system built with React, Express, LangChain, Google Gemini, and LangSmith tracing.**

---

## 📽️ Project Presentation & Live Traces

* **📺 Video Presentation & Demo:** [Insert Your Presentation Video Link Here]()
* **🔍 Live LangSmith Traces Dashboard:** [View Public LangSmith Project Traces](https://smith.langchain.com/public/92cc976e-e964-4006-be4d-c45a91232fc2/r/01a08fba-4f6b-76cf-bc3f-2cb3419b0f1b?start_time=2026-09-11T09%3A09%3A07.051001Z)

---

## 📌 Project Context & Overview

**EpidemiAI** is designed to assist healthcare professionals, epidemiologists, and community health workers in detecting, analyzing, and responding to vector-borne disease outbreaks (such as Dengue, Chikungunya, and Malaria).

In regions heavily impacted by seasonal outbreaks, rapid risk identification is critical. EpidemiAI bridges the gap between raw data and actionable public health strategy by combining **visual evidence processing** (like mosquito identification and breeding site detection) with **LLM-driven surveillance prompts**. 

Every interaction processed by the platform is monitored in real-time using **LangSmith**, ensuring full visibility into system prompt behavior, model latency, and execution stability.

---

## ⚡ Key Highlights & Capabilities

* **🦟 Multimodal Disease Analysis:** Accepts both text queries and visual evidence (mosquito image vectors, breeding site photos, symptom charts) for instant vector identification.
* **🤖 LangChain + Gemini Engine:** Built using `@langchain/google-genai` with `gemini-3.6-flash` and exponential backoff retry logic to handle heavy API traffic seamlessly.
* **🔍 Full Observability via LangSmith:** Monitors inputs/outputs, base64 image payloads, token usage, latency metrics, and execution graphs for complete transparency.
* **💬 Multi-Session Responsive UI:** Modern React dashboard featuring multi-chat sessional state, real-time file previews, formatted responses, and effortless navigation.
* **🌐 Multilingual Support:** Seamlessly processes and responds in both **Bengali (বাংলা)** and **English** depending on user queries.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, Lucide React Icons
* **Backend:** Node.js, Express.js, Multer (File Handling)
* **LLM Engine:** Google Gemini (`gemini-3.6-flash`)
* **Framework & Orchestration:** LangChain (`@langchain/google-genai`, `@langchain/core`)
* **Observability & Tracing:** LangSmith (`LANGCHAIN_TRACING_V2`)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local setup:
* **Node.js:** v18.x or higher
* **npm:** v9.x or higher
* **API Keys:** Google Gemini API Key & LangSmith API Key

---

### 1. Backend Installation & Setup

Navigate to the `backend` directory and install dependencies:


cd backend
npm install

Start the backend server:
npm run dev
2. Frontend Installation & Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
cd frontend
npm install

Start the frontend development server:
npm run dev


---


API Reference
POST /api/analyze
Processes multimodal surveillance queries and outputs structured epidemiological guidance.

Content-Type: multipart/form-data

Request Body:

query : Text query or prompt regarding disease surveillance or symptoms.

file: Image upload (e.g., mosquito image, symptom image, breeding area).


---

Observability & LangSmith Tracing

All LLM runs executed by EpidemiAI are automatically recorded on the LangSmith dashboard. This ensures:

1.Full Trace Visibility: Complete logging of system prompts, human user messages, and base64-encoded image payloads.

2.Performance Metrics: Real-time visibility into response latency, token usage, and model performance.

3.Fault Tolerance: Tracking exponential backoff retries in case of API rate-limiting or 503 service unavailable statuses.


