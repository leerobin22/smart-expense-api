import express from "express";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  getExpenseSummary,
  updateExpense,
} from "../controllers/expense.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getExpenses);
router.post("/", protect, createExpense);

router.get("/summary", protect, getExpenseSummary);

router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);

export default router;
