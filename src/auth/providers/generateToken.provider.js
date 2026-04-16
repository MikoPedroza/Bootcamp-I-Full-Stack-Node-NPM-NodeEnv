const jwt = require("jsonwebtoken");

function generateTokenProvider( user ) {

    // console.log(user["_id"]);
    // console.log(user.email);
    // console.log(Math.floor(Date.now()/1000));
    // console.log(Math.floor(Date.now()/1000) + parseInt( process.env.JWT_ACCESS_EXPIRATION_TTL));

    const payload = {
        sub: user["_id"],
        email: user.email,
        iat: Math.floor(Date.now()/1000) ,// in epoch time, /1000 to convert to secs form ms
        exp: Math.floor(Date.now()/1000) + parseInt( process.env.JWT_ACCESS_EXPIRATION_TTL),
    };
    console.log("return generateTokenProvider");
    return jwt.sign( payload, process.env.JWT_SECRET);
}

module.exports = generateTokenProvider;