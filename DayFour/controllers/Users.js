const User = require('../models').User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const { validationResult } = require('express-validator');

const createUser = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({
				message: 'body validation error',
				errors: errors.errors,
				status: 400,
			});

		const salt = await bcrypt.genSalt(10);

		let { email, firstName, lastName, password } = req.body;
		const encryptedPassword = await bcrypt.hash(password, salt);
		let createdUser = await User.create({
			email,
			firstName,
			lastName,
			password: encryptedPassword,
		});
		if (!createdUser) throw new Error('could not create User');
		return res.status(200).json({ data: createdUser });
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

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email: email } });
		if (!user) throw new Error('user with this email does not exists');
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) throw new Error('Incorrect password');
		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
				firstName: user.firstName,
			},
			process.env.SECRET,
			{
				expiresIn: '1h',
			}
		);
		return res.status(200).json({ token });
	} catch (err) {
		return res.status(400).json({
			message: err.message ? err.message : 'server error',
			status: 400,
		});
	}
};
const updateUserById = async (req, res) => {
	try {
		const { userId } = req.params;
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({
				message: 'body validation error',
				errors: errors.errors,
				status: 400,
			});

		let { email } = req.body;
		const emailExistFlag = await User.findOne({ where: { email: email } });
		if (emailExistFlag !== null) throw Error('email already taken');
		User.update({ email }, { where: { id: userId } }).then((result) => {
			if (result === 0) throw new Error('could not update user');
			else return res.status(200).json({ message: 'record updated' });
		});
	} catch (err) {
		return res.status(400).json({
			message: err.message ? err.message : 'server error',
			status: 400,
		});
	}
};

const deleteUserById = (req, res) => {
	const { userId } = req.params;
	let errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({
			message: 'body validation error',
			errors: errors.errors,
			status: 400,
		});

	User.destroy({ where: { id: userId } })
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
const getAllUsers = async (req, res) => {
	try {
		let allUsers = await User.findAll({
			// include: [{ model: Post, as: 'postItems' }],
		});
		return res.status(200).json({ data: allUsers });
	} catch (err) {
		return res.status(400).json({
			message: err.message ? err.message : 'server error',
			status: 400,
		});
	}
};

const getUserById = async (req, res) => {
	try {
		const { userId } = req.params;
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({
				message: 'body validation error',
				errors: errors.errors,
				status: 400,
			});

		let userRecord = await User.findByPk(userId);
		if (userRecord === null)
			return res.status(200).json({ message: 'no record found' });
		return res.status(200).json({ data: userRecord });
	} catch (err) {
		return res.status(400).json({
			message: err.message ? err.message : 'server error',
			status: 400,
		});
	}
};

const UserRoutes = {
	createUser,
	loginUser,
	updateUserById,
	deleteUserById,
	getAllUsers,
	getUserById,
};

module.exports = UserRoutes;
