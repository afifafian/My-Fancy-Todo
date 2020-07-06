"use strict"

const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    static register (req, res) {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
        .then(function(data){
            return res.status(201).json(data)
        })
        .catch(function(err){
            return res.status(500).json({message: err})
        })
    }
    static login (req, res) {
        const email = req.body.email
        const password = req.body.password
        User.findOne({
            where: {email}
        })
        .then(function(data){
            if(!data) {
                return res.status(404).json({message: 'Email not found!'})
            } else {
                if (bcrypt.compareSync(password, data.password)) {
                    const token = jwt.sign
                    (
                        {
                            id: data.id,
                            email: data.email
                        },
                        "jwtScret"
                    )
                    return res.status(200).json({access_token: token})
                } else {
                    return res.status(400).json({message: 'Incorrect Email or Password!'})
                }
            }
        })
        .catch(function(err){
            return res.status(500).json({message: err})
        })

    }   
}

module.exports = UserController