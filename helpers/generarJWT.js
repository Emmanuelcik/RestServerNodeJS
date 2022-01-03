const jwt = require("jsonwebtoken");

function generarJWT (uid = "") {

    return new Promise((resolve, reject) => {
        const payload = {uid};

        jwt.sign
    })
}

module.exports = {
    generarJWT,
}