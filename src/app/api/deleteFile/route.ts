import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { fileId } = await req.json();

  if (!fileId) {
    return NextResponse.json({ message: "Missing fileId" }, { status: 400 });
  }

  try {
    await supabase.from("Files").delete().eq("id", fileId);

    return NextResponse.json({ message: "File deleted" });
  } catch (error) {
    console.log("Error deleting file:", error);
    return NextResponse.json({ message: "Error deleting file" });
  }
}
