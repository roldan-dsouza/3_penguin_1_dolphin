// server/src/service/pdf.service.mjs

import fs from "fs";
import { PDFParse } from "pdf-parse";

const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);

  return data.text;
};

export default extractTextFromPDF;
