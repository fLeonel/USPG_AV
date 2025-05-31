import { parse } from "cookie";
import { NextApiRequest } from "next";


/**
 * Nombre de la clave del token que se usa en las cookies.
 */
const TOKEN_KEY = "token";

/**
 * Extrae el token de autenticación desde una solicitud API de Next.js.
 *
 * @param req - Objeto de solicitud (`NextApiRequest`) que contiene las cookies.
 * @returns El token si está presente, o `null` si no existe.
 */
export const getTokenFromApiRequest = (req: NextApiRequest): string | null => {
  const cookieHeader = req.headers.cookie || "";
  const parsed = parse(cookieHeader);
  return parsed[TOKEN_KEY] || null;
};

/**
 * Opciones de configuración para establecer la cookie del token.
 */
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

/**
 * Exportación explícita del nombre de la clave del token.
 */
export const TOKEN_KEY_NAME = TOKEN_KEY;
