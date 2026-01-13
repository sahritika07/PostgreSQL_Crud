import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/product.controller.js";

const router = Router();

/**
 * PRODUCT ROUTES
 */
router.post("/", createProduct);
router.get("/", getAllProducts);

export default router;
