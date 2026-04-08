import {
  listCategories as repoListCategories,
  getCategoryById as repoGetCategoryById,
  createCategory as repoCreateCategory,
  updateCategory as repoUpdateCategory,
  deleteCategory as repoDeleteCategory
} from "../repositories/categoryRepository.js";

export async function listCategories(req, res, next) {
  try {
    const categories = await repoListCategories();
    return res.json(categories);
  } catch (error) {
    next(error);
  }
}

export async function getCategoryById(req, res, next) {
  try {
    const category = await repoGetCategoryById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada." });
    }

    return res.json(category);
  } catch (error) {
    next(error);
  }
}

export async function createCategory(req, res, next) {
  try {
    const { name, description = null } = req.body;

    if (!name) {
      return res.status(400).json({ message: "name es obligatorio." });
    }

    const category = await repoCreateCategory({ name, description });
    return res.status(201).json(category);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "La categoría ya existe." });
    }
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const { name, description = null } = req.body;

    if (!name) {
      return res.status(400).json({ message: "name es obligatorio." });
    }

    const existing = await repoGetCategoryById(req.params.id);

    if (!existing) {
      return res.status(404).json({ message: "Categoría no encontrada." });
    }

    const updated = await repoUpdateCategory(req.params.id, { name, description });
    return res.json(updated);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "La categoría ya existe." });
    }
    next(error);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const existing = await repoGetCategoryById(req.params.id);

    if (!existing) {
      return res.status(404).json({ message: "Categoría no encontrada." });
    }

    await repoDeleteCategory(req.params.id);
    return res.json({ message: "Categoría eliminada correctamente." });
  } catch (error) {
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(409).json({
        message: "No se puede eliminar la categoría porque tiene libros asociados."
      });
    }
    next(error);
  }
}
