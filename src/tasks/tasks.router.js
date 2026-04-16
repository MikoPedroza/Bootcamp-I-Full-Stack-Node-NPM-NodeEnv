const express = require("express");
const {body, validationResult} = require("express-validator");
const createTaskValidator = require("./validators/createTask.validator.js");
const getTasksValidator = require("./validators/getTasks.validator.js");
const updateTaskValidator = require("./validators/updateTask.validator.js");
const deleteTaskValidator = require("./validators/deleteTask.validator.js");
const authenticateToken = require("../middleware/authenticateToken.middleware.js");

// import task controller
const tasksController = require("./task.controller.js");
const { StatusCodes } = require("http-status-codes");

/*Fire the router function*/
const tasksRouter = express.Router();

/* using middleware */
// tasksRouter.get("/tasks", tasksController.handleGetTasks);
// tasksRouter.get("/tasks", getTasksValidator, (req, res) => {

/**
 * @swagger
 * 
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 * /tasks:
 *  get:
 *      summary: Get tasks information
 *      tags: [Tasks]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: limit
 *            schema:
 *                  type: integer
 *                  default: 10
 *            description: The number of tasks needed in a single response
 *          - in: query
 *            name: page
 *            schema:
 *                  type: integer
 *                  default: 1
 *            description: The page number of task response
 *          - in: query
 *            name: order
 *            schema:
 *                  type: string
 *                  default: asc
 *                  enum: ['asc', 'dsc']
 *            description: The oder number of tasks
 * 
 *      responses:
 *          200:
 *              description: Task retreived successfully
 *              content:
 *                  application/json:
 *                      example:
 *                          status: success
 *                          statusCode: 200
 *                          message: Ok
 *                          data:
 *                              -           _id: 69a1c583fcdfd5cbc62c0ff8
 *                                          title: Create a new video
 *                                          description: A video about fullstack web development
 *                                          status: Todo
 *                                          priority: normal
 *                                          dueDate: 2026-03-30T18:18:34.000Z
 *          401:
 *              description: Not authorized error
 *              content:
 *                  application/json:
 *                      example:
 *                          status: error
 *                          statusCode: 401
 *                          message: Unauthorized
 *                          error:
 *                              message: You are not authorized to perform this request
 *          403:
 *              description: Forbidden error
 *              content:
 *                  application/json:
 *                      example:
 *                          status: error
 *                          statusCode: 403
 *                          message: Forbidden
 *                          error:
 *                              message: Please login again, invalid token
 * 
 */
tasksRouter.get("/tasks", [getTasksValidator, authenticateToken], (req, res) => {
    const result = validationResult(req);
    // console.log("result: ");
    // console.log(result);
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
// tasksRouter.post("/tasks", createTaskValidator, (req, res) => {

/**
 * @swagger
 * 
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 * /tasks:
 *  post:
 *      summary: Create a new task
 *      tags: [Tasks]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Task'
 *      responses:
 *          201:
 *              description: Task created successfully
 *              content:
 *                  application/json:
 *                      example:
 *                          status: success
 *                          statusCode: 201
 *                          message: Created
 *                          data:
 *                              _id: 69a1c583fcdfd5cbc62c0ff8
 *                              title: Create a new video
 *                              description: A video about fullstack web development
 *                              status: Todo
 *                              priority: normal
 *                              dueDate: 2026-03-30T18:18:34.000Z
 *          401:
 *              description: Not authorized error
 *              content:
 *                  application/json:
 *                      example:
 *                          status: error
 *                          statusCode: 401
 *                          message: Unauthorized
 *                          error:
 *                              message: You are not authorized to perform this request
 *          403:
 *              description: Forbidden error
 *              content:
 *                  application/json:
 *                      example:
 *                          status: error
 *                          statusCode: 403
 *                          message: Forbidden
 *                          error:
 *                              message: Please login again, invalid token
 * 
 */
tasksRouter.post("/tasks", [createTaskValidator, authenticateToken], (req, res) => {
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
// tasksRouter.patch("/tasks", updateTaskValidator, (req, res) => {

/**
 * @swagger
 * 
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 * /tasks:
 *  patch:
 *      summary: Update a task
 *      tags: [Tasks]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TaskUpdate'
 *      responses:
 *          200:
 *              description: Task updated successfully
 *              content:
 *                  application/json:
 *                      example:
 *                          status: success
 *                          statusCode: 200
 *                          message: Ok
 *                          data:
 *                              _id: 69a1c583fcdfd5cbc62c0ff8
 *                              title: Create a new video
 *                              description: A video about fullstack web development
 *                              status: Todo
 *                              priority: normal
 *                              dueDate: 2026-03-30T18:18:34.000Z
 *          401:
 *              description: Not authorized error
 *              content:
 *                  application/json:
 *                      example:
 *                          status: error
 *                          statusCode: 401
 *                          message: Unauthorized
 *                          error:
 *                              message: You are not authorized to perform this request
 *          403:
 *              description: Forbidden error
 *              content:
 *                  application/json:
 *                      example:
 *                          status: error
 *                          statusCode: 403
 *                          message: Forbidden
 *                          error:
 *                              message: Please login again, invalid token
 * 
 */
tasksRouter.patch("/tasks", [updateTaskValidator, authenticateToken], (req, res) => {
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
// tasksRouter.delete("/tasks", deleteTaskValidator, (req, res) => {

/**
 * @swagger
 * 
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 * /tasks:
 *  delete:
 *      summary: Delet a task
 *      tags: [Tasks]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TaskDelete'
 *      responses:
 *          200:
 *              description: Task delete successfully
 *              content:
 *                  application/json:
 *                      example:
 *                          status: success
 *                          statusCode: 200
 *                          message: Ok
 *                          data:
 *                              acknowledged: true
 *                              deletedCount: 1 
 *          401:
 *              description: Not authorized error
 *              content:
 *                  application/json:
 *                      example:
 *                          status: error
 *                          statusCode: 401
 *                          message: Unauthorized
 *                          error:
 *                              message: You are not authorized to perform this request
 *          403:
 *              description: Forbidden error
 *              content:
 *                  application/json:
 *                      example:
 *                          status: error
 *                          statusCode: 403
 *                          message: Forbidden
 *                          error:
 *                              message: Please login again, invalid token
 * 
 */
tasksRouter.delete("/tasks", [deleteTaskValidator, authenticateToken], (req, res) => {
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