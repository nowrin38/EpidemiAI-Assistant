
import express from 'express';
import fs from 'fs';
import { upload, fileToGenerativePart } from '../tools/fileParser.js';
import { processOutbreakQuery } from '../agents/epidemicAgent.js';
import { generateWithRetry } from '../config/gemini.js';

const router = express.Router();


router.post('/analyze', upload.single('document'), async (req, res) => {
  try {
    const userQuery = req.body.userQuery || '';
    const file = req.file || null;

    const result = await processOutbreakQuery(userQuery, file);
    res.json({ response: result });
  } catch (error) {
    console.error('Error analyzing request:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});


router.post('/analyze-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const imagePart = fileToGenerativePart(req.file.path, req.file.mimetype);
    const prompt = "Classify this image, identify if it is a disease vector like Aedes mosquito, and provide key details.";

   
    const resultText = await generateWithRetry([prompt, imagePart]);

  
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.json({ success: true, response: resultText });
  } catch (error) {
    console.error('Error analyzing image:', error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(503).json({
      success: false,
      error: "Server is busy right now. Please try again in a few seconds."
    });
  }
});

export default router;
