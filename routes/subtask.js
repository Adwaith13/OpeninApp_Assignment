const express = require("express");
const SubTask = require("../models/SubTask");

const router = express.Router();

router.post("/createsubtask", async (req, res) => {
  try {
    const { task_id, status } = req.body;
    if (!task_id || !status) {
      return res.status(400).json({
        status: "Failed",
        message: "Task Id and Status is required",
      });
    }

    const createSubTask = await SubTask.create({
      task_id,
      status,
    });

    return res.status(200).json({
      status: "Success",
      message: "Sub Task Created",
      subtask: createSubTask,
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
