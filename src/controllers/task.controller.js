import Task from "../models/task.model.js";

// add task
export const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = new Task({ title, description, user: req.userId });
    await task.save();
    // Emit task created event via Socket.IO
    req.io.emit("taskCreated", task);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
};

// show task
export const getTasks = async (req, res) => {
  try {
    // console.log(req.userId);

    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

// delete task
export const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    console.log(task);

    await Task.findByIdAndDelete(task._id);
    req.io.emit("taskDeleted", taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
