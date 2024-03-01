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

router.get("/subtask/:taskID", async (req, res) => {
  try {
    const { taskID } = req.params;

    if (!taskID) {
      return res.status(400).json({
        status: "Failed",
        message: "Task ID is required",
      });
    }

    const findSubTasks = await SubTask.findAll({ where: { task_id: taskID } });
    if (findSubTasks.length === 0) {
      return res.status(400).json({
        status: "Failed",
        message: `No subtasks found with task id ${taskID}`,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Sub Tasks found successfully",
      subtask: findSubTasks,
    });
  } catch (error) {
    console.error("Something is wrong", error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

router.put("/updatestatus", async (req, res) => {
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
        message: "Sub Task status is required",
      });
    }

    const findSubTask = await SubTask.findByPk(id);
    if (!findSubTask) {
      return res.status(401).json({
        status: "Failed",
        message: "SubTask not found",
      });
    }

    await SubTask.update({ status: status }, { where: { id: id } });

    const updatedSubTask = await SubTask.findByPk(id);
    return res.status(200).json({
      status: "Success",
      message: "SubTask status updated successfully",
      updatedSubTask: updatedSubTask,
    });
  } catch (error) {
    console.error("Something is wrong", error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
});

router.delete("/deletesubtask", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        status: "Failed",
        message: "Sub Task Id is required",
      });
    }

    const findSubTask = await SubTask.findByPk(id);
    if (!findSubTask) {
      return res.status(400).json({
        status: "Failed",
        message: "No Sub Task found",
      });
    }

    const findAllSubTasks = await SubTask.findAll();

    return res.status(200).json({
      status: "Success",
      message: "Sub Task is deleted",
      allSubTasks: findAllSubTasks,
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
