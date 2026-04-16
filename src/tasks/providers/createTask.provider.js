const Task = require("../task.schema.js");
/* for data sanitization */
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

const logger = require("../../helpers/winston.helper.js");


async function createTaskProvider( req, res ) {
    /* for data sanitization */
    const validatedResult = matchedData(req);
    // console.log(req.user);

    // const task = new Task(validatedResult);
    /* Get user from req since it's provided in the token */
    const task = new Task({...validatedResult, user: req.user.sub});

    // console.log(req.user);

    /* Before data sanitization */
    // const task = new Task({
    //     title: req.body.title,
    //     description: req.body.description,
    //     status: req.body.status,
    //     priority: req.body.priority,
    //     dueDate: req.body.dueDate,
    // });

    // return await task.save();


    try{
        await task.save();
        return res.status(StatusCodes.CREATED).json(task);
    } catch (error) {
        // console.log(error);
        /* Moved to use errorLogger helper */
        // logger.error('Error creating a new task: ${error.message}', {
        //     metadata: {
        //         // statusCode : error.code,
        //         errorCode : error.code,
        //         errorName : error.name,
        //         method : req.method,
        //         url : req.URL,
        //         body : req.body,
        //         error : error
        //     }
        // });

        // errorLogger('Error creating a new task: ${error.message}', req, error);
        errorLogger("Error creating a new task: ", req, error);
        return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
            reason: "Unable to process your request at the moment, please try later.",
        });
    }
}

module.exports = createTaskProvider;