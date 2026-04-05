import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.id || !data.first_name) {
      return NextResponse.json(
        { error: "Missing required fields: id or first_name" },
        { status: 400 }
      );
    }

    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const { data: existingUser, error } = await supabase
      .from("Users")
      .select()
      .eq("telegramId", String(data.id))
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { error: "Database query failed" },
        { status: 500 }
      );
    }

    if (!existingUser) {
      const { data: insertedUser, error: insertError } = await supabase
        .from("Users")
        .insert({
          name: data.first_name,
          hash: data.hash,
          telegramId: String(data.id),
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

      const token = jwt.sign({ id: insertedUser.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return NextResponse.json({
        message: "User created",
        token,
      });
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return NextResponse.json({
      message: "User already exists",
      token,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
