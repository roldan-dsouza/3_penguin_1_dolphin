import Document from "../model/document.model.mjs";
import extractTextFromPDF from "./pdf.service.mjs";
import { simplifyWithAI } from "./ai.service.mjs";

export const createDocument = async (file, userId) => {
  console.log(file.path);
  const originalText = await extractTextFromPDF(file.path);

  const simplifiedText = await simplifyWithAI(originalText, "pdf");

  const document = await Document.create({
    userId,
    title: file.originalname,
    originalFileUrl: file.path,
    originalContent: originalText,
    simplifiedContent: simplifiedText,
  });

  return document;
};
