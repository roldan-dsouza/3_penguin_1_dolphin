"use client";

import { useEffect, useState } from "react";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();

      // Filter only Google UK English Male & Female
      const filteredVoices = availableVoices.filter(
        (v) =>
          v.lang === "en-GB" &&
          (v.name === "Google UK English Male" ||
            v.name === "Google UK English Female"),
      );

      setVoices(filteredVoices);
      if (filteredVoices.length > 0) setSelectedVoice(filteredVoices[0]);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = () => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice || null;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.lang = selectedVoice?.lang ?? "en-GB";

    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Text-to-Speech</h1>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          className="w-full p-4 border rounded-lg mb-4 min-h-[100px]"
        />

        {/* Voice Selector */}
        <select
          value={selectedVoice?.name ?? ""}
          onChange={(e) => {
            const voice = voices.find((v) => v.name === e.target.value);
            setSelectedVoice(voice ?? null);
          }}
          className="w-full p-2 border rounded mb-4"
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>

        {/* Rate & Pitch */}
        <div className="flex justify-between mb-4 gap-4">
          <div className="flex flex-col w-1/2">
            <label className="text-sm font-medium mb-1">
              Rate: {rate.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="text-sm font-medium mb-1">
              Pitch: {pitch.toFixed(1)}
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <button
          onClick={speak}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
        >
          Speak
        </button>
      </div>
    </main>
  );
}
