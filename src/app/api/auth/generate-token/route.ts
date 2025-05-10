import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, email, name } = body;

    const SECRET = process.env.JWT_SECRET;
    if (!SECRET) {
      return NextResponse.json(
        { error: "JWT_SECRET no definido" },
        { status: 500 },
      );
    }

    const token = sign({ id, email, name }, SECRET, { expiresIn: "7d" });

    return NextResponse.json({ token }, { status: 200 });
  } catch (err: any) {
    console.error("Token error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
