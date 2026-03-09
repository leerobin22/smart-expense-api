import { body } from "express-validator";

export const authInputValidator = [
  body("email").isEmail().withMessage("Must be a valid email"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters"),
];
