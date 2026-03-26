import express from "express";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import morgan from "morgan";

const app = express();

morgan.token("user", (req) => {
  return req.user ? req.user._id : "guest";
});

app.use(
  morgan(
    "[:date[iso]] :method :url :status :response-time ms - user::user"
  )
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Smart Expense API is running",
    status: "OK"
  });
});

app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/api/expenses", expenseRoutes);

app.use((req, res, next) => {
  res.status(404);
  next(new Error("Route not found"));
});
app.use(errorHandler);

export default app;
