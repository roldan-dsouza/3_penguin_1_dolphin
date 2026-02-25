"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Play, X, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDefinition, getSyllables, getPhonetic } from "@/lib/dictionary";
import { useApp, presetColors } from "@/context/AppContext";

const syllableColors = [
    "text-blue-500",
    "text-red-500",
    "text-green-600",
    "text-amber-500",
    "text-purple-500",
    "text-pink-500",
    "text-teal-500",
    "text-orange-500",
];

interface WordAssistantProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function WordAssistant({ containerRef }: WordAssistantProps) {
    const { preferences } = useApp();
    const preset = presetColors[preferences.bgPreset];
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
    const [showMenu, setShowMenu] = useState(false);
    const [showMeaning, setShowMeaning] = useState(false);
    const [showPronunciation, setShowPronunciation] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // New state for async data
    const [definition, setDefinition] = useState<string | null>(null);
    const [phonetic, setPhonetic] = useState<string | null>(null);
    const [syllables, setSyllables] = useState<string[]>([]);
    const [loadingMeaning, setLoadingMeaning] = useState(false);
    const [loadingPronunciation, setLoadingPronunciation] = useState(false);

    const handleDoubleClick = useCallback((e: MouseEvent) => {
        const selection = window.getSelection();
        const word = selection?.toString().trim();
        if (word && word.length > 0 && /^[a-zA-Z'-]+$/.test(word)) {
            setSelectedWord(word);
            setMenuPos({ x: e.clientX, y: e.clientY });
            setShowMenu(true);
            setShowMeaning(false);
            setShowPronunciation(false);
        }
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener("dblclick", handleDoubleClick);
            return () => container.removeEventListener("dblclick", handleDoubleClick);
        }
    }, [containerRef, handleDoubleClick]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setShowMenu(false);
                setShowMeaning(false);
                setShowPronunciation(false);
            }
        };
        if (showMenu || showMeaning || showPronunciation) {
            document.addEventListener("mousedown", handleClick);
            return () => document.removeEventListener("mousedown", handleClick);
        }
    }, [showMenu, showMeaning, showPronunciation]);

    const handleSpeak = useCallback(() => {
        if (!selectedWord || typeof window === "undefined") return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(selectedWord);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    }, [selectedWord]);

    const closeAll = () => {
        setShowMenu(false);
        setShowMeaning(false);
        setShowPronunciation(false);
        setSelectedWord(null);
    };

    const menuLeft = Math.min(menuPos.x, typeof window !== "undefined" ? window.innerWidth - 220 : menuPos.x);
    const menuTop = Math.min(menuPos.y + 10, typeof window !== "undefined" ? window.innerHeight - 200 : menuPos.y);

    // Async handlers
    const handleMeaningClick = useCallback(async () => {
        setShowMenu(false);
        setShowMeaning(true);
        if (!selectedWord) return;
        setLoadingMeaning(true);
        const def = await getDefinition(selectedWord);
        setDefinition(def);
        setLoadingMeaning(false);
    }, [selectedWord]);

    const handlePronunciationClick = useCallback(async () => {
        setShowMenu(false);
        setShowPronunciation(true);
        if (!selectedWord) return;
        setLoadingPronunciation(true);
        const [phon, syl] = await Promise.all([
            getPhonetic(selectedWord),
            getSyllables(selectedWord),
        ]);
        setPhonetic(phon);
        setSyllables(syl);
        setLoadingPronunciation(false);
    }, [selectedWord]);

    // Reset data when a new word is selected
    useEffect(() => {
        if (selectedWord) {
            setDefinition(null);
            setPhonetic(null);
            setSyllables([]);
        }
    }, [selectedWord]);

    return (
        <div ref={menuRef}>
            {/* Quick Action Menu */}
            <AnimatePresence>
                {showMenu && selectedWord && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: -5 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="fixed z-[60] rounded-2xl shadow-2xl border p-2 min-w-[200px]"
                        style={{
                            left: menuLeft,
                            top: menuTop,
                            backgroundColor: preset.bg,
                            color: preset.text,
                            borderColor: `${preset.text}20`,
                        }}
                    >
                        <div className="px-3 py-2 text-xs font-medium opacity-50 uppercase tracking-wider">
                            &ldquo;{selectedWord}&rdquo;
                        </div>
                        <button
                            onClick={handleMeaningClick}
                            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-indigo-500/10 transition-colors text-left cursor-pointer"
                        >
                            <BookOpen className="w-4 h-4 text-indigo-500" />
                            <span className="font-medium">Meaning</span>
                        </button>
                        <button
                            onClick={handlePronunciationClick}
                            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-purple-500/10 transition-colors text-left cursor-pointer"
                        >
                            <Volume2 className="w-4 h-4 text-purple-500" />
                            <span className="font-medium">Pronunciation</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Meaning Tooltip */}
            <AnimatePresence>
                {showMeaning && selectedWord && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="fixed z-[60] rounded-2xl shadow-2xl border p-5 max-w-sm"
                        style={{
                            left: Math.min(menuLeft, typeof window !== "undefined" ? window.innerWidth - 350 : menuLeft),
                            top: menuTop,
                            backgroundColor: preset.bg,
                            color: preset.text,
                            borderColor: `${preset.text}20`,
                        }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-indigo-500" />
                                <span className="font-bold text-lg">{selectedWord}</span>
                            </div>
                            <button onClick={closeAll} className="p-1 rounded-lg hover:bg-current/10 transition-colors cursor-pointer" aria-label="Close">
                                <X className="w-4 h-4 opacity-50" />
                            </button>
                        </div>
                        {loadingMeaning ? (
                            <div className="flex justify-center py-4">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500" />
                            </div>
                        ) : (
                            <p className="leading-relaxed opacity-80">{definition}</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pronunciation Sidebar */}
            <AnimatePresence>
                {showPronunciation && selectedWord && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[55] bg-black/20 backdrop-blur-sm"
                            onClick={closeAll}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: 50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8, x: 50 }}
                            transition={{ type: "spring", damping: 22, stiffness: 250 }}
                            className="fixed right-4 top-[15%] md:right-8 z-[60] w-[calc(100%-2rem)] max-w-sm rounded-2xl shadow-2xl border overflow-hidden"
                            style={{ backgroundColor: preset.bg, color: preset.text, borderColor: `${preset.text}20` }}
                        >
                            {/* Close button */}
                            <div className="flex justify-end p-3">
                                <button onClick={closeAll} className="p-2 rounded-xl hover:bg-current/10 transition-colors cursor-pointer" aria-label="Close">
                                    <X className="w-5 h-5 opacity-50" />
                                </button>
                            </div>

                            <div className="px-6 pb-8 text-center">
                                {/* Human-like Avatar */}
                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                    className="relative w-28 h-28 mx-auto mb-5"
                                >
                                    {/* Head */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 to-amber-400 shadow-xl flex items-center justify-center">
                                        {/* Eyes */}
                                        <div className="flex gap-4 mt-2">
                                            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                                            </div>
                                            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                                            </div>
                                        </div>
                                        {/* Mouth - changes when speaking */}
                                        <motion.div
                                            animate={
                                                isSpeaking
                                                    ? {
                                                        scaleY: [1, 1.3, 1],
                                                        transition: { repeat: Infinity, duration: 0.3 }
                                                    }
                                                    : {}
                                            }
                                            className="absolute bottom-5 w-8 h-3 rounded-full bg-red-400"
                                            style={{
                                                borderRadius: isSpeaking ? "50%" : "0 0 20px 20px",
                                                transform: isSpeaking ? "scale(1.2)" : "none"
                                            }}
                                        />
                                    </div>
                                </motion.div>

                                {/* Word and Phonetic */}
                                <h3 className="text-2xl font-bold mb-1">{selectedWord}</h3>
                                {phonetic && (
                                    <p className="text-sm font-mono opacity-70 mb-4">{phonetic}</p>
                                )}

                                {/* Speech Bubble with Syllables */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: 0.3, type: "spring", damping: 18 }}
                                    className="rounded-2xl p-5 mb-6"
                                    style={{ backgroundColor: `${preset.text}08` }}
                                >
                                    <p className="text-sm font-medium opacity-60 mb-3">Let&apos;s break it down:</p>

                                    {/* Syllables */}
                                    {loadingPronunciation ? (
                                        <div className="flex justify-center py-4">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500" />
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-1 text-2xl md:text-3xl font-bold flex-wrap">
                                            {syllables.map((syl, i) => (
                                                <motion.span
                                                    key={i}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.5 + i * 0.15 }}
                                                    className={syllableColors[i % syllableColors.length]}
                                                >
                                                    {syl}
                                                    {i < syllables.length - 1 && (
                                                        <span className="opacity-30 mx-0.5">·</span>
                                                    )}
                                                </motion.span>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>

                                {/* Play Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <Button
                                        variant="accent"
                                        size="lg"
                                        onClick={handleSpeak}
                                        disabled={isSpeaking}
                                        className="w-full"
                                    >
                                        <Play className={`w-5 h-5 ${isSpeaking ? "animate-pulse" : ""}`} />
                                        {isSpeaking ? "Speaking..." : "Play Pronunciation"}
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}