import express from "express";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();

app.use(helmet());
app.use(cors({ origin: "*" }));

morgan.token("user", (req) => {
  return req.user ? req.user._id : "guest";
});

app.use(
  morgan(
    "[:date[iso]] :method :url :status :response-time ms - user::user"
  )
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many requests, please try again later"
  }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many login attempts, try again later"
  }
});

app.use("/api", limiter);
app.use("/auth", authLimiter);

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
