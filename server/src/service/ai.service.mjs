import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const simplifyWithAI = async (content, type) => {
  let systemPrompt;

  if (type === "html") {
    systemPrompt = `
You are a dyslexia accessibility HTML transformer.

STRICT RULES:
- Keep ALL HTML tags exactly the same.
- Do NOT remove or modify tags.
- Only simplify visible text.
- Return full valid HTML.
`;
  }

  if (type === "pdf") {
    systemPrompt = `
You are a dyslexia accessibility expert.

Simplify this text:
- Short sentences
- Simple words
- Break long paragraphs
Return clean readable text.
`;
  }

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content },
    ],
    max_tokens: 4000,
  });

  return response.choices[0].message.content;
};
