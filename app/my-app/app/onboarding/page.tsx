"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Type, Palette, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp, type BgPreset, type ReadingMode, type TextSize, presetColors } from "@/context/AppContext";
import { useRouter } from "next/navigation";

const textSizes: { value: TextSize; label: string; preview: string }[] = [
    { value: "sm", label: "Small", preview: "text-base" },
    { value: "md", label: "Medium", preview: "text-lg" },
    { value: "lg", label: "Large", preview: "text-xl" },
    { value: "xl", label: "Extra Large", preview: "text-2xl" },
];

const bgPresets: { value: BgPreset; bg: string; text: string; name: string }[] = [
    { value: "calm-cream", ...presetColors["calm-cream"] },
    { value: "cool-sky", ...presetColors["cool-sky"] },
    { value: "muted-moss", ...presetColors["muted-moss"] },
    { value: "high-contrast-dark", ...presetColors["high-contrast-dark"] },
];

const readingModes: { value: ReadingMode; label: string; desc: string; icon: React.ReactNode }[] = [
    { value: "paragraph", label: "Paragraph Mode", desc: "See all text with a helpful reading ruler", icon: <BookOpen className="w-6 h-6" /> },
    { value: "line-by-line", label: "Line by Line", desc: "One sentence at a time, easy to focus", icon: <Type className="w-6 h-6" /> },
];

const steps = [
    { title: "Choose Your Text Size", subtitle: "Pick what feels most comfortable to read", icon: Type },
    { title: "Pick a Color Theme", subtitle: "Choose a background that's easy on your eyes", icon: Palette },
    { title: "Select Reading Mode", subtitle: "How would you like to read your text?", icon: BookOpen },
];

export default function OnboardingPage() {
    const [step, setStep] = useState(0);
    const { preferences, setPreferences, setOnboardingComplete } = useApp();
    const router = useRouter();

    const handleFinish = () => {
        setOnboardingComplete(true);
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12" style={{ background: "linear-gradient(135deg, #FDF5E6 0%, #E3F2FD 50%, #E8F5E9 100%)" }}>
            {/* Progress */}
            <div className="flex items-center gap-3 mb-10">
                {steps.map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <motion.div
                            animate={{
                                scale: i === step ? 1.2 : 1,
                                backgroundColor: i <= step ? "#6366f1" : "#d1d5db",
                            }}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                        >
                            {i < step ? <Check className="w-5 h-5" /> : i + 1}
                        </motion.div>
                        {i < steps.length - 1 && (
                            <div className={`w-12 h-1 rounded-full transition-colors duration-300 ${i < step ? "bg-indigo-500" : "bg-gray-300"}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full max-w-lg"
                >
                    <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-white/50 shadow-xl p-8 md:p-10">
                        <div className="text-center mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                                {(() => {
                                    const Icon = steps[step].icon;
                                    return <Icon className="w-7 h-7 text-white" />;
                                })()}
                            </div>
                            <h2 className="text-2xl font-bold text-[#1E1E1E] mb-1">{steps[step].title}</h2>
                            <p className="text-[#1E1E1E]/60">{steps[step].subtitle}</p>
                        </div>

                        {/* Step 1: Text Size */}
                        {step === 0 && (
                            <div className="space-y-3">
                                {textSizes.map((ts) => (
                                    <button
                                        key={ts.value}
                                        onClick={() => setPreferences({ textSize: ts.value })}
                                        className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${preferences.textSize === ts.value
                                                ? "border-indigo-500 bg-indigo-50 shadow-md"
                                                : "border-[#1E1E1E]/10 bg-white/50 hover:border-indigo-200"
                                            }`}
                                    >
                                        <span className={`font-medium text-[#1E1E1E] ${ts.preview}`}>{ts.label}</span>
                                        <span className={`block mt-1 text-[#1E1E1E]/50 ${ts.preview}`}>
                                            The quick brown fox jumps
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Step 2: Background Preset */}
                        {step === 1 && (
                            <div className="grid grid-cols-2 gap-4">
                                {bgPresets.map((bp) => (
                                    <button
                                        key={bp.value}
                                        onClick={() => setPreferences({ bgPreset: bp.value })}
                                        className={`p-5 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer ${preferences.bgPreset === bp.value
                                                ? "border-indigo-500 shadow-lg scale-105"
                                                : "border-transparent hover:scale-102"
                                            }`}
                                        style={{ backgroundColor: bp.bg, color: bp.text }}
                                    >
                                        <div className="w-10 h-10 rounded-full mx-auto mb-3 shadow-inner" style={{ backgroundColor: bp.text, opacity: 0.2 }} />
                                        <span className="font-semibold text-sm">{bp.name}</span>
                                        <span className="block text-xs mt-1 opacity-70">Sample text</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Step 3: Reading Mode */}
                        {step === 2 && (
                            <div className="space-y-4">
                                {readingModes.map((rm) => (
                                    <button
                                        key={rm.value}
                                        onClick={() => setPreferences({ readingMode: rm.value })}
                                        className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-4 cursor-pointer ${preferences.readingMode === rm.value
                                                ? "border-indigo-500 bg-indigo-50 shadow-md"
                                                : "border-[#1E1E1E]/10 bg-white/50 hover:border-indigo-200"
                                            }`}
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                                            {rm.icon}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-[#1E1E1E] text-lg">{rm.label}</span>
                                            <span className="block text-sm text-[#1E1E1E]/60 mt-0.5">{rm.desc}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-8">
                {step > 0 && (
                    <Button variant="outline" size="lg" onClick={() => setStep(step - 1)}>
                        <ArrowLeft className="w-5 h-5 mr-1" />
                        Back
                    </Button>
                )}
                {step < 2 ? (
                    <Button variant="accent" size="lg" onClick={() => setStep(step + 1)}>
                        Next
                        <ArrowRight className="w-5 h-5 ml-1" />
                    </Button>
                ) : (
                    <Button variant="accent" size="lg" onClick={handleFinish}>
                        <Check className="w-5 h-5 mr-1" />
                        Finish Setup
                    </Button>
                )}
            </div>
        </div>
    );
}
