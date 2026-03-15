import Expense from "../models/expense.model.js";
import { extractReceiptData } from "../services/ai.service.js";
import asyncHandler from "express-async-handler";

export const processReceiptText = asyncHandler(async (req, res, next) => {
  const { text } = req.body;

  let aiResult;
  try {
    aiResult = await extractReceiptData(text);
  } catch (error) {
    return res.status(500).json({
      message: "Receipt processing failed",
      error: error.message,
    });
  }

  const expense = await Expense.create({
    merchant: aiResult.merchant,
    amount: aiResult.amount,
    category: aiResult.category,
    date: aiResult.date ? new Date(aiResult.date) : new Date(),
    userId: req.user._id,
  });

  return res.status(201).json({
    message: "Success!",
    expense,
  });
});
