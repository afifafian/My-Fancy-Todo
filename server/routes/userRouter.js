const routes = require('express').Router();
const UserController = require('../controllers/UserController')

//ROUTING REGISTER & LOGIN USER
routes.post('/register', UserController.register)
routes.post('/login', UserController.login)

module.exports = routes