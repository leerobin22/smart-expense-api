import express from "express";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { logger } from "./middleware/logger.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use((req, res, next) => {
  res.status(404);
  next(new Error("Route not found"));
});
app.use(errorHandler);

export default app;
