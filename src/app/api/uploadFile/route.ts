import { NextRequest, NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {
      polling: false,
    });

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("File name:", file.name);
    console.log("File size:", file.size);

    const chatId = "-1002613310367";

    const fileOptions = {
      filename: file.name,
      contentType: file.type,
    };

    const fileUpload = await bot.sendDocument(chatId, buffer, {}, fileOptions);

    return NextResponse.json({
      message: "File uploaded successfully",
      fileName: file.name,
      fileSize: file.size,
      fileUpload,
    });
  } catch (error) {
    console.log("Error uploading file:", error);
    return NextResponse.json(
      { message: "Error uploading file" },
      { status: 500 }
    );
  }
}
