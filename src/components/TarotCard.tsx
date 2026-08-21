"use client";

import { TarotCard as TarotCardType } from "@/lib/tarot-deck";

interface Props {
  card: TarotCardType;
  revealed: boolean;
  position: string;
  size?: "sm" | "md";
}

export function TarotCardDisplay({ card, revealed, position, size = "md" }: Props) {
  const isMd = size === "md";
  const cardW = isMd ? "w-28" : "w-20";
  const cardH = isMd ? "h-44" : "h-32";
  const numeral = card.arcana === "major" ? toRoman(card.number) : card.number.toString();

  return (
    <div className="flex flex-col items-center gap-2">
      <p className={`${isMd ? "text-xs" : "text-[10px]"} text-amber-200/80 uppercase tracking-wider font-medium`}>
        {position}
      </p>
      <div
        className={`${cardW} ${cardH} rounded-lg relative overflow-hidden transition-all duration-700 ${
          revealed
            ? "card-glow"
            : ""
        }`}
      >
        {revealed ? (
          // Revealed card face — tarot style
          <div className="w-full h-full bg-[#1a1a2e] border-2 border-amber-400/70 rounded-lg flex flex-col items-center justify-between p-2 relative">
            {/* Corner ornaments */}
            <div className="absolute top-1 left-1.5 text-amber-400/60 text-[8px] font-serif">{numeral}</div>
            <div className="absolute top-1 right-1.5 text-amber-400/60 text-[8px] font-serif">{numeral}</div>

            {/* Top border decoration */}
            <div className="w-full flex justify-center">
              <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
            </div>

            {/* Card symbol */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                {/* Ornate circle frame */}
                <div className="w-14 h-14 rounded-full border border-amber-400/40 flex items-center justify-center relative">
                  <div className="absolute inset-1 rounded-full border border-amber-400/20" />
                  <span className={`${isMd ? "text-2xl" : "text-xl"}`}>{card.emoji}</span>
                </div>
                {/* Radiating lines */}
                {isMd && (
                  <>
                    <div className="absolute -top-2 left-1/2 w-px h-2 bg-amber-400/30 -translate-x-1/2" />
                    <div className="absolute -bottom-2 left-1/2 w-px h-2 bg-amber-400/30 -translate-x-1/2" />
                    <div className="absolute top-1/2 -left-2 w-2 h-px bg-amber-400/30 -translate-y-1/2" />
                    <div className="absolute top-1/2 -right-2 w-2 h-px bg-amber-400/30 -translate-y-1/2" />
                  </>
                )}
              </div>
            </div>

            {/* Card name */}
            <div className="w-full text-center">
              <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto mb-1" />
              <p className={`${isMd ? "text-[9px]" : "text-[7px]"} text-amber-200/90 font-serif leading-tight tracking-wide uppercase`}>
                {card.name}
              </p>
            </div>

            {/* Bottom border decoration */}
            <div className="absolute bottom-1 left-1.5 text-amber-400/60 text-[8px] font-serif rotate-180">{numeral}</div>
            <div className="absolute bottom-1 right-1.5 text-amber-400/60 text-[8px] font-serif rotate-180">{numeral}</div>
          </div>
        ) : (
          // Card back — classic tarot back pattern
          <div className="w-full h-full bg-[#1a1a2e] border-2 border-amber-900/60 rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* Diamond pattern background */}
            <div className="absolute inset-2 border border-amber-700/30 rounded" />
            <div className="absolute inset-3 border border-amber-700/20 rounded" />
            {/* Center cross pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-amber-800/20" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-px h-full bg-amber-800/20" />
            </div>
            {/* Center star */}
            <div className="w-8 h-8 rounded-full border border-amber-700/40 flex items-center justify-center bg-[#12122a]">
              <span className="text-amber-600/60 text-lg">&#10022;</span>
            </div>
          </div>
        )}
      </div>
      {revealed && (
        <p className={`${isMd ? "text-[10px]" : "text-[8px]"} text-amber-200/70 text-center max-w-20 leading-tight font-serif`}>
          {card.name}
        </p>
      )}
    </div>
  );
}

function toRoman(num: number): string {
  if (num === 0) return "0";
  const lookup: [number, string][] = [
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let result = "";
  let remaining = num;
  for (const [value, symbol] of lookup) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}
