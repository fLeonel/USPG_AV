import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { COOKIE_OPTIONS, TOKEN_KEY_NAME } from "@/core/infra/auth/cookies";

/**
 * Maneja la solicitud POST para autenticar un usuario y generar un token JWT.
 *
 * @param req - Objeto de solicitud `Request` con los datos del usuario en el cuerpo (JSON).
 * @returns Una respuesta JSON con estado 200 y el token en una cookie, o un error con estado 500.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, email, name, user_pic } = body;

    const SECRET = process.env.JWT_SECRET;

    // Si no hay clave secreta, no se puede firmar el token
    if (!SECRET) {
      return NextResponse.json(
        { error: "JWT_SECRET no definido" },
        { status: 500 }
      );
    }

    // Genera un token firmado con los datos del usuario y expiración de 7 días
    const token = sign({ id, email, name, user_pic }, SECRET, {
      expiresIn: "7d",
    });

    // Crea la respuesta y establece la cookie con el token
    const response = NextResponse.json({ ok: true }, { status: 200 });
    response.cookies.set(TOKEN_KEY_NAME, token, COOKIE_OPTIONS);

    return response;
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error generating token:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
