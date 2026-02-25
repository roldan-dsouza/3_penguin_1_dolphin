import Groq from "groq-sdk";

// Initialize Groq with browser support enabled
const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    dangerouslyAllowBrowser: true // Required for client‑side usage
});

// Simple in‑memory caches
const definitionCache = new Map<string, string>();
const phoneticCache = new Map<string, string | null>();
const syllablesCache = new Map<string, string[]>();

// Fallback local definitions for very common words (optional)
const localDefinitions: Record<string, string> = {
    hello: "A greeting.",
    world: "The earth and all its people.",
    // add more as you like
};

export async function getDefinition(word: string): Promise<string> {
    const lowerWord = word.toLowerCase();
    if (definitionCache.has(lowerWord)) {
        return definitionCache.get(lowerWord)!;
    }
    if (localDefinitions[lowerWord]) {
        definitionCache.set(lowerWord, localDefinitions[lowerWord]);
        return localDefinitions[lowerWord];
    }

    try {
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "You are a dictionary. Provide a short, simple definition for the given word. Return only the definition, no extra text.",
                },
                { role: "user", content: word },
            ],
            max_tokens: 50,
            temperature: 0.2,
        });
        const definition = response.choices[0]?.message?.content?.trim() || "Definition not found.";
        definitionCache.set(lowerWord, definition);
        return definition;
    } catch (error) {
        console.error("Groq definition error:", error);
        return "Definition not available.";
    }
}

export async function getPhonetic(word: string): Promise<string | null> {
    const lowerWord = word.toLowerCase();
    if (phoneticCache.has(lowerWord)) {
        return phoneticCache.get(lowerWord)!;
    }

    try {
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "You are a pronunciation guide. Return the phonetic transcription (IPA) of the given word. If unsure, return null. Output only the IPA or null.",
                },
                { role: "user", content: word },
            ],
            max_tokens: 30,
            temperature: 0.1,
        });
        const phonetic = response.choices[0]?.message?.content?.trim();
        const result = phonetic && phonetic !== "null" ? phonetic : null;
        phoneticCache.set(lowerWord, result);
        return result;
    } catch {
        return null;
    }
}

export async function getSyllables(word: string): Promise<string[]> {
    const lowerWord = word.toLowerCase();
    if (syllablesCache.has(lowerWord)) {
        return syllablesCache.get(lowerWord)!;
    }

    try {
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "You are a syllable splitter. Return the given word broken into syllables, separated by hyphens. Example: 'hello' -> 'hel-lo'. Output only the hyphenated syllables.",
                },
                { role: "user", content: word },
            ],
            max_tokens: 30,
            temperature: 0.1,
        });
        const hyphenated = response.choices[0]?.message?.content?.trim();
        const syllables = hyphenated ? hyphenated.split('-') : [word];
        syllablesCache.set(lowerWord, syllables);
        return syllables;
    } catch {
        return [word];
    }
}