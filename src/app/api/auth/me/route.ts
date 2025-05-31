import { NextResponse, NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

/**
 * Maneja la solicitud GET para obtener los datos del usuario autenticado.
 * 
 * Esta función verifica el token JWT enviado como cookie. Si el token es válido,
 * decodifica y devuelve los datos del usuario. Si el token no existe o no es válido,
 * responde con un error 401.
 * 
 * @param req - Objeto de solicitud de Next.js que incluye las cookies.
 * @returns {NextResponse} Una respuesta JSON con los datos del usuario o un error 401 si no está autenticado.
 */
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
