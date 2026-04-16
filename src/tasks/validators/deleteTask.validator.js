const { body } = require("express-validator");

const deleteTaskValidator = [
    body("_id", "A valid document id required.").notEmpty().isMongoId(),
];

module.exports = deleteTaskValidator;