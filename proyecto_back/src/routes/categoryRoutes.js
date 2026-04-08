import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  listCategories,
  updateCategory
} from "../controllers/categoryController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", listCategories);
router.get("/:id", getCategoryById);
router.post("/", requireAuth, createCategory);
router.put("/:id", requireAuth, updateCategory);
router.delete("/:id", requireAuth, deleteCategory);

export default router;
