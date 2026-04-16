const express = require("express"); // acts as a function

const tasksRouter = require("./tasks/tasks.router.js");

const app = express(); // creates app object
const port = 3001; // 0 - 65,535 / http://localhost:3001

const middleware = function (req, res, next){
    req.info = {appname: "Tasks Manager", author: "Cloudaffle"};
    next();
};

app.use(middleware);

/* define routes */
app.use("/", tasksRouter);




app.listen(port, ()=>{
    console.log(`App listening on port no: ${port}`);
}); // listen to the port



