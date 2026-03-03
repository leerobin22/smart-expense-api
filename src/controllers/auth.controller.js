import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "User registered successfully",
    userId: user._id,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    message: "Login successful",
    token,
  });
});
