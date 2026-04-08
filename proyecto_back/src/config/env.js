import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 3000),
  jwtSecret: process.env.JWT_SECRET || "dev-jwt-secret",
  encryptionKey:
    process.env.ENCRYPTION_KEY || "12345678901234567890123456789012",
  db: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "bookstore",
  },
};

if (env.encryptionKey.length !== 32) {
  throw new Error("ENCRYPTION_KEY debe tener exactamente 32 caracteres.");
}
