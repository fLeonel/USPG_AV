import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { COOKIE_OPTIONS, TOKEN_KEY_NAME } from "@/core/infra/auth/cookies";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, email, name, user_pic } = body;

    const SECRET = process.env.JWT_SECRET;
    if (!SECRET) {
      return NextResponse.json(
        { error: "JWT_SECRET no definido" },
        { status: 500 },
      );
    }

    const token = sign({ id, email, name, user_pic }, SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({ ok: true }, { status: 200 });
    response.cookies.set(TOKEN_KEY_NAME, token, COOKIE_OPTIONS);

    return response;
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error generating token:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
