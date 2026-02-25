"use client";

import { motion } from "framer-motion";
import { BookOpen, Sparkles, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: BookOpen,
    title: "Simplified Reading",
    desc: "Complex words are swapped for simpler ones automatically.",
  },
  {
    icon: Eye,
    title: "Visual Comfort",
    desc: "Choose from soothing color presets designed for your eyes.",
  },
  {
    icon: Sparkles,
    title: "Word Helper",
    desc: "Double-click any word to see its meaning and pronunciation.",
  },
];

export default function LandingPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #FDF5E6 0%, #E3F2FD 50%, #E8F5E9 100%)",
      }}
    >
      {/* Nav */}
      <nav className="w-full flex items-center justify-between px-6 md:px-12 py-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-[#1E1E1E]">ReadEasy</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-[#1E1E1E]">
              Log In
            </Button>
          </Link>
        </motion.div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Designed for Dyslexic Readers
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#1E1E1E] leading-tight mb-6"
        >
          Reading Made{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            Easy
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-xl text-[#1E1E1E]/70 max-w-2xl mb-10 leading-relaxed"
        >
          Upload any text and we&apos;ll make it easier to read. Get word
          meanings, hear pronunciations, and customize everything to fit your
          comfort.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/login">
            <Button variant="accent" size="xl" className="group">
              Get Started
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        {/* Floating decoration */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="mt-16 mb-8"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 shadow-2xl flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
        </motion.div>
      </main>

      {/* Features */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
              className="rounded-2xl bg-white/60 backdrop-blur-sm border border-white/40 p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-2">
                {f.title}
              </h3>
              <p className="text-black/60 text-base leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
