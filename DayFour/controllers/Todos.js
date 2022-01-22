const Todo = require('../models').todo;
const { check, validationResult } = require('express-validator');

const createTodo = async (req, res) => {
	try {
		let { title } = req.body;
		let createdTodo = await Todo.create({ title });
		if (!createdTodo) throw new Error('could not create todo');
		return res.status(200).json({ createdTodo });
	} catch (err) {
		console.log('err', err.message);
		return res.status(400).json({
			message: err.message ? err.message : 'server error',
			status: 400,
		});
	}
};

const updateTodoById = (req, res) => {
	try {
	} catch (err) {
		return res.status(400).json({
			message: '',
			error: err,
			status: 400,
		});
	}
};

const deleteTodoById = (req, res) => {
	try {
	} catch (err) {
		return res.status(400).json({
			message: '',
			error: err,
			status: 400,
		});
	}
};
const getAllTodos = (req, res) => {
	try {
	} catch (err) {
		return res.status(400).json({
			message: '',
			error: err,
			status: 400,
		});
	}
};

const getTodoById = (req, res) => {
	try {
	} catch (err) {
		return res.status(400).json({
			message: '',
			error: err,
			status: 400,
		});
	}
};

const TodoRoutes = {
	createTodo,
	updateTodoById,
	deleteTodoById,
	getAllTodos,
	getTodoById,
};

module.exports = TodoRoutes;
