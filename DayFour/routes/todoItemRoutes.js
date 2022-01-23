var express = require('express');
const { check, param } = require('express-validator');
var router = express.Router();

const todoItemController = require('../controllers/TodoItems');

router.post(
	'/create',
	[
		check('content').trim().not().isEmpty().withMessage('content is required'),
		check('todoId')
			.trim()
			.not()
			.isEmpty()
			.withMessage('todoId should not be empty'),
	],
	todoItemController.createTodoItem
);
router.put(
	'/update/:todoItemId',
	[
		param('todoItemId')
			.trim()
			.not()
			.isEmpty()
			.withMessage('todoItemId is required in params'),
	],
	todoItemController.updateTodoById
);
router.delete(
	'/delete/:todoItemId',
	[
		param('todoItemId')
			.trim()
			.not()
			.isEmpty()
			.withMessage('todoItemId is required in params'),
	],
	todoItemController.deleteTodoById
);
router.get(
	'/todoItem/:todoItemId',
	[
		param('todoItemId')
			.trim()
			.not()
			.isEmpty()
			.withMessage('todoItemId is required in params'),
	],
	todoItemController.getTodoItemById
);
router.get('/allTodoItems', todoItemController.getAllTodoItems);

module.exports = router;
