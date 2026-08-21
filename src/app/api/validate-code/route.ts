import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  if (!code) {
    return NextResponse.json({ error: "Code is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("codes")
    .select("code, used")
    .eq("code", code.toUpperCase().trim())
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Invalid code" }, { status: 404 });
  }

  if (data.used) {
    return NextResponse.json(
      { error: "This code has already been used" },
      { status: 410 }
    );
  }

  // Mark as used
  await supabase
    .from("codes")
    .update({ used: true, used_at: new Date().toISOString() })
    .eq("code", data.code);

  return NextResponse.json({ valid: true });
}
