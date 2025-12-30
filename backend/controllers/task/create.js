import Task from "../../model/TaskSchema.js";

const create = async (req, res) => {
  try {
    const { title, description, dueDate, priority,status } = req.body;

    if (!title || !dueDate || !priority) {
      return res.status(400).json({
        success: false,
        message: "Title, due date and priority are required",
      });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
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

export default create;
