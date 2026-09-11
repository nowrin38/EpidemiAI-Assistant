import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { processOutbreakQuery } from './agents/epidemicAgent.js';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

// এন্ডপয়েন্টটি ঠিক /api/analyze হতে হবে
app.post('/api/analyze', upload.single('file'), async (req, res) => {
  try {
    const query = req.body.query;
    const file = req.file;

    const result = await processOutbreakQuery(query, file);

    // অবশ্যই JSON রেসপন্স পাঠাতে হবে
    res.json({ analysis: result });
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});