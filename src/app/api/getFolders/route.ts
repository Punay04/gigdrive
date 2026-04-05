import { supabase } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  try {
    const folders = await supabase
      .from("Folders")
      .select("*,Files(*)")
      .eq("userId", String(userId))
      .order("created_at", { ascending: false });

    return NextResponse.json({
      message: "Success",
      folders: folders.data,
    });
  } catch {
    return NextResponse.json({
      message: "Error getting folders",
    });
  }
}
