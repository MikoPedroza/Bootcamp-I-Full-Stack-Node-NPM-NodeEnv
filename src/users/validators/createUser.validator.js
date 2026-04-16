const {body, validationResult} = require("express-validator");

const createUserValidator = [
    body("firstName", "The first name is required and a string.")
        .notEmpty()
        .isString()
        .isLength({ max: 100 })
        .trim(),
    body("lastName", "The last name is required and a string.")
        .optional()
        .isString()
        .isLength({ max: 100 })
        .trim(),
    body("email", "A valid email is required.")
        .notEmpty()
        .isString()
        .trim(),
    body("password", "A valid password is required (Must include at least one number, one uppercase letter, one lowercase letter, and one special character).")
        .notEmpty()
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
        .isString()
        .isLength({ min: 8 }),

];

module.exports = createUserValidator;