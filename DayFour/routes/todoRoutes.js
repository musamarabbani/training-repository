var express = require('express');
const { check, validationResult } = require('express-validator');
var router = express.Router();

const todoController = require('../controllers/Todos');

// ------Todo Routes -----
router.post(
	'/create',
	[check('title').trim().not().isEmpty().withMessage('title is required')],
	todoController.createTodo
);
router.put('/update/:todoId', todoController.updateTodoById);
router.delete('/delete/:todoId', todoController.deleteTodoById);
router.get('/todo/:todoId', todoController.getTodoById);
router.get('/allTodos', todoController.getAllTodos);

// ------Todo Items Routes -----

module.exports = router;
