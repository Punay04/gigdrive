import { supabase } from "@/lib/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folderId = formData.get("folderId") as string;
    const userId = formData.get("userId") as string;

    console.log(userId);

    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {
      polling: false,
    });

    if (!file || file.size === 0) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    if (!folderId) {
      return NextResponse.json({ message: "No folderId" }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ message: "No userId" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("File name:", file.name);
    console.log("File size:", file.size);

    const chatId = "-1002841408801";

    const fileOptions = {
      filename: file.name,
      contentType: file.type,
    };

    const existingFile = await supabase
      .from("Files")
      .select()
      .eq("fileName", file.name)
      .single();

    if (existingFile.data) {
      return NextResponse.json(
        { message: "File already exists" },
        { status: 400 }
      );
    }

    const fileUpload = await bot.sendDocument(chatId, buffer, {}, fileOptions);

    const fileUrl = await axios.get(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileUpload.document?.file_id}`
    );

    await supabase.from("Files").insert({
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      folderId: Number(folderId),
      fileUploadId: fileUpload.document?.file_id,
      fileLink: fileUrl.data.result.file_path,
      userId,
    });

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
