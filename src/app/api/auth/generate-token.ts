import { sign } from "jsonwebtoken";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { id, email, name } = req.body;

  const SECRET_KEY = process.env.JWT_SECRET;
  if (!SECRET_KEY) {
    return res.status(500).json({ error: "JWT_SECRET no definido" });
  }

  const token = sign({ id, email, name }, SECRET_KEY, { expiresIn: "7d" });
  return res.status(200).json({ token });
}
