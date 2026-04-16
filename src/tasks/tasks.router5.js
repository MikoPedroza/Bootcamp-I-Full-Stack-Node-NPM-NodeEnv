const express = require("express");

const tasksRouter = express.Router();

// tasksRouter.get("/tasks", (req, res)=> res.send("All tasks"));

/* using middleware */
tasksRouter.get("/tasks", (req, res)=> {
    console.log(req.info);
    return res.send(req.info);
});

tasksRouter.post("/tasks", (req, res)=> res.send("Create a new task"));

module.exports = tasksRouter;