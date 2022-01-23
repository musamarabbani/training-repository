var express = require('express');
const { check, param } = require('express-validator');
var router = express.Router();

const todoController = require('../controllers/Todos');

// ------Todo Routes -----
router.post(
	'/create',
	[check('title').trim().not().isEmpty().withMessage('title is required')],
	todoController.createTodo
);
router.put(
	'/update/:todoId',
	[
		param('todoId')
			.trim()
			.not()
			.isEmpty()
			.withMessage('todoId is required in params'),
		check('title')
			.trim()
			.not()
			.isEmpty()
			.withMessage('title is required to update todo title'),
	],
	todoController.updateTodoById
);
router.delete(
	'/delete/:todoId',
	[
		param('todoId')
			.trim()
			.not()
			.isEmpty()
			.withMessage('todoId is required in params'),
	],
	todoController.deleteTodoById
);
router.get(
	'/todo/:todoId',
	[
		[
			param('todoId')
				.trim()
				.not()
				.isEmpty()
				.withMessage('todoId is required in params'),
		],
	],
	todoController.getTodoById
);
router.get('/allTodos', todoController.getAllTodos);

// ------Todo Items Routes -----

module.exports = router;
