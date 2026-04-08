import { pool } from "../db/pool.js";
import { decryptText } from "../utils/crypto.js";

function mapBook(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    price: Number(row.price),
    stock: Number(row.stock),
    supplier_cost: Number(decryptText(row.supplier_cost_encrypted)),
    category_id: row.category_id,
    category_name: row.category_name,
    created_by: row.created_by,
    creator_name: row.creator_name,
    created_at: row.created_at
  };
}

export async function listBooks() {
  const [rows] = await pool.execute(`
    SELECT
      b.id, b.title, b.author, b.price, b.stock, b.supplier_cost_encrypted,
      b.category_id, c.name AS category_name,
      b.created_by, u.name AS creator_name,
      b.created_at
    FROM books b
    INNER JOIN categories c ON c.id = b.category_id
    INNER JOIN users u ON u.id = b.created_by
    ORDER BY b.id ASC
  `);

  return rows.map(mapBook);
}

export async function getBookById(id) {
  const [rows] = await pool.execute(`
    SELECT
      b.id, b.title, b.author, b.price, b.stock, b.supplier_cost_encrypted,
      b.category_id, c.name AS category_name,
      b.created_by, u.name AS creator_name,
      b.created_at
    FROM books b
    INNER JOIN categories c ON c.id = b.category_id
    INNER JOIN users u ON u.id = b.created_by
    WHERE b.id = ?
    LIMIT 1
  `, [id]);

  return mapBook(rows[0] || null);
}

export async function createBook({
  title,
  author,
  price,
  stock,
  supplierCostEncrypted,
  categoryId,
  createdBy
}) {
  const [result] = await pool.execute(`
    INSERT INTO books (title, author, price, stock, supplier_cost_encrypted, category_id, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [title, author, price, stock, supplierCostEncrypted, categoryId, createdBy]);

  return getBookById(result.insertId);
}

export async function updateBook(id, {
  title,
  author,
  price,
  stock,
  supplierCostEncrypted,
  categoryId
}) {
  await pool.execute(`
    UPDATE books
    SET title = ?, author = ?, price = ?, stock = ?, supplier_cost_encrypted = ?, category_id = ?
    WHERE id = ?
  `, [title, author, price, stock, supplierCostEncrypted, categoryId, id]);

  return getBookById(id);
}

export async function deleteBook(id) {
  const [result] = await pool.execute(
    "DELETE FROM books WHERE id = ?",
    [id]
  );
  return result.affectedRows;
}
