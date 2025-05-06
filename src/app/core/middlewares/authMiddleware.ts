import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

interface JwtPayload {
  id: string;
  email: string;
}

interface AuthenticatedRequest extends NextApiRequest {
  user: JwtPayload;
}

const SECRET_KEY = process.env.JWT_SECRET as string;

if (!SECRET_KEY) {
  throw new Error("Falta definir JWT_SECRET en las variables de entorno");
}

export function authMiddleware(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ message: "No autorizado: Falta token" });
    }

    const token = authorizationHeader.split(" ")[1];

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
