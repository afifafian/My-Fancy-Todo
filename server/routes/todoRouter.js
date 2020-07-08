const routes = require('express').Router();
const TodoController = require('../controllers/TodoController')
const {authentication, authorization} = require('../middleware/auth')

//ROUTING TODO
routes.get('/', authentication,TodoController.read)
routes.post('/', authentication, TodoController.addTodo)
routes.get('/:id', authentication,TodoController.getId)
routes.put('/:id', authentication, authorization, TodoController.edit)
routes.delete('/:id', authentication, authorization, TodoController.delete)

module.exports = routes