const express = require("express");
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const usersController = require("./user.controller.js");
const createUserValidator = require("./validators/createUser.validator.js");

const usersRouter = express.Router();

// usersRouter.post("/create", usersController.handleCreateUser);


/**
 * @swagger
 * 
 * /users/create/:
 *  post:
 *      summary: Create a new user
 *      tags: [User]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: User created successfully
 *              content:
 *                  application/json:
 *                      example:
 *                          status: success
 *                          statusCode: 201
 *                          message: Created
 *                          data:
 *                              _id: 69a1c583fcdfd5cbc62c0ff8
 *                              firstName: John
 *                              lastname: Doe
 *                              email: JohnDoe@example.com
 * 
 */
usersRouter.post("/create", createUserValidator, (req, res) => {
    const result = validationResult(req);
    
    // console.log(result);
    if(result.isEmpty()){
        return usersController.handleCreateUser(req, res);
    } else {
        res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});

module.exports = usersRouter;