"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Type, Palette, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp, presetColors, type BgPreset, type TextSize, type ReadingMode } from "@/context/AppContext";

const textSizes: { value: TextSize; label: string }[] = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
    { value: "xl", label: "Extra Large" },
];

const bgPresets: { value: BgPreset; bg: string; text: string; name: string }[] = [
    { value: "calm-cream", ...presetColors["calm-cream"] },
    { value: "cool-sky", ...presetColors["cool-sky"] },
    { value: "muted-moss", ...presetColors["muted-moss"] },
    { value: "high-contrast-dark", ...presetColors["high-contrast-dark"] },
];

const readingModes: { value: ReadingMode; label: string }[] = [
    { value: "paragraph", label: "Paragraph Mode" },
    { value: "line-by-line", label: "Line by Line" },
];

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function SettingsModal({ open, onClose }: Props) {
    const { preferences, setPreferences } = useApp();
    const preset = presetColors[preferences.bgPreset];

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md z-50 rounded-2xl shadow-2xl border overflow-y-auto max-h-[80vh]"
                        style={{ backgroundColor: preset.bg, color: preset.text, borderColor: `${preset.text}20` }}
                    >
                        <div className="p-6 md:p-8">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">Settings</h2>
                                <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close settings">
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Text Size */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-3">
                                    <Type className="w-4 h-4 opacity-60" />
                                    <h3 className="font-semibold">Text Size</h3>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {textSizes.map((ts) => (
                                        <button
                                            key={ts.value}
                                            onClick={() => setPreferences({ textSize: ts.value })}
                                            className={`py-3 rounded-2xl text-sm font-medium transition-all cursor-pointer ${preferences.textSize === ts.value
                                                    ? "bg-indigo-500 text-white shadow-md"
                                                    : "hover:opacity-80"
                                                }`}
                                            style={preferences.textSize !== ts.value ? { backgroundColor: `${preset.text}10` } : {}}
                                        >
                                            {ts.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Theme */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-3">
                                    <Palette className="w-4 h-4 opacity-60" />
                                    <h3 className="font-semibold">Color Theme</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {bgPresets.map((bp) => (
                                        <button
                                            key={bp.value}
                                            onClick={() => setPreferences({ bgPreset: bp.value })}
                                            className={`p-4 rounded-2xl text-center transition-all cursor-pointer border-2 ${preferences.bgPreset === bp.value
                                                    ? "border-indigo-500 shadow-lg scale-105"
                                                    : "border-transparent"
                                                }`}
                                            style={{ backgroundColor: bp.bg, color: bp.text }}
                                        >
                                            <div className="w-8 h-8 rounded-full mx-auto mb-2 shadow-inner" style={{ backgroundColor: bp.text, opacity: 0.15 }} />
                                            <span className="text-xs font-semibold">{bp.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Reading Mode */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <BookOpen className="w-4 h-4 opacity-60" />
                                    <h3 className="font-semibold">Reading Mode</h3>
                                </div>
                                <div className="space-y-2">
                                    {readingModes.map((rm) => (
                                        <button
                                            key={rm.value}
                                            onClick={() => setPreferences({ readingMode: rm.value })}
                                            className={`w-full p-4 rounded-2xl text-left transition-all font-medium cursor-pointer ${preferences.readingMode === rm.value
                                                    ? "bg-indigo-500 text-white shadow-md"
                                                    : "hover:opacity-80"
                                                }`}
                                            style={preferences.readingMode !== rm.value ? { backgroundColor: `${preset.text}10` } : {}}
                                        >
                                            {rm.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
