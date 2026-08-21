import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic();

export async function POST(req: NextRequest) {
  const { question, cards } = await req.json();

  const cardDescriptions = cards
    .map(
      (card: { name: string }, i: number) =>
        `Position ${i + 1} (${["Past", "Present", "Future"][i]}): ${card.name}`
    )
    .join("\n");

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 600,
    messages: [
      {
        role: "user",
        content: `You are a mystical tarot reader. Give a reading for this 3-card spread.

The querent asks: "${question}"

Cards drawn:
${cardDescriptions}

Give an insightful, encouraging reading that:
1. Briefly interprets each card in its position (Past/Present/Future)
2. Ties all three together into a cohesive narrative related to their question
3. Ends with an uplifting message or advice

Keep it concise (under 200 words). Be mystical but warm. Do not use headers or bullet points — write in flowing paragraphs.`,
      },
    ],
  });

  const reading =
    message.content[0].type === "text" ? message.content[0].text : "";

  return NextResponse.json({ reading });
}
