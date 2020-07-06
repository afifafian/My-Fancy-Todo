"use strict"

const {Todo} = require('../models')

class TodoController {
    static addTodo (req,res) {
        let newTodo =  {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        if (!newTodo.title || !newTodo.description || !newTodo.status || !newTodo.due_date) {
            return res.status(400).json({message: 'Data tidak boleh ada yang kosong!'})
        } else {
            Todo.create(newTodo)
            .then(function(data){
                return res.status(201).json(data)
            })
            .catch(function(err){
                return res.status(500).json({message: err})
            })
        }
    }
    static read (req, res) {
        Todo.findAll({order:[['id', 'ASC']]})
        .then(function(data){
            return res.status(200).json(data)
        })
        .catch(function(err){
            return res.status(500).json({message: err})
        })
    }
    static getId (req, res) {
        const id = +req.params.id
        Todo.findByPk(id)
        .then(function(data){
            if (!data) {
                return res.status(404).json({message:'404 error not found'})
            } else {
                return res.status(200).json(data)
            }
        })
        .catch(function(err){
            return res.status(500).json({message: err})
        })
    }
    static edit (req, res) {
        const id = +req.params.id
        let updateTodo =  {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        if (!updateTodo.title || !updateTodo.description || !updateTodo.status || !updateTodo.due_date) {
            return res.status(400).json({message: 'Data tidak boleh ada yang kosong!'})
        } else {
            Todo.update(updateTodo, {where: {id}})
            .then(function(data){
                return res.status(200).json(data)
            })
            .catch(function(err){
                return res.status(500).json({message: err})
            })
        }
    }
    static delete (req, res) {
        const id = +req.params.id
        Todo.destroy({ where: {id} })
        .then(function(data){
            if (data) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json({message:'404 error not found'})
            }
        })
        .catch(function(err){
            return res.status(500).json({message: err})
        })
    }
}

module.exports = TodoController