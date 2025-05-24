import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TOKEN_KEY_NAME } from "@/core/infra/auth/cookies";

export async function POST() {
  (await cookies()).delete(TOKEN_KEY_NAME);

  return NextResponse.json({ ok: true, message: "Sesión cerrada" });
}
