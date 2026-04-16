const {Schema, model} = require("mongoose");

const taskSchema = new Schema({
        title: {
            type: String,
            required: [true, "Task title is required."],
            trim: true,
            maxLength: [100, "Title cannot be more than 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Task description is required."],
            trim: true,
            maxLength: [500, "Description cannot be more then 500 characters"],
        },
        status: {
            type: String,
            required: [true, "Task status is required."],
            // enum: [ "Todo", "In Progress", "Completed"],
            enum: [ "todo", "inProgress", "completed"],
            default: "todo",
        },
        priority: {
            type: String,
            required: [true, "Task priority is required."],
            enum: [ "low", "normal", "high"],
            default: "normal",
        },
        dueDate: {
            type: Date,
            required: [true, "Task due date is required."],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        // adding relationship with users schema
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User Id is required."],
        },
        
    }, 
    // { timestamps: true }
    { timestamps: true, versionKey: false }
);

const Task = model("Task", taskSchema);

module.exports = Task;

/** 
 * @swagger
 * 
 * components:
 *  schemas:
 *      Task:
 *          type: object
 *          required:
 *              - title
 *              - description
 *              - status
 *              - priority
 *              - dueDate
 *          properties:
 *              title:
 *                  type: string
 *                  description: The title of the task that is to be created
 *                  maxLength: 100
 *              description:
 *                  type: string
 *                  description: The description of the task
 *                  maxLength: 500
 *              status:
 *                  type: string
 *                  description: The status of the task
 *                  enum: [ "todo", "inProgress", "completed"]
 *              priority:
 *                  type: string
 *                  description: The priority of the task
 *                  enum: [ "low", "normal", "high"]
 *              dueDate:
 *                  type: string
 *                  format: ISO8601 Date string
 *                  description: The due date for the task
 *          example:
 *              title: Create a new video
 *              description: A video about fullstack web development
 *              status: Todo
 *              priority: normal
 *              dueDate: 2026-03-30T18:18:34.000Z
 * */

/** 
 * @swagger
 * 
 * components:
 *  schemas:
 *      TaskUpdate:
 *          type: object
 *          required:
 *              - _id
 *          properties:
 *              _id:
 *                  type: string
 *                  desciption: The mongoDB object Id of the task
 *                  format: ObjectId
 *              title:
 *                  type: string
 *                  description: The title of the task that is to be created
 *                  maxLength: 100
 *              description:
 *                  type: string
 *                  description: The description of the task
 *                  maxLength: 500
 *              status:
 *                  type: string
 *                  description: The status of the task
 *                  enum: [ "Todo", "In Progress", "Completed"]
 *              priority:
 *                  type: string
 *                  description: The priority of the task
 *                  enum: [ "low", "normal", "high"]
 *              dueDate:
 *                  type: string
 *                  format: ISO8601 Date string
 *                  description: The due date for the task
 *          example:
 *              _id: 69a1c583fcdfd5cbc62c0ff8
 *              title: Create a new video
 *              description: A video about fullstack web development
 *              status: Todo
 *              priority: normal
 *              dueDate: 2026-03-30T18:18:34.000Z
 * */

/** 
 * @swagger
 * 
 * components:
 *  schemas:
 *      TaskDelete:
 *          type: object
 *          required:
 *              - _id
 *          properties:
 *              _id:
 *                  type: string
 *                  desciption: The mongoDB object Id of the task
 *                  format: ObjectId
 *          example:
 *              _id: 69a1c583fcdfd5cbc62c0ff8
 * */