const Todo = require('../models').todo;
const { showError } = require('../utils/errors');
const { validationResult } = require('express-validator');

const createTodo = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({
				message: 'body validation error',
				errors: errors.errors,
				status: 400,
			});

		let { title } = req.body;
		let createdTodo = await Todo.create({ title });
		if (!createdTodo) throw new Error('could not create todo');
		return res.status(200).json({ createdTodo });
	} catch (err) {
		let errorsArr = [];
		if (err.errors) {
			err.errors.map((er) => {
				let obj = {};
				obj[er.path] = er.message;
				errorsArr.push(obj);
			});
		}
		return res.status(400).json({
			message: err.message ? err.message : 'server error',
			errors: errorsArr,
			status: 400,
		});
	}
};

const updateTodoById = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({
				message: 'body validation error',
				errors: errors.errors,
				status: 400,
			});

		let { title } = req.body;
		let createdTodo = await Todo.create({ title });
		if (!createdTodo) throw new Error('could not create todo');
		return res.status(200).json({ createdTodo });
	} catch (err) {
		return res.status(400).json({
			message: err.message ? err.message : 'server error',
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
