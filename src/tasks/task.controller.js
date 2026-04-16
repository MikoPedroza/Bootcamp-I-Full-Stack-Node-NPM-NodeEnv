const { StatusCodes, ReasonPhrases } = require("http-status-codes");
// const Task = require("./task.schema.js"); // using taskProvider instead
const createTaskProvider = require("./providers/createTask.provider.js");
const getTaskProvider = require("./providers/getTasks.provider.js");
const updateTaskProvider = require("./providers/updateTask.provider.js");
const deleteTaskProviderTaskProvider = require("./providers/deleteTask.provider.js");
const { response } = require("express");


async function handleGetTasks(req, res) {
    // let response = [
    //     {
    //         "title" : "Title of the task GET",
    //         "date" : "2026-02-05T00:20:00.000Z",
    //         "description" : "Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.",
    //         "priority" : "normal",
    //         "status" : "todo"
    //     },
    //     {
    //         "title" : "Title of the task 2 GET",
    //         "date" : "2026-02-05T00:20:00.000Z",
    //         "description" : "Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.",
    //         "priority" : "normal",
    //         "status" : "todo"
    //     },
    // ];
    // res.status(200).json(response);

    /* using http status codes package */
    // res.status(StatusCodes.OK).json({
    //     status: "success",
    //     statusCode: StatusCodes.OK,
    //     message: ReasonPhrases.OK,
    //     data: response,
    // });

    /* using response formater middleware */
    // res.status(StatusCodes.OK).json(response);

    // res.send("GET tasks controller");

    /* Before validation */
    // const tasks = await getTaskProvider(req, res);
    // res.status(StatusCodes.OK).json(tasks);

    return await getTaskProvider(req, res);
}

/* added async */
async function handlePostTasks(req, res) {
    // console.log(req.body);
    // console.log(typeof req.body);
    // res.send("POST tasks controller");

    /* using mongoose schema */
    /* Moved to task provider */
    // const task = new Task({
    //     title: req.body.title,
    //     description: req.body.description,
    //     status: req.body.status,
    //     priority: req.body.priority,
    //     dueDate: req.body.dueDate,
    // });

    /* await since this is an async function */
    // await task.save();

    /* moved handling to the provider for error detection */
    // const task = await createTaskProvider(req, res);
    // res.status(StatusCodes.CREATED).json(task);

    return await createTaskProvider(req, res);
}

async function handlePatchTasks(req, res) {
    // res.send("PATH tasks controller");

    /* Before data sanitization */
    // try {
    //     console.log(req.body);

    //     const updatedTask = await updateTaskProvider(req, res);
    //     res.status(StatusCodes.OK).json(updatedTask);

    //     await task.save();

    //     res.status(StatusCodes.OK).json(updatedTask);

    // } catch (error) {
    //     console.error(error); // 👈 VERY IMPORTANT
    //     res.status(500).json({ error: error.message });
    // }

    /* moved handling to the provider for error detection */
    return await updateTaskProvider(req, res);
}

async function handleDeleteTasks(req, res) {
    // res.send("DELETE tasks controller");

    // try{
    //     const deletedTask = await deleteTaskProviderTaskProvider(req, res);
    //     res.status(StatusCodes.OK).json(deletedTask);
    // } catch (error) {
    //     console.error(error); // 👈 VERY IMPORTANT
    //     res.status(500).json({ error: error.message });
    // }

    return await deleteTaskProviderTaskProvider(req, res);
}

module.exports = { 
    handleGetTasks,
    handlePostTasks,
    handlePatchTasks,
    handleDeleteTasks
};    

