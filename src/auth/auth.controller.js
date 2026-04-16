const loginProvider = require("./providers/login.provider.js");

async function handleLogin(req, res){
    // res.send("Login");

    console.log("handleLogin");
    return await loginProvider(req, res);
}

module.exports = {handleLogin};