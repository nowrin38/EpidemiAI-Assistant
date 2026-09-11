import dotenv from 'dotenv';
dotenv.config();

process.env.LANGCHAIN_TRACING_V2 = "true";
process.env.LANGCHAIN_ENDPOINT = "https://api.smith.langchain.com";
process.env.LANGCHAIN_API_KEY = process.env.LANGCHAIN_API_KEY;
process.env.LANGCHAIN_PROJECT = process.env.LANGCHAIN_PROJECT || "EpidemiAI-Key";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { SYSTEM_PROMPT } from '../prompts/surveillance.js';

const model = new ChatGoogleGenerativeAI({
model: "gemini-3.6-flash",
  apiKey: process.env.GEMINI_API_KEY || "AQ.Ab8RN6LqHBtb6jCs86BT9tz_UmzLco4m-1XKRKV13adgu3ASAQ",
});

async function callGeminiWithRetry(messages, maxRetries = 5, initialDelay = 3000) {
  let retries = 0;
  let delay = initialDelay;

  while (retries < maxRetries) {
    try {
      const response = await model.invoke(messages);
      return response;
    } catch (error) {
      retries++;
      const errorString = JSON.stringify(error) || error.message || '';
      const isUnavailable = 
        error.status === 503 || 
        error.code === 503 || 
        errorString.includes('503') || 
        errorString.includes('high demand') ||
        errorString.includes('UNAVAILABLE');

      if (isUnavailable && retries < maxRetries) {
        console.warn(`[EpidemicAgent] Gemini overloaded (503). Retrying in ${delay / 1000}s... (${retries}/${maxRetries})`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; 
      } else {
        throw error;
      }
    }
  }
}

export async function processOutbreakQuery(query, file) {
  const messages = [
    new SystemMessage(SYSTEM_PROMPT)
  ];

  const contentParts = [];

  if (file) {
    contentParts.push({
      type: "image_url",
      image_url: {
        url: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
      }
    });
  }

  if (query) {
    contentParts.push({
      type: "text",
      text: query
    });
  }

  if (contentParts.length === 0) {
    contentParts.push({ type: "text", text: "Hello" });
  }

  messages.push(new HumanMessage({ content: contentParts }));

  const response = await callGeminiWithRetry(messages);

  return response.content;
}
