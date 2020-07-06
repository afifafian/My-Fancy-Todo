const routes = require('express').Router();
const TodoController = require('../controllers/TodoController')

//ROUTING REGISTER & LOGIN USER
routes.get('/', TodoController.read)
routes.post('/', TodoController.addTodo)
routes.get('/:id', TodoController.getId)
routes.put('/:id', TodoController.edit)
routes.delete('/:id', TodoController.delete)

module.exports = routes