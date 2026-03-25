import { config } from "./config/env.js";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = config.port || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
