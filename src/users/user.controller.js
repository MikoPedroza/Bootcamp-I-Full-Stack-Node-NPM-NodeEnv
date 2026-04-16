const { StatusCodes } = require("http-status-codes");
const createUserProvider = require("./providers/createUser.provider.js");
const { response } = require("express");

async function handleCreateUser (req, res) {
    // res.send("Create user");

    // try{
    //     const user = await createUserProvider(req, res);
    //     res.status(StatusCodes.CREATED).json(user);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: error.message });
    // }

    return await createUserProvider(req, res);
}

module.exports = {handleCreateUser};