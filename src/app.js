import express from "express";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { logger } from "./middleware/logger.middleware.js";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/health", healthRoutes);
app.use("/auth", authRoutes);

export default app;
