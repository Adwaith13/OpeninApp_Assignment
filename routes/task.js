const express = require("express");
const Task = require("../models/Task");
const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

router.post("/createtask", authenticateUser, async (req, res) => {
  try {
    const user_id = req.user_id;

    const { title, description, due_date, priority, status } = req.body;

    if (!title || !description || !due_date || !priority || !status) {
      return res.status(400).json({
        status: "Failed",
        message:
          "All fields (title, description, due_date, priority, status) are required.",
      });
    }

    const createTask = await Task.create({
      title,
      description,
      due_date,
      priority,
      status,
      user_id,
    });

    return res.status(200).json({
      status: "Success",
      message: "Task created successfully",
      task: createTask,
    });
  } catch (error) {
    console.error("Create Task Failed", error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
