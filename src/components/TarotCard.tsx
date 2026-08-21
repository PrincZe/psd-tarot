"use client";

import { TarotCard as TarotCardType } from "@/lib/tarot-deck";
import Image from "next/image";

interface Props {
  card: TarotCardType;
  revealed: boolean;
  position: string;
  size?: "sm" | "md";
}

export function TarotCardDisplay({ card, revealed, position, size = "md" }: Props) {
  const isMd = size === "md";
  const cardW = isMd ? "w-[120px]" : "w-[90px]";
  const cardH = isMd ? "h-[192px]" : "h-[144px]";

  return (
    <div className="flex flex-col items-center gap-2">
      <p className={`${isMd ? "text-sm" : "text-xs"} text-amber-200/80 uppercase tracking-wider font-medium`}>
        {position}
      </p>
      <div
        className={`${cardW} ${cardH} rounded-lg relative overflow-hidden transition-all duration-700 ${
          revealed ? "card-glow shadow-lg shadow-amber-900/30" : ""
        }`}
      >
        {revealed ? (
          <div className="w-full h-full border-2 border-amber-500/50 rounded-lg overflow-hidden relative">
            <Image
              src={`/cards/${card.image}`}
              alt={card.name}
              fill
              className="object-cover"
              sizes={isMd ? "120px" : "90px"}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-[#1a1a2e] border-2 border-amber-900/60 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-2 border border-amber-700/30 rounded" />
            <div className="absolute inset-3 border border-amber-700/20 rounded" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-amber-800/20" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-px h-full bg-amber-800/20" />
            </div>
            <div className="w-8 h-8 rounded-full border border-amber-700/40 flex items-center justify-center bg-[#12122a]">
              <span className="text-amber-600/60 text-lg">&#10022;</span>
            </div>
          </div>
        )}
      </div>
      {revealed && (
        <p className={`${isMd ? "text-xs" : "text-[10px]"} text-amber-200/70 text-center max-w-[120px] leading-tight font-serif`}>
          {card.name}
        </p>
      )}
    </div>
  );
}
