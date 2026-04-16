const {body, validationResult} = require("express-validator");

const loginValidator = [
    body("email", "Enter a valid email.")
        .notEmpty()
        .isString()
        .trim(),
    body("password", "A valid password is required (Must include at least one number, one uppercase letter, one lowercase letter, and one special character).")
        .notEmpty()
        .isString()
        .isLength({ min: 8 }),
];

module.exports = loginValidator;