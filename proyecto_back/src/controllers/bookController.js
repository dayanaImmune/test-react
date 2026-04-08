import { encryptText } from "../utils/crypto.js";
import {
  listBooks as repoListBooks,
  getBookById as repoGetBookById,
  createBook as repoCreateBook,
  updateBook as repoUpdateBook,
  deleteBook as repoDeleteBook
} from "../repositories/bookRepository.js";
import { getCategoryById } from "../repositories/categoryRepository.js";

export async function listBooks(req, res, next) {
  try {
    const books = await repoListBooks();
    return res.json(books);
  } catch (error) {
    next(error);
  }
}

export async function getBookById(req, res, next) {
  try {
    const book = await repoGetBookById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado." });
    }

    return res.json(book);
  } catch (error) {
    next(error);
  }
}

export async function createBook(req, res, next) {
  try {
    const {
      title,
      author,
      price,
      stock = 0,
      supplier_cost,
      category_id
    } = req.body;

    if (
      !title ||
      !author ||
      price === undefined ||
      supplier_cost === undefined ||
      !category_id
    ) {
      return res.status(400).json({
        message: "title, author, price, supplier_cost y category_id son obligatorios."
      });
    }

    const category = await getCategoryById(category_id);

    if (!category) {
      return res.status(400).json({ message: "La categoría indicada no existe." });
    }

    const book = await repoCreateBook({
      title,
      author,
      price,
      stock,
      supplierCostEncrypted: encryptText(String(supplier_cost)),
      categoryId: category_id,
      createdBy: req.user.id
    });

    return res.status(201).json(book);
  } catch (error) {
    next(error);
  }
}

export async function updateBook(req, res, next) {
  try {
    const {
      title,
      author,
      price,
      stock,
      supplier_cost,
      category_id
    } = req.body;

    const existing = await repoGetBookById(req.params.id);

    if (!existing) {
      return res.status(404).json({ message: "Libro no encontrado." });
    }

    if (
      !title ||
      !author ||
      price === undefined ||
      stock === undefined ||
      supplier_cost === undefined ||
      !category_id
    ) {
      return res.status(400).json({
        message: "title, author, price, stock, supplier_cost y category_id son obligatorios."
      });
    }

    const category = await getCategoryById(category_id);

    if (!category) {
      return res.status(400).json({ message: "La categoría indicada no existe." });
    }

    const updated = await repoUpdateBook(req.params.id, {
      title,
      author,
      price,
      stock,
      supplierCostEncrypted: encryptText(String(supplier_cost)),
      categoryId: category_id
    });

    return res.json(updated);
  } catch (error) {
    next(error);
  }
}

export async function deleteBook(req, res, next) {
  try {
    const existing = await repoGetBookById(req.params.id);

    if (!existing) {
      return res.status(404).json({ message: "Libro no encontrado." });
    }

    await repoDeleteBook(req.params.id);
    return res.json({ message: "Libro eliminado correctamente." });
  } catch (error) {
    next(error);
  }
}
