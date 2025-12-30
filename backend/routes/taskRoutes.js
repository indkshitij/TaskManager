import express from "express";
import create from "../controllers/task/create.js";
import { updateTask } from "../controllers/task/update.js";
import deleteTask from "../controllers/task/delete.js";
import {
  fetchTask,
  recentTask,
  fetchTaskById,
  getTaskStats,
} from "../controllers/task/fetch.js";
import authMiddleware from "../middlewares/authMiddlewar.js";

const taskRouter = express.Router();

taskRouter.post("/create", authMiddleware, create);
taskRouter.get("/", authMiddleware, fetchTask);
taskRouter.get("/recent-task", authMiddleware, recentTask);
taskRouter.get("/task-stat", authMiddleware, getTaskStats);
taskRouter.get("/fetch-task/:id", authMiddleware, fetchTaskById);
taskRouter.put("/update/:id", authMiddleware, updateTask);
taskRouter.delete("/delete/:id", authMiddleware, deleteTask);

export default taskRouter;
