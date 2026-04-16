const { Schema, model} = require("mongoose");

const emailRegexChatgpt = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emailRegexUdemy = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "The first name is required"],
        trim: true,
        maxLenth: [100, "First name cannot be more than 100 characters."],
    },
    lastName: {
        type: String,
        required: false,
        trim: true,
        maxLenth: [100, "Last name cannot be more than 100 characters."],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (email) {
                return emailRegexUdemy.test(email);
            },
            message: () => 'Please enter a valid email address.',
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        /* no need to validate after hashing since it is already a long string when received */
        // minLength: [8, "Password cannot be less then 8 characters."],
        // validate: {
        //     validator: function (password) {
        //         return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
        //     },
        //     message: () => "Password must include at least one number, one uppercase letter, one lowercase letter, and one special character.",
        // }
    },
})

const User = model("User", userSchema);

module.exports = User;

/** 
 * @swagger
 * 
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - firstName
 *              - email
 *              - password
 *          properties:
 *              firstName:
 *                  type: string
 *                  description: The first name of the user
 *                  maxLength: 100
 *              lastname:
 *                  type: string
 *                  description: The last name of the user
 *                  maxLength: 100
 *              email:
 *                  type: string
 *                  description: A vald email address of the user
 *              password:
 *                  type: string
 *                  description: The password of the used. ( Must contain 8 characters, with a number, a capital letter, and a special character)
 *                  minLength: 8
 *          example:
 *              firstName: John
 *              lastname: Doe
 *              email: JohnDoe@example.com
 *              password: password123#
 * */