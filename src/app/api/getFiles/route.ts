import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { folderId, userId } = await req.json();

  if (!folderId || !userId) {
    return NextResponse.json(
      { message: "Missing folderId or userId" },
      { status: 400 }
    );
  }

  try {
    const files = await supabase
      .from("Files")
      .select()
      .eq("folderId", folderId)
      .eq("userId", userId)
      .order("created_at", { ascending: false });

    return NextResponse.json({
      message: "Success",
      files: files.data,
    });
  } catch (error) {
    console.log("Error getting files:", error);
    return NextResponse.json({
      message: "Error getting files",
    });
  }
}
