import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "ReadEasy — Reading Made Accessible",
  description: "A dyslexia-friendly reading assistant that makes learning easier with visual comfort, word assistance, and simplified text.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ fontFamily: "'Lexend', sans-serif" }}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
