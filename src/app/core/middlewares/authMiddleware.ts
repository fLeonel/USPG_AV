import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { parse } from "cookie";

/**
 * Interfaz que representa los datos contenidos en el token JWT.
 */
interface JwtPayload {
  id: string;
  email: string;
}

/**
 * Extiende `NextApiRequest` para incluir la información del usuario autenticado.
 */
interface AuthenticatedRequest extends NextApiRequest {
  /** Información del usuario extraída del token JWT */
  user: JwtPayload;
}

const SECRET_KEY = process.env.JWT_SECRET as string;

if (!SECRET_KEY) {
  throw new Error("Falta definir JWT_SECRET en las variables de entorno");
}

/**
 * Middleware de autenticación para rutas API en Next.js.
 *
 * Verifica el token JWT contenido en las cookies de la solicitud y,
 * si es válido, añade la información del usuario a `req.user`.
 *
 * @param handler - Función handler de la API protegida
 * @returns Función handler con autenticación aplicada
 */
export function authMiddleware(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // 👇 Leer cookies desde el header
    const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};

    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No autorizado: Falta token" });
    }

    try {
      const decoded = verify(token, SECRET_KEY) as JwtPayload;
      (req as AuthenticatedRequest).user = decoded;
      return handler(req, res);
    } catch (error) {
      console.error("Error al verificar token:", error);
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  };
}
