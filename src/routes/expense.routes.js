import express from "express";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../controllers/expense.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/expenses", protect, createExpense);
router.get("/expenses", protect, getExpenses);
router.put("/expenses/:id", protect, updateExpense);
router.delete("/expenses/:id", protect, deleteExpense);

export default router;
