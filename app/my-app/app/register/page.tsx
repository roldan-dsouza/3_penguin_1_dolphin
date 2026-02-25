"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, BookOpen, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {

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
                <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-white/50 shadow-xl p-3 md:p-6">
                    {/* Logo */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                            <BookOpen className="w-7 h-7 text-white" />
                        </div>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold text-[#1E1E1E] text-center mb-2">
                        Create an account
                    </h1>
                    <p className="text-[#1E1E1E]/60 text-center mb-8">
                        Sign up to start your personalized reading experience
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[#1E1E1E]/80 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1E1E1E]/30" />
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-[#1E1E1E]/10 bg-white/50 text-[#1E1E1E] placeholder:text-[#1E1E1E]/30 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all text-lg"
                                    autoComplete="name"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Email Field */}
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
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-[#1E1E1E]/10 bg-white/50 text-[#1E1E1E] placeholder:text-[#1E1E1E]/30 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all text-lg"
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#1E1E1E]/80 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1E1E1E]/30" />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-[#1E1E1E]/10 bg-white/50 text-[#1E1E1E] placeholder:text-[#1E1E1E]/30 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all text-lg"
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>



                        {/* Error Message */}
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 text-sm mt-2"
                            >
                                {error}
                            </motion.p>
                        )}

                        <Button type="submit" variant="accent" size="lg" className="w-full group">
                            Register
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </form>

                    <p className="text-center text-[#1E1E1E]/60 mt-4">
                        Already have an account?{" "}
                        <Link href="/login" className="text-indigo-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}