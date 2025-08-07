import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { folderName } = await req.json();

  if (!folderName) {
    return NextResponse.json({
      message: "Folder name is required",
    });
  }

  try {
    await supabase.from("Folders").delete().eq("name", folderName);

    return NextResponse.json({
      message: "Folder deleted",
    });
  } catch (error) {
    console.log("Error : " + error);
    return NextResponse.json({
      message: "Error in deleting folder",
    });
  }
}
