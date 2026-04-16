const {body, validationResult} = require("express-validator");

const createTaskValidator = [
    body("title", "The title cannot be empty.").notEmpty(),
    body("title", "The title must be a string.").isString(),
    body("title", "The title cannot be more than 100 characters")
        .isLength({max: 100}),
    body("tilte").trim(),
    body("dueDate", "Due date needs to be valid ISO8601 date string.")
        .notEmpty()
        .isISO8601(),
    body(
        "description",
        "The description cannot be empty and needs to be a string."
    )
        .notEmpty()
        .isString()
        .trim(),
    body(
        "description",
        "The description cannot be more than 500 characters."
    ).isLength({ max : 500}),
    body("priority").isIn(["low", "normal", "high"]),
    // body("status").isIn(["Todo", "InProgress", "Completed"]),
    body("status").isIn(["todo", "inProgress", "completed"]),
    /* no longer needed when already authenticated with token */
    // body("user").notEmpty().isMongoId(),
];

module.exports = createTaskValidator;