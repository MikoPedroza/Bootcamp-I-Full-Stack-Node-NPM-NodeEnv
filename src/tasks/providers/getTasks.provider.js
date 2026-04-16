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
        const totalTasks = await Task.countDocuments();
        const currentPage = query.page;
        const limit = query.limit;
        const order = query.order;

        const totalPages = Math.ceil(totalTasks/limit);
        const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
        const previousPage = currentPage === 1 ? 1 : currentPage - 1;

        const completedTasks = await Task.countDocuments({ status: "completed" });
        const todoTasks = await Task.countDocuments({ status: "todo" });
        const inProgressTasks = await Task.countDocuments({ status: "inProgress" });

        baseUrl = `${req.protocol}://${req.get("host")}${
            req.originalUrl.split("?")[0]}`;

        const tasks = await Task.find({
            status: { $in: ["todo", "inProgress"]},
            })
            .limit(limit)
            .skip(currentPage-1)
            .sort({
                createdAt: order === "asc" ? 1 : -1, // 1 = asc, -1 = desc
            })
        ;

        let finalResponse = {
            data: tasks,
            pagination: {
                meta: {
                    itemsPerPage: limit,
                    totalItems: totalTasks,
                    currentPage: currentPage,
                    totalPages: totalPages,

                    completedTasks,
                    todoTasks,
                    inProgressTasks,
                },
                links: {
                    first: `${baseUrl}/?limit=${limit}&page=${1}&order=${order}`,
                    last: `${baseUrl}/?limit=${limit}&page=${totalPages}&order=${order}`,
                    currentPage: `${baseUrl}/?limit=${limit}&page=${currentPage}&order=${order}`,
                    next: `${baseUrl}/?limit=${limit}&page=${nextPage}&order=${order}`,
                    previous: `${baseUrl}/?limit=${limit}&page=${previousPage}&order=${order}`,
                },
            },
        };

        // console.log("tasks: ");
        // console.log(tasks);
        // return res.status(StatusCodes.OK).json(tasks);
        return res.status(StatusCodes.OK).json(finalResponse);
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