"use strict"

const {jwtVerify} = require('../helpers/jwt')
const {User, Todo} = require('../models')

function authentication (req, res, next){
    const access_token = req.headers.access_token

    if (!access_token) {
        throw {
            name: "Validation_error",
            statusCode: 404,
            message: `Token is not found!`
        }
    } else {
        const userData = jwtVerify(access_token)
        req.userData = userData
        User.findOne({
            where: {email: userData.email}
        })
        .then(function(data){
            if (data) {
                next()
            } else {
                throw {
                    name: "Validation_error",
                    statusCode: 401,
                    message: `Please Login First!`
                }
            }
        })
        .catch(function(err){
            // console.log(err)
            next(err)
        })
    }
}

function authorization (req, res, next) {
    const id = req.params.id
    Todo.findOne({where: {id}})
    .then(function(data){
        if (data) {
            if (data.UserId === req.userData.id) {
                next()
            } else {
                throw {
                    name: "Validation_error",
                    statusCode: 403,
                    message: 'Forbidden Access!'
                }
            }
        } else {
            throw {
                name: "Validation_error",
                statusCode: 404,
                message: 'Book not found!'
            }
        }
    })
    .catch(function(err){
        next(err)
    })
}

module.exports = {authentication, authorization}