import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  filterProducts,
  searchProducts,
} from "../controllers/product.controller.js";

const router = Router();
router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/filter", filterProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
