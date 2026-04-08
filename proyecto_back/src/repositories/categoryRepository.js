import { pool } from "../db/pool.js";

export async function listCategories() {
  const [rows] = await pool.execute(
    "SELECT id, name, description, created_at FROM categories ORDER BY id ASC"
  );
  return rows;
}

export async function getCategoryById(id) {
  const [rows] = await pool.execute(
    "SELECT id, name, description, created_at FROM categories WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] || null;
}

export async function createCategory({ name, description }) {
  const [result] = await pool.execute(
    "INSERT INTO categories (name, description) VALUES (?, ?)",
    [name, description ?? null]
  );
  return getCategoryById(result.insertId);
}

export async function updateCategory(id, { name, description }) {
  await pool.execute(
    "UPDATE categories SET name = ?, description = ? WHERE id = ?",
    [name, description ?? null, id]
  );
  return getCategoryById(id);
}

export async function deleteCategory(id) {
  const [result] = await pool.execute(
    "DELETE FROM categories WHERE id = ?",
    [id]
  );
  return result.affectedRows;
}
