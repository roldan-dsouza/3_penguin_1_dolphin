"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const { login, onboardingComplete } = useApp();
    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }
        login(email.trim());
        router.push(onboardingComplete ? "/dashboard" : "/onboarding");
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-6"
            style={{ background: "linear-gradient(135deg, #FDF5E6 0%, #E3F2FD 100%)" }}
        >
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-white/50 shadow-xl p-8 md:p-10">
                    {/* Logo */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                            <BookOpen className="w-7 h-7 text-white" />
                        </div>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold text-[#1E1E1E] text-center mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-[#1E1E1E]/60 text-center mb-8">
                        Enter your email to get started
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#1E1E1E]/80 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1E1E1E]/30" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError("");
                                    }}
                                    placeholder="you@example.com"
                                    className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-[#1E1E1E]/10 bg-white/50 text-[#1E1E1E] placeholder:text-[#1E1E1E]/30 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all text-lg"
                                    autoComplete="email"
                                    autoFocus
                                />
                            </div>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm mt-2"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </div>

                        <Button type="submit" variant="accent" size="lg" className="w-full group">
                            Continue
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </form>

                    <p className="text-xs text-[#1E1E1E]/40 text-center mt-6">
                        No password needed — we keep it simple.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
