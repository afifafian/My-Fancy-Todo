const routes = require('express').Router();
const todoRouter = require('./todoRouter');
const userRouter = require('./userRouter');

routes.use('/todos', todoRouter);
routes.use('/users', userRouter);

module.exports = routes;