import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";
import { env } from "../config/env.js";

const schemaPath = path.resolve("db/schema.sql");
const schemaSql = fs.readFileSync(schemaPath, "utf8");

async function main() {
  const connection = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    multipleStatements: true
  });

  await connection.query(schemaSql);
  await connection.end();
  console.log("Base de datos inicializada correctamente.");
}

main().catch((error) => {
  console.error("Error al inicializar la base de datos:", error);
  process.exit(1);
});
