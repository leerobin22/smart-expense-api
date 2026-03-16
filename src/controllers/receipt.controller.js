import asyncHandler from "express-async-handler";
import { processReceiptText } from "../services/receipt.service.js";

export const processReceiptTextController = asyncHandler(async (req, res, next) => {
  const { text } = req.body;

  const expense = await processReceiptText(text, req.user._id);

  return res.status(201).json({
    message: "Success!",
    expense,
  });
});
