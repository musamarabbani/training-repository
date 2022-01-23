const Todo = require('../models').todo;
const TodoItem = require('../models').TodoItem;

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
		const { todoId } = req.params;
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({
				message: 'body validation error',
				errors: errors.errors,
				status: 400,
			});

		let { title } = req.body;
		Todo.update({ title }, { where: { id: todoId } }).then((result) => {
			if (result === 0) throw new Error('could not update todo');
			else return res.status(200).json({ message: 'record updated' });
		});
	} catch (err) {
		return res.status(400).json({
			message: err.message ? err.message : 'server error',
			status: 400,
		});
	}
};

const deleteTodoById = (req, res) => {
	const { todoId } = req.params;
	let errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({
			message: 'body validation error',
			errors: errors.errors,
			status: 400,
		});

	Todo.destroy({ where: { id: todoId } })
		.then((result) => {
			console.log('deletedRecords ', result);
			if (result === 0) throw Error('no record found');

			return res.status(200).json({ message: 'record deleted' });
		})
		.catch((err) => {
			return res.status(400).json({
				message: err.message ? err.message : 'server error',
				status: 400,
			});
		});
};
const getAllTodos = async (req, res) => {
	try {
		let allTodos = await Todo.findAll({
			include: [{ model: TodoItem, as: 'todoItems' }],
		});
		return res.status(200).json({ allTodos });
	} catch (err) {
		return res.status(400).json({
			message: err.message ? err.message : 'server error',
			status: 400,
		});
	}
};

const getTodoById = async (req, res) => {
	try {
		const { todoId } = req.params;
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({
				message: 'body validation error',
				errors: errors.errors,
				status: 400,
			});

		let todoRecord = await Todo.findByPk(todoId);
		if (todoRecord === null)
			return res.status(200).json({ message: 'no record found' });
		return res.status(200).json({ todoRecord });
	} catch (err) {
		return res.status(400).json({
			message: err.message ? err.message : 'server error',
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
