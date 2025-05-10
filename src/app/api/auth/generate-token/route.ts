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
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error generating token:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
