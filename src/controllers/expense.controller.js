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
