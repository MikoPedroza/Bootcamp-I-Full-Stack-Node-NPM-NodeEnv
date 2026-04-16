const express = require("express");
const { validationResult } = require("express-validator");
const authController = require("./auth.controller.js");
const loginValidator = require("./validators/login.validator.js");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const authRouter = express.Router();    

// authRouter.post("/login", authController.handleLogin);

/**
 * @swagger
 * 
 * /auth/login/:
 *  post:
 *      summary: User login
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          201:
 *              description: User login successfull
 *              content:
 *                  application/json:
 *                      example:
 *                          status: success
 *                          statusCode: 200
 *                          message: Ok
 *                          data:
 *                              accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
 * 
 */
authRouter.post("/login", loginValidator, (req, res) => {
        const result = validationResult(req);
        console.log(result);
        if(result.isEmpty()){
            return authController.handleLogin(req, res);
        } else {
            res.status(StatusCodes.BAD_REQUEST).json(result.array());
        }
    }
);

module.exports = authRouter;

/** 
 * @swagger
 * 
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  description: A vald email address of the user
 *              password:
 *                  type: string
 *                  description: The password of the used. ( Must contain 8 characters, with a number, a capital letter, and a special character)
 *                  minLength: 8
 *          example:
 *              email: JohnDoe@example.com
 *              password: password123#
 * */

