import express from "express";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "bookstore API MySQL",
    status: "ok",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/books", bookRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada." });
});

app.use(errorHandler);

export default app;
