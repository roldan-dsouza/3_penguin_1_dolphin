import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const extractTextFromPDF = async (filePath) => {
  const pdfThing = new PDFParse();
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfThing.parse(dataBuffer);

  return data.text;
};

export default extractTextFromPDF;
