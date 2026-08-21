"use client";

import { useState, useRef, useCallback } from "react";
import { drawCards, TarotCard } from "@/lib/tarot-deck";
import { TarotCardDisplay } from "@/components/TarotCard";
import { toPng } from "html-to-image";

type Step = "code" | "question" | "cards" | "reading";

const TOPICS = [
  { label: "Love & Relationships", icon: "♡" },
  { label: "Career & Work", icon: "✦" },
  { label: "Finance & Wealth", icon: "❖" },
  { label: "Health & Wellness", icon: "⚘" },
  { label: "Personal Growth", icon: "✩" },
];

export default function Home() {
  const [step, setStep] = useState<Step>("code");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [reading, setReading] = useState("");
  const [loading, setLoading] = useState(false);
  const readingRef = useRef<HTMLDivElement>(null);

  const validateCode = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/validate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Invalid code");
        return;
      }
      setStep("question");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const startReading = (topic: string) => {
    setQuestion(topic);
    const drawn = drawCards(3);
    setCards(drawn);
    setStep("cards");

    setTimeout(() => setRevealedCards([0]), 500);
    setTimeout(() => setRevealedCards([0, 1]), 1300);
    setTimeout(() => setRevealedCards([0, 1, 2]), 2100);
    setTimeout(() => generateReading(topic, drawn), 2900);
  };

  const generateReading = async (topic: string, drawnCards: TarotCard[]) => {
    setStep("reading");
    setLoading(true);
    try {
      const res = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: topic, cards: drawnCards }),
      });
      const data = await res.json();
      setReading(data.reading);

      await fetch("/api/save-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.toUpperCase().trim(),
          question: topic,
          reading: data.reading,
        }),
      });
    } catch {
      setReading(
        "The spirits are momentarily quiet... Please show this to the booth helper."
      );
    } finally {
      setLoading(false);
    }
  };

  const saveAsImage = useCallback(async () => {
    if (!readingRef.current) return;
    try {
      const dataUrl = await toPng(readingRef.current, {
        backgroundColor: "#0a0015",
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = "my-tarot-reading.png";
      link.href = dataUrl;
      link.click();
    } catch {
      alert("Could not save image. Try taking a screenshot instead!");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Stars background */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-amber-200/60 rounded-full star"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${(i * 0.7) % 3}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-amber-400/60 text-xs tracking-[0.3em] uppercase mb-1">&#10022; &#10022; &#10022;</p>
          <h1 className="text-3xl font-serif font-bold text-amber-100 mb-1 tracking-wide">
            Mystic Tarot
          </h1>
          <p className="text-amber-400/50 text-xs tracking-[0.2em] uppercase">
            PSD President&apos;s Challenge 2026
          </p>
        </div>

        {/* Step: Enter Code */}
        {step === "code" && (
          <div className="fade-in-up bg-[#12122a]/90 backdrop-blur border border-amber-900/30 rounded-xl p-8">
            <div className="text-center mb-6">
              <p className="text-amber-400/40 text-sm mb-2">&#9753;</p>
              <h2 className="text-lg font-serif text-amber-100">
                Enter Your Code
              </h2>
              <p className="text-amber-200/40 text-xs mt-1">Present your token to begin</p>
            </div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. A3F7B2"
              maxLength={6}
              className="w-full px-4 py-3 bg-[#0a0a1a] border border-amber-900/30 rounded-lg text-center text-xl tracking-[0.4em] text-amber-100 font-mono placeholder-amber-200/20 focus:outline-none focus:border-amber-600/50"
              onKeyDown={(e) => e.key === "Enter" && validateCode()}
            />
            {error && (
              <p className="text-red-400/80 text-sm text-center mt-3">{error}</p>
            )}
            <button
              onClick={validateCode}
              disabled={!code || loading}
              className="w-full mt-6 py-3 bg-gradient-to-r from-amber-700 to-amber-600 rounded-lg font-medium text-amber-50 disabled:opacity-40 transition-all hover:from-amber-600 hover:to-amber-500 border border-amber-500/30"
            >
              {loading ? "Validating..." : "Begin Reading"}
            </button>
          </div>
        )}

        {/* Step: Choose Topic */}
        {step === "question" && (
          <div className="fade-in-up bg-[#12122a]/90 backdrop-blur border border-amber-900/30 rounded-xl p-8">
            <div className="text-center mb-6">
              <p className="text-amber-400/40 text-sm mb-2">&#9753;</p>
              <h2 className="text-lg font-serif text-amber-100">
                What draws your curiosity?
              </h2>
              <p className="text-amber-200/40 text-xs mt-1">Choose a domain for your spread</p>
            </div>
            <div className="space-y-2.5">
              {TOPICS.map((topic) => (
                <button
                  key={topic.label}
                  onClick={() => startReading(topic.label)}
                  className="w-full py-3 px-4 bg-[#0a0a1a]/60 border border-amber-900/20 rounded-lg text-left hover:border-amber-600/40 hover:bg-[#1a1a2e] transition-all flex items-center gap-3 group"
                >
                  <span className="text-amber-500/60 text-lg group-hover:text-amber-400 transition-colors">{topic.icon}</span>
                  <span className="text-amber-100/80 text-sm group-hover:text-amber-100 transition-colors">{topic.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-amber-900/20">
              <p className="text-amber-200/30 text-xs text-center mb-2">
                Or ask your own question
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 px-3 py-2 bg-[#0a0a1a] border border-amber-900/20 rounded-lg text-sm text-amber-100 placeholder-amber-200/20 focus:outline-none focus:border-amber-600/40"
                />
                <button
                  onClick={() => question && startReading(question)}
                  disabled={!question}
                  className="px-4 py-2 bg-amber-700/60 border border-amber-600/30 rounded-lg text-sm font-medium text-amber-100 disabled:opacity-30 hover:bg-amber-700"
                >
                  Ask
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Card Reveal */}
        {step === "cards" && (
          <div className="fade-in-up">
            <div className="text-center mb-6">
              <h2 className="text-lg font-serif text-amber-100">
                Your Cards Reveal...
              </h2>
              <p className="text-amber-200/40 text-xs mt-1 italic">
                {question}
              </p>
            </div>
            <div className="flex justify-center gap-3">
              {cards.map((card, i) => (
                <TarotCardDisplay
                  key={i}
                  card={card}
                  revealed={revealedCards.includes(i)}
                  position={["Past", "Present", "Future"][i]}
                />
              ))}
            </div>
            {revealedCards.length === 3 && (
              <p className="text-center text-amber-300/50 text-xs mt-6 animate-pulse font-serif italic">
                Interpreting the spread...
              </p>
            )}
          </div>
        )}

        {/* Step: Reading */}
        {step === "reading" && (
          <div className="fade-in-up">
            <div ref={readingRef} className="p-5">
              <div className="text-center mb-4">
                <p className="text-amber-400/40 text-xs">&#10022; &#10022; &#10022;</p>
                <h2 className="text-lg font-serif text-amber-100 mt-1">
                  Your Reading
                </h2>
                <p className="text-amber-200/40 text-xs mt-1 italic">
                  {question}
                </p>
              </div>
              <div className="flex justify-center gap-3 mb-5">
                {cards.map((card, i) => (
                  <TarotCardDisplay
                    key={i}
                    card={card}
                    revealed={true}
                    position={["Past", "Present", "Future"][i]}
                    size="sm"
                  />
                ))}
              </div>
              {loading ? (
                <div className="text-center text-amber-300/50 animate-pulse font-serif italic py-8">
                  <p>The spirits speak...</p>
                </div>
              ) : (
                <div className="bg-[#0a0a1a]/80 border border-amber-900/20 rounded-lg p-5">
                  <p className="text-amber-100/80 leading-relaxed text-sm whitespace-pre-wrap font-serif">
                    {reading}
                  </p>
                </div>
              )}
              <p className="text-center text-amber-400/30 text-[9px] mt-4 tracking-wider uppercase">
                Mystic Tarot — PSD President&apos;s Challenge 2026
              </p>
            </div>

            {!loading && (
              <div className="flex flex-col gap-3 mt-4 px-5">
                <button
                  onClick={saveAsImage}
                  className="w-full py-3 bg-gradient-to-r from-amber-700 to-amber-600 rounded-lg font-medium text-amber-50 transition-all hover:from-amber-600 hover:to-amber-500 border border-amber-500/30"
                >
                  Save Reading as Image
                </button>
                <p className="text-center text-amber-200/30 text-xs">
                  Tap to download or take a screenshot
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
