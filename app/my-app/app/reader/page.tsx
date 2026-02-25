"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Settings, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp, presetColors, textSizeMap } from "@/context/AppContext";
import { simplifyText } from "@/lib/simplify";
import ParagraphMode from "@/components/ParagraphMode";
import LineByLineMode from "@/components/LineByLineMode";
import WordAssistant from "@/components/WordAssistant";
import SettingsModal from "@/components/SettingsModal";
import { useRouter, useSearchParams } from "next/navigation";

function ReaderContent() {
  const { notes, preferences } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [simplifiedText, setSimplifiedText] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [isSimplified, setIsSimplified] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const preset = presetColors[preferences.bgPreset];

  useEffect(() => {
    if (!id) return;
    const note = notes.find((n) => n.id === id);
    if (note) {
      setOriginalText(note.content);
      setSimplifiedText(simplifyText(note.content));
      setNoteTitle(note.title);
    }
    console.log("Loaded note:", note);
  }, [id, notes]);

  const displayText = isSimplified ? simplifiedText : originalText;

  if (!id || !originalText) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: preset.bg, color: preset.text }}
      >
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p className="text-xl font-semibold opacity-40">No text to display</p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen transition-colors duration-400"
      style={{ backgroundColor: preset.bg, color: preset.text }}
    >
      {/* Navbar */}
      <nav
        className="sticky top-0 z-40 backdrop-blur-md border-b"
        style={{
          borderColor: `${preset.text}15`,
          backgroundColor: `${preset.bg}dd`,
        }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard")}
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="font-bold truncate">{noteTitle}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={isSimplified ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setIsSimplified(!isSimplified)}
              className="gap-1.5 hidden sm:flex"
            >
              <Sparkles className="w-4 h-4" />
              {isSimplified ? "Simplified" : "Original"}
            </Button>
            <Button
              variant={isSimplified ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setIsSimplified(!isSimplified)}
              className="sm:hidden"
              aria-label="Toggle simplification"
            >
              <Sparkles className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSettingsOpen(true)}
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Reader Mode Info */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-6 py-3"
      >
        <div className="flex items-center gap-2 text-sm opacity-50">
          <BookOpen className="w-4 h-4" />
          <span>
            {preferences.readingMode === "paragraph"
              ? "Paragraph Mode — hover a line to highlight it"
              : "Line-by-Line Mode — use arrow keys or buttons to navigate"}
          </span>
          <span className="mx-2">•</span>
          <span>Double-click any word for help</span>
        </div>
      </motion.div>

      {/* Content */}
      <div ref={contentRef} className="max-w-4xl mx-auto px-6 py-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`rounded-2xl p-6 md:p-10 ${textSizeMap[preferences.textSize]}`}
            style={{ backgroundColor: `${preset.text}05` }}
          >
            {preferences.readingMode === "paragraph" ? (
              <ParagraphMode text={displayText} />
            ) : (
              <LineByLineMode text={displayText} />
            )}
          </div>
        </motion.div>
      </div>

      <WordAssistant containerRef={contentRef} />
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}

export default function ReaderPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "#FDF5E6" }}
        >
          <div
            className="animate-pulse text-2xl font-semibold"
            style={{ color: "#1E1E1E" }}
          >
            Loading...
          </div>
        </div>
      }
    >
      <ReaderContent />
    </Suspense>
  );
}
