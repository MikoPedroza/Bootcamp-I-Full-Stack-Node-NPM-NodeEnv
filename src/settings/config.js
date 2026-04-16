const fs = require("fs"); // file system api to use with morgan write to a file
const path = require("path"); // path api
const cors = require("cors");
const morgan = require("morgan"); // activity logging
const {StatusCodes} = require("http-status-codes");
const expressWinstonLogger = require("../middleware/expressWinston.middleware.js");
const tasksRouter = require("../tasks/tasks.router.js");
const authRouter = require("../auth/auth.router.js");
const usersRouter = require("../users/users.route.js");
const responseFormatter = require("../middleware/responseFormatter.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger.config.js");



function configureApp(app){
    app.use(cors());

    let accessLogStream = fs.createWriteStream(
        path.join(__dirname, "../", "access.log"),
        {
            flags: "a", // flags: "a" appends to the file
        } 
    );
    app.use(morgan("combined", { stream: accessLogStream }));
    app.use(responseFormatter);
    app.use(expressWinstonLogger);

    /* define routes */
    app.use("/", tasksRouter);
    app.use("/auth", authRouter);
    app.use("/users", usersRouter);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

    app.use( (req, res)=> {
        res.status(StatusCodes.NOT_FOUND).json(null);
    });

}

module.exports = configureApp;