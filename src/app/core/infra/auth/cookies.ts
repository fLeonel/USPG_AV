import { parse } from "cookie";
import { NextApiRequest } from "next";

const TOKEN_KEY = "token";

export const getTokenFromApiRequest = (req: NextApiRequest): string | null => {
  const cookieHeader = req.headers.cookie || "";
  const parsed = parse(cookieHeader);
  return parsed[TOKEN_KEY] || null;
};

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

export const TOKEN_KEY_NAME = TOKEN_KEY;
