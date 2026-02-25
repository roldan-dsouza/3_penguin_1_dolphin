const definitions: Record<string, string> = {
    "the": "A word used before a noun to show which one you mean.",
    "a": "A word used before a noun when talking about something for the first time.",
    "is": "A word that means something exists or happens.",
    "are": "A word that means more than one thing exists or happens.",
    "was": "A word that means something existed or happened in the past.",
    "it": "A word used to talk about a thing already mentioned.",
    "and": "A word that connects two things together.",
    "but": "A word that shows an opposite or different idea.",
    "or": "A word that gives you a choice between things.",
    "not": "A word that means the opposite of something.",
    "can": "A word that means you are able to do something.",
    "will": "A word that means something is going to happen.",
    "use": "To do something with a tool or object to get a result.",
    "help": "To make things easier for someone.",
    "show": "To let someone see something.",
    "start": "To begin doing something.",
    "end": "The point where something stops.",
    "try": "To make an effort to do something.",
    "understand": "To know what something means.",
    "get": "To receive or obtain something.",
    "enough": "As much as you need.",
    "many": "A large number of things.",
    "spread": "To cover a larger area or reach more people.",
    "explain": "To make something clear so others can understand.",
    "compare": "To look at two things to see how they are alike or different.",
    "need": "Something you must have.",
    "continue": "To keep going without stopping.",
    "prove": "To show that something is true.",
    "improve": "To make something better.",
    "aware": "Knowing that something exists.",
    "harmful": "Something that can hurt or damage.",
    "effective": "Working well and getting good results.",
    "model": "An example or pattern to follow.",
    "teamwork": "Working together with others to reach a goal.",
    "method": "A way of doing something.",
    "structure": "The way parts are put together.",
    "rain": "Water falling from the clouds.",
    "test": "A way to find out if something works.",
    "event": "Something that happens.",
    "important": "Something that matters a lot.",
    "basic": "The simplest and most necessary part.",
    "main": "The most important one.",
    "change": "To become different.",
    "plants": "Living things that grow in the ground.",
    "food": "Things you eat to stay alive.",
    "water": "A clear liquid that all living things need.",
    "earth": "The planet we live on.",
    "sun": "The star that gives us light and heat.",
    "moon": "The round object that orbits Earth at night.",
    "animal": "A living thing that can move and breathe.",
    "human": "A person — someone like you and me.",
    "life": "The time between being born and dying.",
    "world": "All the places and people on Earth.",
    "time": "The thing that clocks measure.",
    "day": "The time when the sun is up.",
    "night": "The time when the sky is dark.",
    "book": "Pages with words that tell a story or share facts.",
    "school": "A place where you go to learn.",
    "friend": "Someone you like and enjoy being with.",
    "happy": "Feeling good and joyful.",
    "sad": "Feeling unhappy or down.",
    "big": "Large in size.",
    "small": "Little in size.",
    "fast": "Moving quickly.",
    "slow": "Not moving quickly.",
    "good": "Something positive or nice.",
    "bad": "Something negative or not nice.",
    "new": "Recently made or discovered.",
    "old": "Having been around for a long time.",
    "hard": "Difficult to do, or firm to touch.",
    "easy": "Simple to do.",
    "read": "To look at words and understand them.",
    "write": "To put words on paper or a screen.",
    "learn": "To gain new knowledge or skills.",
    "think": "To use your brain to figure something out.",
    "know": "To have information in your mind.",
    "see": "To use your eyes to look at something.",
    "hear": "To use your ears to notice sounds.",
    "feel": "To sense something with your body or emotions.",
    "move": "To go from one place to another.",
    "play": "To have fun doing an activity.",
    "work": "To do tasks or jobs.",
    "home": "The place where you live.",
    "make": "To create or build something.",
    "find": "To discover something.",
    "give": "To hand something to someone else.",
    "take": "To grab or receive something.",
    "come": "To move toward a place.",
    "go": "To move away from a place.",
    "run": "To move very fast on your feet.",
    "walk": "To move on your feet at a regular pace.",
    "talk": "To speak words to someone.",
    "say": "To speak words out loud.",
    "ask": "To pose a question.",
    "tell": "To share information with someone.",
    "look": "To direct your eyes at something.",
    "want": "To wish for something.",
    "like": "To enjoy something.",
    "love": "To care deeply about someone or something.",
    "eat": "To put food in your mouth and swallow.",
    "drink": "To swallow liquid.",
    "sleep": "To rest with your eyes closed.",
    "open": "To make something no longer closed.",
    "close": "To shut something.",
    "stop": "To no longer continue.",
    "wait": "To stay until something happens.",
    "turn": "To change direction or rotate.",
};

