const express = require("express");
const {body, validationResult} = require("express-validator");
const createTaskValidator = require("./validators/createTask.validator.js");
const getTasksValidator = require("./validators/getTasks.validator.js");
const updateTaskValidator = require("./validators/updateTask.validator.js");
const deleteTaskValidator = require("./validators/deleteTask.validator.js");

// import task controller
const tasksController = require("./task.controller.js");
const { StatusCodes } = require("http-status-codes");

/*Fire the router function*/
const tasksRouter = express.Router();

/* using middleware */
// tasksRouter.get("/tasks", tasksController.handleGetTasks);
tasksRouter.get("/tasks", getTasksValidator, (req, res) => {
    const result = validationResult(req);
    console.log("result: ");
    console.log(result);
    if(result.isEmpty()){
        return tasksController.handleGetTasks(req, res);
    } else {
        res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});

/* Basic use of validators */
// tasksRouter.post("/tasks", [
//         body("title", "The title cannot be empty.").notEmpty(),
//         body("title", "The title must be a string.").isString(),
//         body("dueDate", "Due date is invalid.").notEmpty().isISO8601(),
//     ], 
//     (req, res) => {
//         const result = validationResult(req);
//         console.log(result);
//         if(result.isEmpty()){
//             return tasksController.handlePostTasks(req, res);
//         } else {
//             res.status(StatusCodes.BAD_REQUEST).json(result.array());
//         }
//     }
// );
tasksRouter.post("/tasks", createTaskValidator, (req, res) => {
        const result = validationResult(req);
        console.log(result);
        if(result.isEmpty()){
            return tasksController.handlePostTasks(req, res);
        } else {
            res.status(StatusCodes.BAD_REQUEST).json(result.array());
        }
    }
);


// tasksRouter.patch("/tasks", tasksController.handlePatchTasks);
tasksRouter.patch("/tasks", updateTaskValidator, (req, res) => {
        const result = validationResult(req);
        console.log(result);
        if(result.isEmpty()){
            return tasksController.handlePatchTasks(req, res);
        } else {
            res.status(StatusCodes.BAD_REQUEST).json(result.array());
        }
    }
);

// tasksRouter.delete("/tasks", tasksController.handleDeleteTasks);
tasksRouter.delete("/tasks", deleteTaskValidator, (req, res) => {
        const result = validationResult(req);
        console.log(result);
        if(result.isEmpty()){
            return tasksController.handleDeleteTasks(req, res);
        } else {
            res.status(StatusCodes.BAD_REQUEST).json(result.array());
        }
    }
);

// export the task router
module.exports = tasksRouter;