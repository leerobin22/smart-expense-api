import Expense from "../models/expense.model.js";

export async function getExpenses(query, userId) {
  const { startDate, endDate, category, offset, limit } = query;

  const page = parseInt(offset) || 1;
  const size = parseInt(limit) || 10;

  const filter = {
    userId: userId,
  };

  if (category) {
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

  return expenses;
}

export async function getExpenseSummary(userId) {
  const totalSpending = await Expense.aggregate([
    {
      $match: { userId },
    },
    {
      $group: {
        _id: null,
        totalSpent: { $sum: "$amount" },
      },
    },
  ]);

  const spendingPerCategory = await Expense.aggregate([
    {
      $match: { userId },
    },
    {
      $group: {
        _id: "$category",
        totalSpent: { $sum: "$amount" },
      },
    },
    {
      $sort: { totalSpent: -1 },
    },
  ]);

  return {
    totalSpent: totalSpending[0]?.totalSpent || 0,
    categories: spendingPerCategory.map((item) => ({
      category: item._id,
      total: item.totalSpent,
    })),
  };
}

export async function createExpense(body, userId) {
  const { merchant, amount, date, category } = body;

  const expense = await Expense.create({
    userId: userId,
    merchant,
    amount,
    date,
    category,
  });

  return expense;
}

export async function updateExpense(expenseId, body, userId) {
  const { merchant, amount, date, category } = body;

  const expense = await Expense.findById(expenseId);

  if (!expense) {
    res.status(404);
    throw new Error("Expense not found");
  }

  if (expense.userId.toString() !== userId.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this expense");
  }

  expense.merchant = merchant || expense.merchant;
  expense.amount = amount || expense.amount;
  expense.date = date || expense.date;
  expense.category = category || expense.category;

  return await expense.save();
}

export async function deleteExpense(expenseId, userId) {
  const expense = await Expense.findById(expenseId);

  if (!expense) {
    res.status(404);
    throw new Error("Expense not found");
  }

  if (expense.userId.toString() !== userId.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this expense");
  }

  await expense.deleteOne();
}
