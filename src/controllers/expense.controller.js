import Expense from "../models/expense.model.js";
import asyncHandler from "express-async-handler";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  getExpenseSummary,
  updateExpense,
} from "../services/expense.service.js";

export const getExpensesController = asyncHandler(async (req, res) => {
  const expenses = await getExpenses(req.query, req.user._id);

  res.status(200).json({
    count: expenses.length,
    expenses,
  });
});

export const getExpenseSummaryController = asyncHandler(async (req, res) => {
  const expenseSummary = await getExpenseSummary(req.user._id);

  res.status(200).json(expenseSummary);
});

export const createExpenseController = asyncHandler(async (req, res) => {
  const expense = await createExpense(req.body, req.user._id);

  res.status(201).json({
    message: "Expense created",
    expense,
  });
});

export const updateExpenseController = asyncHandler(async (req, res) => {
  const updatedExpense = await updateExpense(
    req.params.id,
    req.body,
    req.user._id,
  );

  res.status(200).json({
    message: "Expense updated",
    expense: updatedExpense,
  });
});

export const deleteExpenseController = asyncHandler(async (req, res) => {
  await deleteExpense(req.params.id, req.user._id);

  res.status(200).json({
    message: "Expense deleted",
  });
});
