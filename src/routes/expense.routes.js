import express from "express";
import { createExpense } from "../controllers/expense.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/expenses", protect, createExpense);

export default router;
