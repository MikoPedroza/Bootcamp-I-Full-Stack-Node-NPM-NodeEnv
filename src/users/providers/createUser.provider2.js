const User = require("../user.schema.js");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");


async function createUserProvider( req, res ) {
    const validatedUser = matchedData(req);

    try{
        const user = new User({
            firstName: validatedUser.firstName,
            lastName: validatedUser.lastName,
            email: validatedUser.email,
            password: validatedUser.password,
        });

        await user.save();
        delete user.password; // To not return the password to the user
        return res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
        errorLogger("Error creating a new user: ", req, error);
        return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
            reason: "Unable to process your request at the moment, please try later.",
        });
    }

    // const user = new User({
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     email: req.body.email,
    //     password: req.body.password,
    // });

    // return await user.save();
}

module.exports = createUserProvider;