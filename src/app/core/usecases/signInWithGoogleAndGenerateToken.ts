import { sign } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET as string;

if (!SECRET_KEY) {
  throw new Error("Falta definir JWT_SECRET en las variables de entorno");
}

interface GoogleUser {
  id: string;
  email: string;
  name: string;
}

export async function signInWithGoogleAndGenerateToken(
  user: GoogleUser,
): Promise<string> {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  const token = sign(payload, SECRET_KEY, {
    expiresIn: "7d",
  });

  return token;
}
