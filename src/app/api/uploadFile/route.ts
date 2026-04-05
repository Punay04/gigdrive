import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folderId = formData.get("folderId") as string;
    const userId = formData.get("userId") as string;

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

    const chatId = process.env.TELEGRAM_CHAT_ID!;
    const botToken = process.env.TELEGRAM_BOT_TOKEN!;

    // Check for existing file
    const existingFile = await supabase
      .from("Files")
      .select()
      .eq("fileName", file.name)
      .maybeSingle();

    if (existingFile.data) {
      return NextResponse.json(
        { message: "File already exists", success: false },
        { status: 400 }
      );
    }

    // Create FormData for Telegram API
    const telegramFormData = new FormData();
    telegramFormData.append("chat_id", chatId);

    const blob = new Blob([arrayBuffer], { type: file.type });
    const endpoint = file.type.startsWith("video") ? "sendVideo" : "sendDocument";
    const fieldName = file.type.startsWith("video") ? "video" : "document";

    telegramFormData.append(fieldName, blob, file.name);

    // Send to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/${endpoint}`,
      { method: "POST", body: telegramFormData }
    );

    const telegramResult = await telegramResponse.json();

    if (!telegramResult.ok) {
      return NextResponse.json(
        { message: "Failed to upload to Telegram", error: telegramResult.description },
        { status: 500 }
      );
    }

    const FileUpload = telegramResult.result;

    const fileId = file.type.startsWith("video")
      ? FileUpload.video?.file_id
      : FileUpload.document?.file_id;

    if (!fileId) {
      return NextResponse.json(
        { message: "No file_id found" },
        { status: 500 }
      );
    }

    // Get file path from Telegram
    const fileUrlResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`
    );
    const fileUrlData = await fileUrlResponse.json();

    // Save to database
    await supabase.from("Files").insert({
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      folderId: Number(folderId),
      fileUploadId: fileId,
      fileLink: fileUrlData.result.file_path,
      userId,
      messageId: FileUpload.message_id,
      thumbNailUrl: FileUpload.document?.thumb?.file_id || FileUpload.video?.thumb?.file_id,
    });

    return NextResponse.json({
      message: "File uploaded successfully",
      fileName: file.name,
      fileSize: file.size,
      FileUpload,
    });
  } catch {
    return NextResponse.json(
      { message: "Error uploading file" },
      { status: 500 }
    );
  }
}
