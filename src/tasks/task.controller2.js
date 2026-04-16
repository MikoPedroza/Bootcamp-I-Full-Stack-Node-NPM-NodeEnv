const { StatusCodes, ReasonPhrases } = require("http-status-codes");

function handleGetTasks(req, res) {
    let response = [
        {
            "title" : "Title of the task GET",
            "date" : "2026-02-05T00:20:00.000Z",
            "description" : "Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.",
            "priority" : "normal",
            "status" : "todo"
        },
        {
            "title" : "Title of the task 2 GET",
            "date" : "2026-02-05T00:20:00.000Z",
            "description" : "Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.",
            "priority" : "normal",
            "status" : "todo"
        },
    ];
    // res.status(200).json(response);

    /* using http status codes package */
/*     res.status(StatusCodes.OK).json({
        status: "success",
        statusCode: StatusCodes.OK,
        message: ReasonPhrases.OK,
        data: response,
    }); */

    /* using response formater middleware */
    res.status(StatusCodes.OK).json(response);
    
    // res.send("GET tasks controller");
}

function handlePostTasks(req, res) {
    console.log(req.body);
    console.log(typeof req.body);
    res.send("POST tasks controller");
}
function handlePatchTasks(req, res) {
    res.send("PATH tasks controller");
}
function handleDeleteTasks(req, res) {
    res.send("DELETE tasks controller");
}

module.exports = { 
    handleGetTasks,
    handlePostTasks,
    handlePatchTasks,
    handleDeleteTasks
};    

