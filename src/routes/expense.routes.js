import express from "express";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  getExpenseSummary,
  updateExpense,
} from "../controllers/expense.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { expenseInputValidator } from "../validators/expense.validator.js";
import { validateInput } from "../middleware/validate.middleware.js";
import { receiptTextInputValidator } from "../validators/receipt.validator.js";
import { processReceiptText } from "../controllers/receipt.controller.js";

const router = express.Router();

router.get("/", protect, getExpenses);
router.post("/", protect, expenseInputValidator, validateInput, createExpense);

router.get("/summary", protect, getExpenseSummary);

router.put(
  "/:id",
  protect,
  expenseInputValidator,
  validateInput,
  updateExpense,
);
router.delete("/:id", protect, deleteExpense);

router.post(
  "/receipt",
  protect,
  receiptTextInputValidator,
  validateInput,
  processReceiptText,
);

export default router;
