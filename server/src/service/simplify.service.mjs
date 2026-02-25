import { simplifyWithAI } from "./ai.service.mjs";

export const simplifyFullHtml = async (htmlContent) => {
  const cleanedHtml = htmlContent
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");

  const simplified = await simplifyWithAI(cleanedHtml, "html");

  return simplified;
};
