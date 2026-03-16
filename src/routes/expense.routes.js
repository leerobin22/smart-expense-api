import express from "express";
import {
  createExpenseController,
  deleteExpenseController,
  getExpensesController,
  getExpenseSummaryController,
  updateExpenseController,
} from "../controllers/expense.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { expenseInputValidator } from "../validators/expense.validator.js";
import { validateInput } from "../middleware/validate.middleware.js";
import { receiptTextInputValidator } from "../validators/receipt.validator.js";
import { processReceiptTextController } from "../controllers/receipt.controller.js";

const router = express.Router();

router.get("/", protect, getExpensesController);
router.get("/summary", protect, getExpenseSummaryController);

router.post(
  "/",
  protect,
  expenseInputValidator,
  validateInput,
  createExpenseController,
);
router.post(
  "/receipt",
  protect,
  receiptTextInputValidator,
  validateInput,
  processReceiptTextController,
);

router.put(
  "/:id",
  protect,
  expenseInputValidator,
  validateInput,
  updateExpenseController,
);

router.delete("/:id", protect, deleteExpenseController);

export default router;
