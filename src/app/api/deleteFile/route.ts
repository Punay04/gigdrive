import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";

export async function POST(req: NextRequest) {
  const { fileId } = await req.json();

  const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {
    polling: false,
  });

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

    console.log("fileUploadId from DB:", file.fileUploadId);
    console.log("Converted to number:", Number(file.fileUploadId));

    await supabase.from("Files").delete().eq("id", fileId);

    await bot.deleteMessage(process.env.TELEGRAM_CHAT_ID!, file.messageId);

    return NextResponse.json({ message: "File deleted" });
  } catch (error) {
    console.log("Error deleting file:", error);
    return NextResponse.json({ message: "Error deleting file" });
  }
}
