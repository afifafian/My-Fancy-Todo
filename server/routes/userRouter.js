const routes = require('express').Router();
const UserController = require('../controllers/UserController')

//ROUTING REGISTER & LOGIN USER
routes.post('/register', UserController.register)
routes.post('/login', UserController.login)
routes.post('/googleSignIn', UserController.googleLogin)

module.exports = routes