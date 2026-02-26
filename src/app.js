import express from "express";
import healthRoutes from "./routes/health.routes.js"
import { logger } from "./middleware/logger.middleware.js";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/health", healthRoutes)

export default app;
