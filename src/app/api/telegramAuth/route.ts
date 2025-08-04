import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { data: existingUser, error } = await supabase
    .from("Users")
    .select()
    .eq("hash", data.hash)
    .eq("telegramId", data.id)
    .single();

  if (!existingUser || error) {
    const { data: insertedUser, error: insertError } = await supabase
      .from("Users")
      .insert({
        name: data.first_name,
        hash: data.hash,
        telegramId: data.id,
        authDate: data.auth_date,
      })
      .select()
      .single();

    if (insertError || !insertedUser) {
      return NextResponse.json(
        { error: "User creation failed" },
        { status: 500 }
      );
    }

    const token = jwt.sign({ id: insertedUser.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return NextResponse.json({
      message: "User created",
      token,
    });
  }

  return NextResponse.json({
    message: "User already exists",
  });
}
