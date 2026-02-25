"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Upload,
  FileText,
  Clock,
  Trash2,
  BookOpen,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp, presetColors } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import SettingsModal from "@/components/SettingsModal";

export default function DashboardPage() {
  const { user, preferences, notes, addNote, deleteNote, logout } = useApp();
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const preset = presetColors[preferences.bgPreset];

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.endsWith(".txt")) {
        alert("Please upload a .txt file");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const id = addNote(file.name.replace(".txt", ""), content);
        router.push(`/reader?id=${id}`);
      };
      reader.readAsText(file);
    },
    [addNote, router],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleLogout = () => {
    logout();
    router.push("/");
  };

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
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">ReadEasy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm opacity-60 hidden sm:block"></span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSettingsOpen(true)}
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Log out"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Upload Area */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Your Dashboard
          </h1>
          <p className="opacity-60 mb-8">Upload a text file to start reading</p>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`rounded-2xl border-2 border-dashed p-12 md:p-16 text-center cursor-pointer transition-all duration-300 ${dragOver
                ? "border-indigo-500 bg-indigo-500/10 scale-[1.01]"
                : "border-current/20 hover:border-current/40 hover:bg-current/5"
              }`}
          >
            <motion.div
              animate={dragOver ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-5 shadow-lg"
            >
              <Upload className="w-8 h-8 text-white" />
            </motion.div>
            <p className="text-lg font-semibold mb-1">
              {dragOver
                ? "Drop your file here!"
                : "Drag & drop a .txt file here"}
            </p>
            <p className="text-sm opacity-50">or click to browse your files</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
              className="hidden"
            />
          </div>
        </motion.section>

        {/* History */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-5 h-5 opacity-60" />
            <h2 className="text-2xl font-bold">Your Notes</h2>
          </div>

          {notes.length === 0 ? (
            <Card
              className="border-none"
              style={{ backgroundColor: `${preset.text}08` }}
            >
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium opacity-40">No notes yet</p>
                <p className="text-sm opacity-30 mt-1">
                  Upload a .txt file to get started
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {notes.map((note, i) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card
                      className="cursor-pointer group border-none hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      style={{ backgroundColor: `${preset.text}08` }}
                      onClick={() => router.push(`/reader?id=${note.id}`)}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="w-4 h-4 shrink-0 opacity-50" />
                              <h3 className="font-semibold truncate">
                                {note.title}
                              </h3>
                            </div>
                            <p className="text-sm opacity-50 line-clamp-2 leading-relaxed">
                              {note.content.slice(0, 120)}...
                            </p>
                            <p className="text-xs opacity-30 mt-3">
                              {new Date(note.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNote(note.id);
                            }}
                            className="opacity-0 group-hover:opacity-60 hover:!opacity-100 p-2 rounded-xl hover:bg-red-100 transition-all cursor-pointer"
                            aria-label={`Delete ${note.title}`}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.section>
      </main>

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
