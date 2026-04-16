const Task = require("../task.schema.js");
/* Adding validation and logging */
const { matchedData} = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");


async function getTasksProvider( req, res ){
    /* Adding validation and logging */
    const query = matchedData(req);
    console.log("query: ");
    console.log(query);
    try{
        const tasks = await Task.find();
        console.log("tasks: ");
        console.log(tasks);
        return res.status(StatusCodes.OK).json(tasks);
    } catch (error) {
        errorLogger("Error while fetching the tasks ", req, error);
        return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
            reason: "Unable to process your request at the moment, please try again later.",
        })
    }

    /* Before adding validation */
    // return await Task.find();
}

module.exports = getTasksProvider;