import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt.js";
import { createUser, getUserByEmail } from "../repositories/userRepository.js";

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "name, email y password son obligatorios."
      });
    }

    if (String(password).length < 6) {
      return res.status(400).json({
        message: "La contraseña debe tener al menos 6 caracteres."
      });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message: "Ya existe un usuario con ese email."
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, passwordHash });
    const token = signToken(user);

    return res.status(201).json({
      message: "Usuario registrado correctamente.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email y password son obligatorios."
      });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas."
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Credenciales inválidas."
      });
    }

    const token = signToken(user);

    return res.json({
      message: "Login correcto.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function me(req, res) {
  return res.json({ user: req.user });
}
