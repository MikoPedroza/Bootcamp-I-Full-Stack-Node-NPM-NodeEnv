const express = require("express");

/*Fire the router function*/
const tasksRouter = express.Router();

/* using middleware */
tasksRouter.get("/tasks", (req, res)=> {
    return res.send("Hello World");
});

tasksRouter.post("/tasks", (req, res) => {
    // Body will be undefined without middleware
    console.log(req.body);
    console.log(typeof req.body);
    return res.send("Create a new task")
});

// export the task router
module.exports = tasksRouter;