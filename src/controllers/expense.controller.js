import Expense from "../models/expense.model.js";

export const createExpense = async (req, res, next) => {
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
};
