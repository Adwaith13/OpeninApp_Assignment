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

router.get("/priority/:priority", async (req, res) => {
  try {
    const { priority } = req.params;

    if (!priority) {
      return res.status(400).json({
        status: "Failed",
        message: "Priority is required",
      });
    }

    const findTaskPriority = await Task.findAll({
      where: { priority: priority },
    });

    if (findTaskPriority.length === 0) {
      return res.status(400).json({
        status: "Failed",
        message: `No task found with priority ${priority} `,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: `Task with priority ${priority} found successfully`,
      task: findTaskPriority,
    });
  } catch (error) {
    console.error("Something is wrong", error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

router.get("/status/:taskstatus", async (req, res) => {
  try {
    const { taskstatus } = req.params;
    if (!taskstatus) {
      return res.status(400).json({
        status: "Failed",
        message: "Task Status is required",
      });
    }
    const findTaskStatus = await Task.findAll({
      where: { status: taskstatus },
    });

    if (findTaskStatus.length === 0) {
      return res.status(400).json({
        status: "Failed",
        message: `No status found with task status ${taskstatus}`,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Task Status found",
      task: findTaskStatus,
    });
  } catch (error) {
    console.error("Something is wrong", error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

router.put("/updateduedate", async (req, res) => {
  try {
    const { id, due_date } = req.body;

    if (!id) {
      return res.status(400).json({
        status: "Failed",
        message: "Id is required",
      });
    }

    if (!due_date) {
      return res.status(400).json({
        status: "Failed",
        message: "Task status is required",
      });
    }

    const findTask = await Task.findByPk(id);
    if (!findTask) {
      return res.status(401).json({
        status: "Failed",
        message: "Task not found",
      });
    }

    await Task.update({ due_date: due_date }, { where: { id: id } });

    const updatedTask = await Task.findByPk(id);
    return res.status(200).json({
      status: "Success",
      message: "SubTask status updated successfully",
      updatedSubTask: updatedTask,
    });
  } catch (error) {
    console.error("Something is wrong", error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
});

router.put("/updatetaskstatus", async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id) {
      return res.status(400).json({
        status: "Failed",
        message: "Id is required",
      });
    }

    if (!status) {
      return res.status(400).json({
        status: "Failed",
        message: "Task status is required",
      });
    }

    const findTask = await Task.findByPk(id);
    if (!findTask) {
      return res.status(401).json({
        status: "Failed",
        message: "Task not found",
      });
    }

    await Task.update({ status: status }, { where: { id: id } });

    const updatedTask = await Task.findByPk(id);
    return res.status(200).json({
      status: "Success",
      message: "SubTask status updated successfully",
      updatedSubTask: updatedTask,
    });
  } catch (error) {
    console.error("Something is wrong", error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
});

router.delete("/deletetask", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        status: "Failed",
        message: "Task Id is required",
      });
    }

    const findTask = await Task.findByPk(id);
    if (!findTask) {
      return res.status(400).json({
        status: "Failed",
        message: "No Task found",
      });
    }

    await Task.destroy({ where: { id: id } });

    return res.status(200).json({
      status: "Success",
      message: "Task is deleted",
    });
  } catch (error) {
    console.error("Something is wrong", error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});


module.exports = router;
