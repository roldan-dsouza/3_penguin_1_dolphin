"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type BgPreset = "calm-cream" | "cool-sky" | "muted-moss" | "high-contrast-dark";
export type ReadingMode = "paragraph" | "line-by-line";
export type TextSize = "sm" | "md" | "lg" | "xl";

export interface Preferences {
    textSize: TextSize;
    bgPreset: BgPreset;
    readingMode: ReadingMode;
    lineSpacing: number;
}

export interface NoteItem {
    id: string;
    title: string;
    content: string;
    createdAt: string;
}

interface AppState {
    user: { email: string } | null;
    preferences: Preferences;
    notes: NoteItem[];
    login: (email: string) => void;
    logout: () => void;
    setPreferences: (p: Partial<Preferences>) => void;
    addNote: (title: string, content: string) => string;
    deleteNote: (id: string) => void;
    onboardingComplete: boolean;
    setOnboardingComplete: (v: boolean) => void;
}

const defaultPreferences: Preferences = {
    textSize: "md",
    bgPreset: "calm-cream",
    readingMode: "paragraph",
    lineSpacing: 1.8,
};

const AppContext = createContext<AppState | undefined>(undefined);

export const presetColors: Record<BgPreset, { bg: string; text: string; name: string }> = {
    "calm-cream": { bg: "#FDF5E6", text: "#1E1E1E", name: "Calm Cream" },
    "cool-sky": { bg: "#E3F2FD", text: "#0D47A1", name: "Cool Sky" },
    "muted-moss": { bg: "#E8F5E9", text: "#1B5E20", name: "Muted Moss" },
    "high-contrast-dark": { bg: "#121212", text: "#E0E0E0", name: "High Contrast Dark" },
};

export const textSizeMap: Record<TextSize, string> = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
};

export const textSizePx: Record<TextSize, number> = {
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24,
};

function loadFromStorage<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch {
        return fallback;
    }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<{ email: string } | null>(null);
    const [preferences, setPrefsState] = useState<Preferences>(defaultPreferences);
    const [notes, setNotes] = useState<NoteItem[]>([]);
    const [onboardingComplete, setOnboardingCompleteState] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setUser(loadFromStorage("dyslexia_user", null));
        setPrefsState(loadFromStorage("dyslexia_prefs", defaultPreferences));
        setNotes(loadFromStorage("dyslexia_notes", []));
        setOnboardingCompleteState(loadFromStorage("dyslexia_onboarded", false));
        setHydrated(true);
    }, []);

    const login = useCallback((email: string) => {
        const u = { email };
        setUser(u);
        localStorage.setItem("dyslexia_user", JSON.stringify(u));
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem("dyslexia_user");
    }, []);

    const setPreferences = useCallback((p: Partial<Preferences>) => {
        setPrefsState((prev) => {
            const next = { ...prev, ...p };
            localStorage.setItem("dyslexia_prefs", JSON.stringify(next));
            return next;
        });
    }, []);

    const addNote = useCallback((title: string, content: string) => {
        const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
        const note: NoteItem = { id, title, content, createdAt: new Date().toISOString() };
        setNotes((prev) => {
            const next = [note, ...prev];
            localStorage.setItem("dyslexia_notes", JSON.stringify(next));
            return next;
        });
        return id;
    }, []);

    const deleteNote = useCallback((id: string) => {
        setNotes((prev) => {
            const next = prev.filter((n) => n.id !== id);
            localStorage.setItem("dyslexia_notes", JSON.stringify(next));
            return next;
        });
    }, []);

    const setOnboardingComplete = useCallback((v: boolean) => {
        setOnboardingCompleteState(v);
        localStorage.setItem("dyslexia_onboarded", JSON.stringify(v));
    }, []);

    if (!hydrated) {
        return (
            <div className="flex min-h-screen items-center justify-center" style={{ background: "#FDF5E6" }}>
                <div className="animate-pulse text-2xl font-semibold" style={{ color: "#1E1E1E" }}>
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <AppContext.Provider
            value={{
                user,
                preferences,
                notes,
                login,
                logout,
                setPreferences,
                addNote,
                deleteNote,
                onboardingComplete,
                setOnboardingComplete,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useApp must be inside AppProvider");
    return ctx;
}
