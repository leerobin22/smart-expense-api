import Expense from "../models/expense.model.js";
import { extractReceiptData } from "./ai.service.js";

export async function processReceiptText(text, userId) {
  if (!text) {
    throw new Error("Receipt text is required");
  }

  const aiResult = await extractReceiptData(text);

  const expenseDate = aiResult.date ? new Date(aiResult.date) : new Date();

  const expense = await Expense.create({
    merchant: aiResult.merchant,
    amount: aiResult.amount,
    category: aiResult.category,
    date: expenseDate,
    userId,
  });

  return expense;
}
