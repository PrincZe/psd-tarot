import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const { code, question, reading } = await req.json();

  await supabase
    .from("codes")
    .update({ question, reading })
    .eq("code", code);

  return NextResponse.json({ saved: true });
}
