import Expense from "../models/expense.model.js";
import asyncHandler from "express-async-handler";

const DEFAULT_CATEGORY = ["food", "transport", "shopping", "bills", "others"];

export const createExpense = asyncHandler(async (req, res) => {
  const { merchant, amount, date, category } = req.body;

  const expense = await Expense.create({
    userId: req.user._id,
    merchant,
    amount,
    date,
    category,
  });

  res.status(201).json({
    message: "Expense created",
    expense,
  });
});

export const getExpenses = asyncHandler(async (req, res) => {
  const { startDate, endDate, category, offset, limit } = req.query;

  const page = parseInt(offset) || 1;
  const size = parseInt(limit) || 10;

  const filter = {
    userId: req.user._id,
  };

  if (category) {
    if (DEFAULT_CATEGORY.indexOf(category) === -1) {
      res.status(400);
      throw new Error("Category not found!");
    }

    filter.category = category;
  }

  if (startDate && endDate) {
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const expenses = await Expense.find(filter)
    .sort({ date: -1 })
    .skip((page - 1) * size)
    .limit(size);

  res.status(200).json({
    count: expenses.length,
    expenses,
  });
});

export const updateExpense = asyncHandler(async (req, res) => {
  const { merchant, amount, date, category } = req.body;

  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error("Expense not found");
  }

  if (expense.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this expense");
  }

  expense.merchant = merchant || expense.merchant;
  expense.amount = amount || expense.amount;
  expense.date = date || expense.date;
  expense.category = category || expense.category;

  const updatedExpense = await expense.save();

  res.status(200).json({
    message: "Expense updated",
    expense: updatedExpense,
  });
});

export const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error("Expense not found");
  }

  if (expense.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this expense");
  }

  await expense.deleteOne();

  res.status(200).json({
    message: "Expense deleted",
  });
});
