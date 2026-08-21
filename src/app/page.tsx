"use client";

import { useState, useRef, useCallback } from "react";
import { drawCards, TarotCard } from "@/lib/tarot-deck";
import { toPng } from "html-to-image";

type Step = "code" | "question" | "cards" | "reading";

const TOPICS = [
  { label: "Love & Relationships", emoji: "💕" },
  { label: "Career & Work", emoji: "💼" },
  { label: "Finance & Wealth", emoji: "💰" },
  { label: "Health & Wellness", emoji: "🌿" },
  { label: "Personal Growth", emoji: "🌟" },
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

    // Reveal cards one by one
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

      // Save to DB
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
            className="absolute w-1 h-1 bg-white rounded-full star"
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
          <h1 className="text-3xl font-bold text-gold mb-2">Mystic Tarot</h1>
          <p className="text-purple-300 text-sm">
            PSD President&apos;s Challenge 2026
          </p>
        </div>

        {/* Step: Enter Code */}
        {step === "code" && (
          <div className="fade-in-up bg-purple-deep/80 backdrop-blur border border-purple-mid rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-center mb-6 text-gold-light">
              Enter Your Code
            </h2>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="TAROT-XXXXXX"
              className="w-full px-4 py-3 bg-purple-dark/60 border border-purple-mid rounded-xl text-center text-lg tracking-widest text-white placeholder-purple-300/50 focus:outline-none focus:border-gold/50"
              onKeyDown={(e) => e.key === "Enter" && validateCode()}
            />
            {error && (
              <p className="text-red-400 text-sm text-center mt-3">{error}</p>
            )}
            <button
              onClick={validateCode}
              disabled={!code || loading}
              className="w-full mt-6 py-3 bg-gradient-to-r from-gold/80 to-gold rounded-xl font-semibold text-purple-deep disabled:opacity-50 transition-all hover:shadow-lg hover:shadow-gold/20"
            >
              {loading ? "Validating..." : "Unlock Your Reading"}
            </button>
          </div>
        )}

        {/* Step: Choose Topic */}
        {step === "question" && (
          <div className="fade-in-up bg-purple-deep/80 backdrop-blur border border-purple-mid rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-center mb-2 text-gold-light">
              What draws your curiosity?
            </h2>
            <p className="text-purple-300 text-sm text-center mb-6">
              Choose a topic for your reading
            </p>
            <div className="space-y-3">
              {TOPICS.map((topic) => (
                <button
                  key={topic.label}
                  onClick={() => startReading(topic.label)}
                  className="w-full py-3 px-4 bg-purple-dark/60 border border-purple-mid rounded-xl text-left hover:border-gold/50 hover:bg-purple-dark transition-all flex items-center gap-3"
                >
                  <span className="text-2xl">{topic.emoji}</span>
                  <span className="text-white">{topic.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-purple-mid">
              <p className="text-purple-300 text-xs text-center mb-2">
                Or ask your own question:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 px-3 py-2 bg-purple-dark/60 border border-purple-mid rounded-lg text-sm text-white placeholder-purple-300/50 focus:outline-none focus:border-gold/50"
                />
                <button
                  onClick={() => question && startReading(question)}
                  disabled={!question}
                  className="px-4 py-2 bg-gold/80 rounded-lg text-sm font-semibold text-purple-deep disabled:opacity-50"
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
            <h2 className="text-xl font-semibold text-center mb-2 text-gold-light">
              Your Cards Reveal...
            </h2>
            <p className="text-purple-300 text-sm text-center mb-8">
              {question}
            </p>
            <div className="flex justify-center gap-4">
              {cards.map((card, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <p className="text-xs text-purple-300">
                    {["Past", "Present", "Future"][i]}
                  </p>
                  <div
                    className={`w-24 h-36 rounded-xl flex items-center justify-center text-4xl transition-all duration-700 ${
                      revealedCards.includes(i)
                        ? "bg-gradient-to-b from-purple-dark to-purple-deep border-2 border-gold/60 card-glow"
                        : "bg-gradient-to-b from-purple-mid to-purple-dark border border-purple-mid"
                    }`}
                  >
                    {revealedCards.includes(i) ? (
                      <span>{card.emoji}</span>
                    ) : (
                      <span className="text-2xl text-purple-300/50">?</span>
                    )}
                  </div>
                  {revealedCards.includes(i) && (
                    <p className="text-xs text-gold-light text-center max-w-24 leading-tight">
                      {card.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {revealedCards.length === 3 && (
              <p className="text-center text-purple-300 text-sm mt-6 animate-pulse">
                Reading the cards...
              </p>
            )}
          </div>
        )}

        {/* Step: Reading */}
        {step === "reading" && (
          <div className="fade-in-up">
            <div ref={readingRef} className="p-6">
              <h2 className="text-xl font-semibold text-center mb-2 text-gold-light">
                Your Reading
              </h2>
              <p className="text-purple-300 text-xs text-center mb-6">
                {question}
              </p>
              <div className="flex justify-center gap-4 mb-6">
                {cards.map((card, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <p className="text-[10px] text-purple-300">
                      {["Past", "Present", "Future"][i]}
                    </p>
                    <div className="w-16 h-24 rounded-lg bg-gradient-to-b from-purple-dark to-purple-deep border border-gold/40 flex items-center justify-center text-2xl">
                      {card.emoji}
                    </div>
                    <p className="text-[10px] text-gold-light text-center max-w-16 leading-tight">
                      {card.name}
                    </p>
                  </div>
                ))}
              </div>
              {loading ? (
                <div className="text-center text-purple-300 animate-pulse">
                  <p>The spirits speak...</p>
                </div>
              ) : (
                <div className="bg-purple-deep/60 border border-purple-mid rounded-xl p-5">
                  <p className="text-purple-100 leading-relaxed text-sm whitespace-pre-wrap">
                    {reading}
                  </p>
                </div>
              )}
              <p className="text-center text-purple-300/50 text-[10px] mt-4">
                Mystic Tarot — PSD President&apos;s Challenge 2026
              </p>
            </div>

            {!loading && (
              <div className="flex flex-col gap-3 mt-4 px-6">
                <button
                  onClick={saveAsImage}
                  className="w-full py-3 bg-gradient-to-r from-gold/80 to-gold rounded-xl font-semibold text-purple-deep transition-all hover:shadow-lg hover:shadow-gold/20"
                >
                  Save Reading as Image
                </button>
                <p className="text-center text-purple-300/60 text-xs">
                  Long-press or tap the button to save to your phone
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
