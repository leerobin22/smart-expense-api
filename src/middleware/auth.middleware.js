import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized!");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    res.status(401);
    throw new Error("Not Authorized! User not found");
  }

  req.user = user;
  next();
});
