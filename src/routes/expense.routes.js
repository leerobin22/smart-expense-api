import express from "express";
import {
  createExpense,
  getExpenses,
} from "../controllers/expense.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/expenses", protect, createExpense);
router.get("/expenses", protect, getExpenses);

export default router;
