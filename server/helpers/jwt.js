const jwt = require('jsonwebtoken')

function jwtSign(obj) {
    return jwt.sign(obj, process.env.SECRET)
}
function jwtVerify(token) {
    return jwt.verify(token, process.env.SECRET)
}

module.exports = {jwtSign, jwtVerify}