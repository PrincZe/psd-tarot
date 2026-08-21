import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mystic Tarot — PSD President's Challenge",
  description: "Get your personalised 3-card tarot reading",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0015] min-h-screen text-white antialiased">
        {children}
      </body>
    </html>
  );
}
