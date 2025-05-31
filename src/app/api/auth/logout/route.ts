import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TOKEN_KEY_NAME } from "@/core/infra/auth/cookies";

/**
 * Maneja la solicitud POST para cerrar sesión del usuario.
 * 
 * Esta función elimina la cookie de autenticación definida por `TOKEN_KEY_NAME`,
 * lo que efectivamente termina la sesión del usuario en el lado del cliente.
 * 
 * @returns {NextResponse} Una respuesta JSON que indica si la operación fue exitosa.
 */
export async function POST() {
  (await cookies()).delete(TOKEN_KEY_NAME);

  return NextResponse.json({ ok: true, message: "Sesión cerrada" });
}
