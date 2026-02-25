"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp, presetColors, textSizeMap } from "@/context/AppContext";
import { speakText } from "@/app/api/textToSpeach/toSpeach";

interface Props {
  text: string;
}

function splitSentences(text: string): string[] {
  return text
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 0);
}

export default function LineByLineMode({ text }: Props) {
  const { preferences } = useApp();
  const preset = presetColors[preferences.bgPreset];
  const sentences = splitSentences(text);
  const [index, setIndex] = useState(0);
  const [voiceName, setVoiceName] = useState("Google UK English Male");
  const [rate, setRate] = useState(1.2);
  const [volume, setVolume] = useState(1);
  const [open, setOpen] = useState(false);
  const goNext = useCallback(() => {
    setIndex((prev) => Math.min(prev + 1, sentences.length - 1));
  }, [sentences.length]);

  const goPrev = useCallback(() => {
    setIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  if (sentences.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium opacity-60">
          {index + 1} / {sentences.length}
        </span>
        <div
          className="w-48 h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: `${preset.text}15` }}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            animate={{ width: `${((index + 1) / sentences.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Sentence Display */}
      <div className="w-full min-h-[200px] flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`text-center ${textSizeMap[preferences.textSize]} font-medium max-w-2xl select-text cursor-text`}
            style={{
              lineHeight: `${preferences.lineSpacing + 0.4}em`,
              color: preset.text,
            }}
          >
            {sentences[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={goPrev}
          disabled={index === 0}
          className="gap-2"
          aria-label="Previous sentence"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
            >
              Read Text
            </Button>
          </DialogTrigger>

          <DialogContent className="space-y-6">
            <DialogHeader>
              <DialogTitle>Speech Settings</DialogTitle>
            </DialogHeader>

            {/* Voice Selection */}
            <div>
              <p className="mb-2 text-sm font-medium">Voice Type</p>
              <Select value={voiceName} onValueChange={setVoiceName}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Google UK English Male">
                    UK Male
                  </SelectItem>
                  <SelectItem value="Google US English Female">
                    US Female
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Speed Slider */}
            <div>
              <p className="mb-2 text-sm font-medium">
                Speed: {rate.toFixed(1)}
              </p>
              <Slider
                defaultValue={[rate]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={(val) => setRate(val[0])}
              />
            </div>

            {/* Volume Slider */}
            <div>
              <p className="mb-2 text-sm font-medium">
                Volume: {volume.toFixed(1)}
              </p>
              <Slider
                defaultValue={[volume]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={(val) => setVolume(val[0])}
              />
            </div>

            {/* Play Button */}
            <Button
              className="w-full"
              onClick={async () => {
                await speakText(sentences[index], {
                  voiceName,
                  rate,
                  pitch: 1.6,
                });
                setOpen(false);
              }}
            >
              Play
            </Button>
          </DialogContent>
        </Dialog>

        <Button
          variant="accent"
          size="lg"
          onClick={goNext}
          disabled={index === sentences.length - 1}
          className="gap-2"
          aria-label="Next sentence"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-5 h-5" />
        </Button>


      </div>
    </div>
  );
}
