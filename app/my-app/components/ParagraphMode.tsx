"use client";

import { useApp, presetColors, textSizeMap } from "@/context/AppContext";

interface Props {
    text: string;
}

export default function ParagraphMode({ text }: Props) {
    const { preferences } = useApp();
    const preset = presetColors[preferences.bgPreset];
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim());

    return (
        <div className="space-y-6">
            {paragraphs.map((para, i) => (
                <p
                    key={i}
                    className={`reading-ruler-line ${textSizeMap[preferences.textSize]} leading-relaxed select-text cursor-text`}
                    style={{
                        lineHeight: `${preferences.lineSpacing}em`,
                        color: preset.text,
                    }}
                >
                    {para}
                </p>
            ))}
        </div>
    );
}
