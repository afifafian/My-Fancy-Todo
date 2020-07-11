"use strict"

const {Todo} = require('../models')
const getQRCode = require('../helpers/qrcode')

class TodoController {
    static addTodo (req,res, next) {
        let todo;
        const userId = req.userData.id
        let newTodo =  {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: userId
        }
        Todo.create(newTodo)
        .then(function(data){
            todo = data
            const qrCode = getQRCode(data)
            return qrCode
        })
        .then(function(resultQR){
            return res.status(201).json({resultQR ,todo})
        })
        .catch(function(err){
            next(err)
        })
    }
    static read (req, res, next) {
        const id = req.userData.id
        Todo.findAll({
            where: {UserId: id},
            order:[['id', 'ASC']]
        })
        .then(function(data){
            return res.status(200).json(data)
        })
        .catch(function(err){
            console.log(err)
            next(err)
        })
    }
    static getId (req, res, next) {
        const id = +req.params.id
        Todo.findByPk(id)
        .then(function(data){
            if (!data) {
                throw {
                    name: "Validation_error",
                    statusCode: 404,
                    message: `Todo with ID: ${id} is not found!`
                }
            } else {
                return res.status(200).json(data)
            }
        })
        .catch(function(err){
            next(err)
        })
    }
    static edit (req, res, next) {
        const id = +req.params.id
        let updateTodo =  {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(updateTodo, {where: {id}})
        .then(function(data){
            if (data[0] === 1) {
                return res.status(200).json({message: 'Succesfully Updated Todo!'})
            } else {
                throw {
                    name: "Validation_error",
                    statusCode: 404,
                    message: `Todo not found!`
                }
            }
        })
        .catch(function(err){
            next(err)
        })
    }
    static delete (req, res, next) {
        const id = +req.params.id
        Todo.destroy({ where: {id} })
        .then(function(data){
            if (data[0] === 1) {
                return res.status(200).json({message: 'Succesfully Deleted Todo!'})
            } else {
                throw {
                    name: "Validation_error",
                    statusCode: 404,
                    message: `Todo with ID: ${id} is not found!`
                }
            }
        })
        .catch(function(err){
            next(err)
        })
    }
}

module.exports = TodoController