import express from "express";
import { getAvailableStock } from "../controllers/stockController.js";

const router = express.Router();

// ✅ Route to fetch available stock
router.get("/list", getAvailableStock);

export default router;
