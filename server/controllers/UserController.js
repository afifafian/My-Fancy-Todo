"use strict"

const {User} = require('../models')
const bcrypt = require('bcrypt')
const {jwtSign,jwtVerify} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const sendEmail = require('../helpers/mailgun')

class UserController {
    static register (req, res, next) {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
        .then(function(data){
            let subject = `Successfully Registered to Fancy Todo!`
            let text = `Welcome ${data.email} to Fancy Todo App!\nNow let's create your own todo list to be more fancy than ever!\nHave a good day!\n\nCheers,\nFancy Todo App Team.`
            sendEmail(data.email, subject, text)
            return res.status(201).json(data)
        })
        .catch(function(err){
            next(err)
        })
    }
    static login (req, res, next) {
        const email = req.body.email
        const password = req.body.password
        User.findOne({
            where: {email}
        })
        .then(function(data){
            if(!data) {
                throw {
                    name: "Validation_error",
                    statusCode: 404,
                    message: 'Email not found!'
                }
            } else {
                if (bcrypt.compareSync(password, data.password)) {
                    const token = jwtSign(
                        { id: data.id, email: data.email}
                    )
                    return res.status(200).json({access_token: token})
                } else {
                    return res.status(400).json({message: 'Incorrect Email or Password!'})
                }
            }
        })
        .catch(function(err){
            // console.log(err)
            next(err)
        })
    }
    static googleLogin (req,res, next) {
        const id_token = req.body.id_token
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let payload;
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
        .then(function(ticket){
            payload = ticket.getPayload();
            const userid = payload['sub'];
            return User.findOne({
                where: 
                {email: payload["email"]}
            })
        })
        .then(function(user){
            if(user) {
                return user
            } else {
                let dataUser = {
                    name: payload['name'],
                    email: payload['email'],
                    password: "password123"
                }
                return User.create(dataUser)
            }
        })
        .then(function(data){
            console.log(data)
            const token = jwtSign({ id: data.id, email: data.email})
            return res.status(200).json({access_token: token})
        })
        .catch(function(err){
            next(err)
        })
    }
}

module.exports = UserController