import multer from 'multer';
import fs from "fs";

const storage = multer.memoryStorage();
export const upload = multer({ storage });


export const parseFileContent = (file) => {
  if (!file) return null;
  

  const fileText = file.buffer.toString('utf-8');
  return fileText;
};




export function fileToGenerativePart(filePath, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType
    },
  };
}
