var express = require('express');
const { check, param } = require('express-validator');
var router = express.Router();

const userController = require('../controllers/Users');

router.post(
	'/create',
	[check('email').trim().not().isEmpty().withMessage('email is required')],
	userController.createUser
);
router.put(
	'/update/:userId',
	[
		param('userId')
			.trim()
			.not()
			.isEmpty()
			.withMessage('userId is required in params'),
		check('email')
			.trim()
			.not()
			.isEmpty()
			.withMessage('userId is required to update user email'),
	],
	userController.updateUserById
);
router.delete(
	'/delete/:userId',
	[
		param('userId')
			.trim()
			.not()
			.isEmpty()
			.withMessage('userId is required in params'),
	],
	userController.deleteUserById
);
router.get(
	'/user/:userId',
	[
		param('userId')
			.trim()
			.not()
			.isEmpty()
			.withMessage('userId is required in params'),
	],
	userController.getUserById
);
router.get('/allUsers', userController.getAllUsers);

module.exports = router;
