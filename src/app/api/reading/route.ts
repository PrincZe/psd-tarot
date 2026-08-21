import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic();

function getZodiacSign(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  return "Pisces";
}

export async function POST(req: NextRequest) {
  const { question, cards, name, birthdate } = await req.json();

  const zodiac = birthdate ? getZodiacSign(birthdate) : null;

  const cardDescriptions = cards
    .map(
      (card: { name: string }, i: number) =>
        `Position ${i + 1} (${["Past", "Present", "Future"][i]}): ${card.name}`
    )
    .join("\n");

  const personalContext = [
    name ? `The querent's name is ${name}.` : "",
    zodiac ? `Their zodiac sign is ${zodiac} (born ${birthdate}).` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 600,
    messages: [
      {
        role: "user",
        content: `You are a mystical tarot reader. Give a personalised reading for this 3-card spread.

${personalContext}
They ask about: "${question}"

Cards drawn:
${cardDescriptions}

Give an insightful, encouraging reading that:
1. Address them by name
2. Weave in their zodiac energy where relevant (don't force it — a subtle touch)
3. Briefly interprets each card in its position (Past/Present/Future)
4. Ties all three together into a cohesive narrative related to their question
5. Ends with an uplifting personalised message or advice

Keep it concise (under 200 words). Be mystical but warm. Do not use headers or bullet points — write in flowing paragraphs.`,
      },
    ],
  });

  const reading =
    message.content[0].type === "text" ? message.content[0].text : "";

  return NextResponse.json({ reading });
}