const syllableMap: Record<string, string[]> = {
    "understand": ["un", "der", "stand"],
    "photosynthesis": ["pho", "to", "syn", "the", "sis"],
    "metamorphosis": ["met", "a", "mor", "pho", "sis"],
    "biodiversity": ["bi", "o", "di", "ver", "si", "ty"],
    "ecosystem": ["e", "co", "sys", "tem"],
    "precipitation": ["pre", "ci", "pi", "ta", "tion"],
    "evaporation": ["e", "va", "po", "ra", "tion"],
    "condensation": ["con", "den", "sa", "tion"],
    "hypothesis": ["hy", "po", "the", "sis"],
    "experiment": ["ex", "per", "i", "ment"],
    "observation": ["ob", "ser", "va", "tion"],
    "conclusion": ["con", "clu", "sion"],
    "phenomenon": ["phe", "nom", "e", "non"],
    "significant": ["sig", "ni", "fi", "cant"],
    "fundamental": ["fun", "da", "men", "tal"],
    "preliminary": ["pre", "lim", "i", "na", "ry"],
    "comprehensive": ["com", "pre", "hen", "sive"],
    "predominant": ["pre", "dom", "i", "nant"],
    "inevitable": ["in", "ev", "i", "ta", "ble"],
    "important": ["im", "por", "tant"],
    "effective": ["ef", "fec", "tive"],
    "structure": ["struc", "ture"],
    "teamwork": ["team", "work"],
    "method": ["meth", "od"],
    "harmful": ["harm", "ful"],
    "improve": ["im", "prove"],
    "continue": ["con", "tin", "ue"],
    "explain": ["ex", "plain"],
    "compare": ["com", "pare"],
    "together": ["to", "geth", "er"],
    "another": ["a", "noth", "er"],
    "everyone": ["ev", "ry", "one"],
    "beautiful": ["beau", "ti", "ful"],
    "different": ["dif", "fer", "ent"],
    "animal": ["an", "i", "mal"],
    "human": ["hu", "man"],
    "water": ["wa", "ter"],
    "reading": ["read", "ing"],
    "writing": ["writ", "ing"],
    "learning": ["learn", "ing"],
    "teaching": ["teach", "ing"],
    "playing": ["play", "ing"],
    "working": ["work", "ing"],
    "running": ["run", "ning"],
    "walking": ["walk", "ing"],
    "talking": ["talk", "ing"],
    "sleeping": ["sleep", "ing"],
    "happy": ["hap", "py"],
    "model": ["mod", "el"],
    "basic": ["ba", "sic"],
    "event": ["e", "vent"],
    "change": ["change"],
    "enough": ["e", "nough"],
    "spread": ["spread"],
    "hello": ["hel", "lo"],
    "world": ["world"],
    "school": ["school"],
    "friend": ["friend"],
};

function autoSyllabify(word: string): string[] {
    const lower = word.toLowerCase();
    const vowels = "aeiouy";
    const syllables: string[] = [];
    let current = "";

    for (let i = 0; i < lower.length; i++) {
        current += lower[i];
        const isVowel = vowels.includes(lower[i]);
        const nextIsConsonant = i + 1 < lower.length && !vowels.includes(lower[i + 1]);

        if (isVowel && nextIsConsonant && current.length >= 2) {
            if (i + 2 < lower.length) {
                syllables.push(current);
                current = "";
            }
        }
    }
    if (current) {
        if (syllables.length > 0 && current.length === 1) {
            syllables[syllables.length - 1] += current;
        } else {
            syllables.push(current);
        }
    }
    return syllables.length > 0 ? syllables : [word];
}

export function getDefinition(word: string): string {
    const lower = word.toLowerCase().replace(/[^a-z]/g, "");
    return definitions[lower] || `"${word}" — a word you can learn more about!`;
}

export function getSyllables(word: string): string[] {
    const lower = word.toLowerCase().replace(/[^a-z]/g, "");
    return syllableMap[lower] || autoSyllabify(lower);
}
const phoneticMap: Record<string, string> = {
    hello: "/həˈloʊ/",
    world: "/wɜːrld/",
    // ... add more
};
export const getPhonetic = (word: string) => phoneticMap[word.toLowerCase()] || null;