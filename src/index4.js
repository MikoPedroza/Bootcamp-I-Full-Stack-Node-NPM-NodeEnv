const express = require("express"); // acts as a function
const morgan = require("morgan"); // activity logging
const fs = require("fs"); // file system api to use with morgan write to a file
const path = require("path"); // path api
const cors = require("cors");

const response = require("./middleware/responseFormatter.js");
const {StatusCodes} = require("http-status-codes");
const tasksRouter = require("./tasks/tasks.router.js");
const authRouter = require("./auth/auth.router.js");
const usersRouter = require("./users/users.route.js");

const responseFormatter = require("./middleware/responseFormatter.js");

const app = express();
const port = 3001;

//  Parsing request body
app.use(express.json());

/* option to restrict origins */
/* const corsOptions = {
    origin: ["example.com", "example2.com"],
} 
app.use(cors(corsOptions)); */

app.use(cors()); // allow origins during development

// console.log(path.join(__dirname));
let accessLogStream = fs.createWriteStream(
    path.join(__dirname, "../", "access.log"),
    {
        flags: "a", // flags: "a" appends to the file
    } 
);

app.use(morgan("combined", { stream: accessLogStream }));
app.use(responseFormatter);

/* define routes */
app.use("/", tasksRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);

/* for 404 not found -> always after all routes */
app.use( (req, res)=> {
    res.status(StatusCodes.NOT_FOUND).json(null);
});


app.listen(port, ()=>{
    console.log(`App listening on port no: ${port}`);
}); // listen to the port



