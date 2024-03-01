const Task = require("../models/Task");
const { Op } = require("sequelize");

const updatePriorities = async () => {
  try {
    const tasksToUpdate = await Task.findAll({
      where: {
        due_date: {
          [Op.lte]: new Date(),
        },
        priority: {
          [Op.not]: 0,
        },
      },
    });

    for (const Task of tasksToUpdate) {
      const daysUntilDue = Math.ceil(
        (Task.due_date - new Date()) / (1000 * 60 * 60 * 24)
      );

      // Your priority update logic here
      if (daysUntilDue === 0) {
        Task.priority = 0;
      } else if (daysUntilDue <= 2) {
        Task.priority = 1;
      } else if (daysUntilDue <= 4) {
        Task.priority = 2;
      } else {
        Task.priority = 3;
      }

      await Task.save();
    }

    console.log("Task priorities updated successfully.");
  } catch (error) {
    console.error("Error updating task priorities:", error);
  }
};

module.exports = { updatePriorities };
