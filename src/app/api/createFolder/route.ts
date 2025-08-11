import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, description, userId } = await req.json();

  if (!name || !description || !userId) {
    return NextResponse.json(
      { message: "Missing name or description" },
      { status: 400 }
    );
  }

  try {
    const existingFolder = await supabase
      .from("Folders")
      .select()
      .eq("name", name)
      .single();

    if (existingFolder.data) {
      return NextResponse.json(
        { message: "Folder already exists" },
        { status: 400 }
      );
    }

    const folder = await supabase
      .from("Folders")
      .insert({ name, description, userId })
      .select()
      .single();

    return NextResponse.json({
      message: "Folder created successfully",
      folder: folder.data,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to create folder" },
      { status: 500 }
    );
  }
}
