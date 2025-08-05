import { supabase } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await request.json();
  console.log("userId:", userId);

  try {
    const folders = await supabase
      .from("Folders")
      .select()
      .eq("userId", String(userId))
      .order("created_at", { ascending: false });

    return NextResponse.json({
      message: "Success",
      folders: folders.data,
    });
  } catch (error) {
    console.log("Error getting folders:", error);
    return NextResponse.json({
      message: "Error getting folders",
    });
  }
}
