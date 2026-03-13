import { body } from "express-validator";

export const receiptTextInputValidator = [
  body("text").notEmpty().withMessage("Text is required"),
];
