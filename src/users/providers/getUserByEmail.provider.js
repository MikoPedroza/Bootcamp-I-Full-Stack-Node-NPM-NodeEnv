const User = require("../user.schema.js");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");
const { logger } = require("express-winston");

async function getUserByEmail( email ){
    try{
        const user = await User.findOne({ email: email });

        return user;
    } catch(error){
        return error;
    }
}

module.exports = getUserByEmail;