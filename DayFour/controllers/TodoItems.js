const Todo = require('../models').todo;
const TodoItem = require('../models').TodoItem;
const { validationResult } = require('express-validator');

const createTodoItem = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({
				message: 'body validation error',
				errors: errors.errors,
				status: 400,
			});

		let { content, complete, todoId } = req.body;
		let matchedTodoId = await Todo.findByPk(todoId);

		if (matchedTodoId === null) throw new Error('invalid id');
		let createdTodoItem = await TodoItem.create({ content, complete, todoId });
		if (!createdTodoItem) throw new Error('could not create todoItem');
		return res.status(200).json({ data: createdTodoItem });
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
	let errors = validationResult(req);
	try {
		if (!errors.isEmpty())
			return res.status(400).json({
				message: 'validation error',
				errors: errors.errors,
				status: 400,
			});

		let { content, complete, todoId } = req.body;
		const { todoItemId } = req.params;
		if (todoId) {
			let matchedTodoId = await Todo.findByPk(todoId);
			if (matchedTodoId === null) throw Error('invalid id');
		}

		TodoItem.findOne({ where: { id: todoItemId } })
			.then((item) => {
				if (!item) throw Error('no item found');
				var updatedItemDetails = {
					content: content ? content : item.content,
					complete: complete ? complete : item.complete,
					todoId: todoId ? todoId : item.todoId,
				};
				item.update(updatedItemDetails).then((result) => {
					if (result === 0) throw Error('no item found to update');
					return res.status(200).json({ message: 'result updated' });
				});
			})
			.catch((err) => {
				return res.status(400).json({
					message: err.message ? err.message : 'server error',
					errors: [],
					status: 400,
				});
			});
	} catch (err) {
		return res.status(400).json({
			message: err.message ? err.message : 'server error',
			errors: err.errors ? err.errors : [],
			status: 400,
		});
	}
};

const deleteTodoById = (req, res) => {
	const { todoItemId } = req.params;
	let errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({
			message: 'body validation error',
			errors: errors.errors,
			status: 400,
		});

	TodoItem.destroy({ where: { id: todoItemId } })
		.then((result) => {
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
const getAllTodoItems = async (req, res) => {
	try {
		let allTodoItems = await TodoItem.findAll({
			attributes: ['id', 'content', 'todoId'],
			include: [
				{
					model: Todo,
					attributes: ['id', 'title', 'createdAt'],
				},
			],
		});
		return res.status(200).json({ data: allTodoItems });
	} catch (err) {
		return res.status(400).json({
			message: err.message ? err.message : 'server error',
			status: 400,
		});
	}
};

const getTodoItemById = async (req, res) => {
	try {
		const { todoItemId } = req.params;
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({
				message: 'params validation error',
				errors: errors.errors,
				status: 400,
			});

		let allTodoItems = await TodoItem.findAll({
			include: [
				{
					model: Todo,
				},
			],
			where: { id: todoItemId },
		});
		return res.status(200).json({ data: allTodoItems });
	} catch (err) {
		return res.status(400).json({
			message: err.message ? err.message : 'server error',
			status: 400,
		});
	}
};

const TodoRoutes = {
	createTodoItem,
	updateTodoById,
	deleteTodoById,
	getAllTodoItems,
	getTodoItemById,
};

module.exports = TodoRoutes;
