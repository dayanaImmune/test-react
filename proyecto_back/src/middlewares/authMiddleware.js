import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { getUserById } from "../repositories/userRepository.js";

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado." });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await getUserById(payload.sub);

    if (!user) {
      return res.status(401).json({ message: "Usuario no válido." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
}
