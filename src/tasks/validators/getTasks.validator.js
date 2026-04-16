const { query } = require("express-validator");


const getTasksValidator = [
    // query("limit", "Limit must be a valid integer")
    //     .optional().isInt().toInt(),
    // query("page", "Page must be a valid integer")
    //     .optional().isInt().toInt(),
    // query("order", "Order must be one of  ['asc', 'dsc']")
    //     .optional()
    //     .isIn(["asc", "dsc"]),
    query("limit", "Limit must be a valid integer")
        .optional().isInt().toInt({ min : 1}),
    query("limit").customSanitizer((value, { req }) => {
        return value ? value : 5;
    }),
    query("page",)
        .optional().isInt().toInt({ min : 1}),
    query("limit").customSanitizer((value, { req }) => {
        return value ? value : 1;
    }),
    query("order", "Order must be one of  ['asc', 'dsc']")
        .optional()
        .isIn(["asc", "dsc"]),
    query("order").customSanitizer((value, { req }) => {
        return value ? value : "asc";
    }),
];

module.exports = getTasksValidator;