import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  listBooks,
  updateBook
} from "../controllers/bookController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", listBooks);
router.get("/:id", getBookById);
router.post("/", requireAuth, createBook);
router.put("/:id", requireAuth, updateBook);
router.delete("/:id", requireAuth, deleteBook);

export default router;
