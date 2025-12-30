import Task from "../../model/TaskSchema.js";
import mongoose from "mongoose";

export const fetchTask = async (req, res) => {
  try {
    const query = { createdBy: req.user.id };

    if (req.query.status) {
      query.status = req.query.status;
    }

    if (req.query.priority) {
      query.priority = req.query.priority;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const recentTask = async (req, res) => {
  try {
    const tasks = await Task.find({
      createdBy: req.user.id,
      status: { $ne: "completed" },
    })
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const fetchTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const taskId = new mongoose.Types.ObjectId(id);

    const task = await Task.findOne({
      _id: taskId,
      createdBy: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getTaskStats = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const stats = await Task.aggregate([
      {
        $match: {
          createdBy: userId,
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = {
      pending: 0,
      "in-progress": 0,
      completed: 0,
      total: 0,
    };

    stats.forEach((item) => {
      result[item._id] = item.count;
      result.total += item.count;
    });

    res.status(200).json({
      success: true,
      stats: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch task stats",
    });
  }
};