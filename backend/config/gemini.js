import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();


export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateWithRetry(contents, maxRetries = 3, initialDelay = 2000) {
  let retries = 0;
  let delay = initialDelay;

  while (retries < maxRetries) {
    try {
      const result = await model.generateContent(contents);
      const response = await result.response;
      return response.text();
    } catch (error) {
      retries++;
      if ((error.status === 503 || error.status === 429) && retries < maxRetries) {
        console.warn(`Gemini Busy. Retrying in ${delay / 1000}s... (${retries}/${maxRetries})`);
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2;
      } else {
        throw error;
      }
    }
  }
}
