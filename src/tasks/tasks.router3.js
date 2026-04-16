const express = require("express");

// import task controller
const tasksController = require("./task.controller.js");

/*Fire the router function*/
const tasksRouter = express.Router();

/* using middleware */
tasksRouter.get("/tasks", tasksController.handleGetTasks);

tasksRouter.post("/tasks", tasksController.handlePostTasks);

tasksRouter.patch("/tasks", tasksController.handlePatchTasks);

tasksRouter.delete("/tasks", tasksController.handleDeleteTasks);

// export the task router
module.exports = tasksRouter;