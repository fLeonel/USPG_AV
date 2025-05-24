import { NextResponse, NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      name?: string;
      user_pic?: string;
    };

    return NextResponse.json({ user: decoded }, { status: 200 });
  } catch (error) {
    console.error("Token inválido en /api/auth/me", error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
