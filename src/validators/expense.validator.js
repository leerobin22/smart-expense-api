import { body } from "express-validator";
import { EXPENSE_CATEGORIES } from "../constants/expense.constants.js";

export const expenseInputValidator = [
  body("merchant").notEmpty().withMessage("Merchant is required"),

  body("amount").isNumeric().withMessage("Amount must be a number"),

  body("category").isIn(EXPENSE_CATEGORIES).withMessage("Invalid category"),

  body("date").isISO8601().withMessage("Date must be valid"),
];
