const {body, validationResult} = require("express-validator");

const updateTaskValidator = [
    body("_id", "A valid document id required.").notEmpty().isMongoId(),
    body("title","The title must be a string.").optional().isString().trim(),
    body("title","The length cannot be more than 100 characters.").isLength({ max: 100 }),
    body("dueDate", "Due date needs to be valid ISO8601 date string.")
        .optional()
        .isISO8601(),
    body(
        "description",
        "The description cannot be empty and needs to be a string."
    )
        .optional()
        .isString()
        .trim(),
    body(
        "description",
        "The description cannot be more than 500 characters."
    ).optional().isLength({ max : 500}),
    body("priority").optional().isIn(["low", "normal", "high"]),
    // body("status").optional().isIn(["Todo", "InProgress", "Completed"]),
    body("status").optional().isIn(["todo", "inProgress", "completed"])
];

module.exports = updateTaskValidator;