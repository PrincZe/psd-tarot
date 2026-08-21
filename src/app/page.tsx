"use client";

import { useState, useRef, useCallback } from "react";
import { drawCards, TarotCard } from "@/lib/tarot-deck";
import { TarotCardDisplay } from "@/components/TarotCard";
import { toPng } from "html-to-image";

type Step = "code" | "details" | "question" | "cards" | "reading";

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
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
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
      setStep("details");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const proceedToTopics = () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!birthdate) {
      setError("Please enter your birthdate");
      return;
    }
    setError("");
    setStep("question");
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
        body: JSON.stringify({ question: topic, cards: drawnCards, name, birthdate }),
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

  const generateImage = useCallback(async (): Promise<string | null> => {
    if (!readingRef.current) return null;
    try {
      return await toPng(readingRef.current, {
        backgroundColor: "#0a0015",
        pixelRatio: 2,
      });
    } catch {
      return null;
    }
  }, []);

  const saveAsImage = useCallback(async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) {
      alert("Could not save image. Try taking a screenshot instead!");
      return;
    }
    const link = document.createElement("a");
    link.download = "my-tarot-reading.png";
    link.href = dataUrl;
    link.click();
  }, [generateImage]);

  const shareReading = useCallback(async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) {
      alert("Could not generate image. Try taking a screenshot instead!");
      return;
    }

    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], "my-tarot-reading.png", { type: "image/png" });

    if (navigator.share && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: "My Tarot Reading",
        text: `Check out my tarot reading from PSD President's Challenge 2026!`,
        files: [file],
      });
    } else {
      saveAsImage();
    }
  }, [generateImage, saveAsImage]);

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

      <div className="w-full max-w-lg mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-amber-400/60 text-sm tracking-[0.3em] uppercase mb-1">&#10022; &#10022; &#10022;</p>
          <h1 className="text-4xl font-serif font-bold text-amber-100 mb-1 tracking-wide">
            Mystic Tarot
          </h1>
          <p className="text-amber-400/50 text-sm tracking-[0.2em] uppercase">
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

        {/* Step: Personal Details */}
        {step === "details" && (
          <div className="fade-in-up bg-[#12122a]/90 backdrop-blur border border-amber-900/30 rounded-xl p-8">
            <div className="text-center mb-6">
              <p className="text-amber-400/40 text-sm mb-2">&#9753;</p>
              <h2 className="text-lg font-serif text-amber-100">
                Tell Us About Yourself
              </h2>
              <p className="text-amber-200/40 text-xs mt-1">For a personalised reading</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-amber-200/60 text-xs uppercase tracking-wider mb-1.5 block">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3 bg-[#0a0a1a] border border-amber-900/30 rounded-lg text-amber-100 placeholder-amber-200/20 focus:outline-none focus:border-amber-600/50"
                />
              </div>
              <div>
                <label className="text-amber-200/60 text-xs uppercase tracking-wider mb-1.5 block">Date of Birth</label>
                <input
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a0a1a] border border-amber-900/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-600/50 [color-scheme:dark]"
                />
              </div>
            </div>
            {error && (
              <p className="text-red-400/80 text-sm text-center mt-3">{error}</p>
            )}
            <button
              onClick={proceedToTopics}
              className="w-full mt-6 py-3 bg-gradient-to-r from-amber-700 to-amber-600 rounded-lg font-medium text-amber-50 transition-all hover:from-amber-600 hover:to-amber-500 border border-amber-500/30"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step: Choose Topic */}
        {step === "question" && (
          <div className="fade-in-up bg-[#12122a]/90 backdrop-blur border border-amber-900/30 rounded-xl p-8">
            <div className="text-center mb-6">
              <p className="text-amber-400/40 text-sm mb-2">&#9753;</p>
              <h2 className="text-lg font-serif text-amber-100">
                What would you like to know?
              </h2>
              <p className="text-amber-200/40 text-xs mt-1">Ask anything that&apos;s on your mind</p>
            </div>

            {/* Question input — primary */}
            <div className="mb-5">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. I've been thinking about switching careers — will it work out? I want to know if my relationship will grow stronger this year."
                rows={3}
                className="w-full px-4 py-3 bg-[#0a0a1a] border border-amber-900/30 rounded-lg text-sm text-amber-100 placeholder-amber-200/20 focus:outline-none focus:border-amber-600/50 resize-none"
              />
              <p className="text-amber-200/30 text-[11px] mt-1.5 italic">
                Tip: The more specific your question, the more personalised your reading will be
              </p>
              <button
                onClick={() => question && startReading(question)}
                disabled={!question}
                className="w-full mt-3 py-3 bg-gradient-to-r from-amber-700 to-amber-600 rounded-lg font-medium text-amber-50 disabled:opacity-30 transition-all hover:from-amber-600 hover:to-amber-500 border border-amber-500/30"
              >
                Reveal My Cards
              </button>
            </div>

            {/* Topic shortcuts — secondary */}
            <div className="pt-4 border-t border-amber-900/20">
              <p className="text-amber-200/30 text-xs text-center mb-3">
                Or pick a topic
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {TOPICS.map((topic) => (
                  <button
                    key={topic.label}
                    onClick={() => startReading(topic.label)}
                    className="px-3 py-1.5 bg-[#0a0a1a]/60 border border-amber-900/20 rounded-full text-xs text-amber-200/60 hover:border-amber-600/40 hover:text-amber-100 transition-all"
                  >
                    <span className="mr-1">{topic.icon}</span>
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step: Card Reveal */}
        {step === "cards" && (
          <div className="fade-in-up">
            <div className="text-center mb-8">
              <h2 className="text-xl font-serif text-amber-100">
                Your Cards Reveal...
              </h2>
              <p className="text-amber-200/40 text-sm mt-1 italic">
                {question}
              </p>
            </div>
            <div className="flex justify-center gap-4">
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
              <p className="text-center text-amber-300/50 text-sm mt-8 animate-pulse font-serif italic">
                Interpreting the spread...
              </p>
            )}
          </div>
        )}

        {/* Step: Reading */}
        {step === "reading" && (
          <div className="fade-in-up">
            {/* On-screen display — big and readable */}
            <div className="text-center mb-5">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="w-10 h-px bg-gradient-to-r from-transparent to-amber-500/40" />
                <span className="text-amber-400/50 text-xs">&#10022;</span>
                <span className="w-10 h-px bg-gradient-to-l from-transparent to-amber-500/40" />
              </div>
              <h2 className="text-xl font-serif text-amber-100">
                Reading for {name}
              </h2>
              <p className="text-amber-300/40 text-sm mt-1 italic">
                {question}
              </p>
            </div>

            <div className="flex justify-center gap-4 mb-6">
              {cards.map((card, i) => (
                <TarotCardDisplay
                  key={i}
                  card={card}
                  revealed={true}
                  position={["Past", "Present", "Future"][i]}
                />
              ))}
            </div>

            {loading ? (
              <div className="text-center text-amber-300/50 animate-pulse font-serif italic py-8">
                <p className="text-lg">The spirits speak...</p>
              </div>
            ) : (
              <>
                <div className="bg-[#12122a]/80 border border-amber-900/20 rounded-xl p-6">
                  <p className="text-amber-100/85 leading-relaxed text-base whitespace-pre-wrap font-serif">
                    {reading}
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 mt-6">
                  <button
                    onClick={shareReading}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-700 to-amber-600 rounded-lg font-medium text-amber-50 transition-all hover:from-amber-600 hover:to-amber-500 border border-amber-500/30 flex items-center justify-center gap-2 text-base"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share Reading
                  </button>
                  <button
                    onClick={saveAsImage}
                    className="w-full py-3.5 bg-[#12122a] border border-amber-900/30 rounded-lg font-medium text-amber-200/70 transition-all hover:border-amber-600/40 hover:text-amber-100 flex items-center justify-center gap-2 text-base"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Save as Image
                  </button>
                </div>
              </>
            )}

            {/* Hidden capture area for image export — compact layout */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <div ref={readingRef} className="w-[420px] p-5">
                <div className="border-2 border-amber-600/40 rounded-xl p-5 bg-gradient-to-b from-[#12122a] to-[#0a0a1a] relative overflow-hidden">
                  <div className="absolute top-3 left-3 text-amber-500/30 text-xs">&#10043;</div>
                  <div className="absolute top-3 right-3 text-amber-500/30 text-xs">&#10043;</div>
                  <div className="absolute bottom-3 left-3 text-amber-500/30 text-xs">&#10043;</div>
                  <div className="absolute bottom-3 right-3 text-amber-500/30 text-xs">&#10043;</div>

                  <div className="border border-amber-700/20 rounded-lg p-4">
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="w-8 h-px bg-gradient-to-r from-transparent to-amber-500/40" />
                        <span className="text-amber-400/50 text-[10px]">&#10022;</span>
                        <span className="w-8 h-px bg-gradient-to-l from-transparent to-amber-500/40" />
                      </div>
                      <h2 className="text-lg font-serif text-amber-100">
                        Reading for {name}
                      </h2>
                      <p className="text-amber-300/40 text-xs mt-0.5 italic">
                        {question}
                      </p>
                    </div>

                    <div className="flex justify-center gap-3 mb-4">
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

                    <div className="bg-[#080818]/60 border border-amber-900/15 rounded-lg p-4 mt-2">
                      <p className="text-amber-100/80 leading-relaxed text-sm whitespace-pre-wrap font-serif">
                        {reading}
                      </p>
                    </div>

                    <div className="text-center mt-4">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500/30" />
                        <span className="text-amber-400/30 text-[8px]">&#10022; &#10022; &#10022;</span>
                        <span className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500/30" />
                      </div>
                      <p className="text-amber-400/30 text-[9px] tracking-[0.15em] uppercase">
                        Mystic Tarot — PSD President&apos;s Challenge 2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
