import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import connectDB from "./config/database.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [process.env.FRONTEND_URL1],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);
app.get("/", (req, res) => {
  res.send("Task Manager Backend is Running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
