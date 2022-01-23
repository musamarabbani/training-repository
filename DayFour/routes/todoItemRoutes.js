var express = require('express');
const { check, param } = require('express-validator');
var router = express.Router();

const todoItemController = require('../controllers/TodoItems');

router.post(
	'/create',
	[check('title').trim().not().isEmpty().withMessage('title is required')],
	todoItemController.createTodo
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
	todoItemController.updateTodoById
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
	todoItemController.deleteTodoById
);
router.get(
	'/todo/:todoId',
	[
		param('todoId')
			.trim()
			.not()
			.isEmpty()
			.withMessage('todoId is required in params'),
	],
	todoItemController.getTodoById
);
router.get('/allTodos', todoItemController.getAllTodos);

module.exports = router;
