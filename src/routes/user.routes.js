import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";

const router = Router();

/**
 * USER ROUTES
 */
router.get("/", getAllUsers);

export default router;
