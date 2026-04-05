import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { fileId } = await req.json();

  if (!fileId) {
    return NextResponse.json({ message: "Missing fileId" }, { status: 400 });
  }

  try {
    const { data: file, error } = await supabase
      .from("Files")
      .select()
      .eq("id", fileId)
      .single();

    if (error || !file) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    // Delete from Supabase first
    await supabase.from("Files").delete().eq("id", fileId);

    // Delete from Telegram using direct API
    const botToken = process.env.TELEGRAM_BOT_TOKEN!;
    const chatId = process.env.TELEGRAM_CHAT_ID!;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/deleteMessage?chat_id=${chatId}&message_id=${file.messageId}`
    );

    const telegramResult = await telegramResponse.json();

    if (!telegramResult.ok) {
      // Don't fail the request if Telegram delete fails - file is already removed from DB
    }

    return NextResponse.json({ message: "File deleted" });
  } catch {
    return NextResponse.json({ message: "Error deleting file" }, { status: 500 });
  }
}
