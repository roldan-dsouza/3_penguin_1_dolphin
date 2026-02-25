import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();
const GROQ_API_KEY = process.env.GROQ_API_KEY;

const groq = new Groq({ apiKey: GROQ_API_KEY });

export const simplifyHtmlForDyslexia = async (req, res) => {
  try {
    console.log("it ran");
    const { htmlContent } = req.body;

    console.log("Received HTML content:", htmlContent);

    if (!htmlContent) {
      return res.status(400).json({ message: "HTML content is required." });
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
  You are a dyslexia accessibility expert.
  
  Your task:
  - Simplify ALL visible text for people with dyslexia.
  - Use short sentences.
  - Use simple vocabulary.
  - Use clear and direct language.
  - One idea per sentence.
  - Avoid complex words.
  - Avoid passive voice.
  
  CRITICAL RULES:
  - DO NOT remove, add, or modify ANY HTML tags.
  - DO NOT change tag names.
  - DO NOT change attributes.
  - DO NOT change structure.
  - Keep EXACT same number of tags.
  - Only rewrite the text between tags.
  - Return FULL valid HTML.
  - Output ONLY the modified HTML.
            `,
        },
        {
          role: "user",
          content: htmlContent,
        },
      ],
      max_tokens: 4000,
    });

    const simplifiedHtml = response.choices[0].message.content;

    res.status(200).json({
      message: "HTML simplified successfully",
      simplifiedHtml,
    });
  } catch (error) {
    console.log("Full error:", error);
    res.status(500).json({ message: error.message });
  }
};
