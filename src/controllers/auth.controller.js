import asyncHandler from "express-async-handler";
import { loginUser, registerUser } from "../services/auth.service.js";

export const registerUserController = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    message: "User registered successfully",
    userId: user._id,
  });
});

export const loginUserController = asyncHandler(async (req, res) => {
  const token = await loginUser(req.body);

  res.status(200).json({
    message: "Login successful",
    token,
  });
});
