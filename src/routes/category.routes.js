import { Router } from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/category.controller.js";

const router = Router();

/**
 * CATEGORY ROUTES
 */
router.post("/", createCategory);
router.get("/", getAllCategories);

export default router;
