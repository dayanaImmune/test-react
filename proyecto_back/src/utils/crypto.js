import crypto from "crypto";
import { env } from "../config/env.js";

const algorithm = "aes-256-cbc";
const key = Buffer.from(env.encryptionKey, "utf8");

export function encryptText(plainText) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(String(plainText), "utf8"),
    cipher.final()
  ]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

export function decryptText(payload) {
  const [ivHex, encryptedHex] = String(payload).split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encryptedText = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final()
  ]);
  return decrypted.toString("utf8");
}
