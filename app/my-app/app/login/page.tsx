"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login, onboardingComplete } = useApp();
    const router = useRouter();

    //login api call 
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch(`http://localhost:8000/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.log(data);
                setError(data.message || "Login failed");
                return;
            }

            // 1. Save user to Context/State
            login(data.user);
            router.push("/onboarding");


        } catch (err) {
            console.log(err);
            setError("Server connection failed. Check if backend is running.");
        }
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
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-[#1E1E1E]/80 mb-2"
                            >
                                Password
                            </label>

                            <div className="relative">

                                {/* Left Icon (Mail SVG example) */}
                                <svg
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1E1E1E]/30"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M4 4h16v16H4z" stroke="none" />
                                    <path d="M4 4l8 8 8-8" />
                                </svg>

                                {/* Input */}
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError("");
                                    }}
                                    placeholder="Enter your password"
                                    className="w-full h-14 pl-12 pr-12 rounded-2xl border-2 border-[#1E1E1E]/10 bg-white/50 text-[#1E1E1E] placeholder:text-[#1E1E1E]/30 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all text-lg"
                                    autoComplete="current-password"
                                />

                                {/* Eye Toggle Button */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1E1E1E]/40 hover:text-[#1E1E1E] transition"
                                >
                                    {showPassword ? (
                                        /* Eye Off SVG */
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 3l18 18M10.584 10.587A2 2 0 0012 14a2 2 0 001.414-.586M9.88 4.24A9.953 9.953 0 0112 4c5 0 9 4 9 8a9.77 9.77 0 01-1.67 4.83M6.53 6.53A9.77 9.77 0 003 12c0 1.386.39 2.69 1.07 3.8"
                                            />
                                        </svg>
                                    ) : (
                                        /* Eye SVG */
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z"
                                            />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>

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
                            Login
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </form>
                    <p className="text-center text-[#1E1E1E]/60 mt-4">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-indigo-600 hover:underline">
                            Register
                        </Link>
                    </p>


                </div>
            </motion.div>
        </div>
    );
}
