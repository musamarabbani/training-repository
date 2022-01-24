const User = require('../models').User;
const Post = require('../models').Post;
const { validationResult } = require('express-validator');

const createPost = async (req, res) => {
	try {
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({
				message: 'body validation error',
				errors: errors.errors,
				status: 400,
			});

		let { content, complete, userId } = req.body;
		let matchedUserId = await User.findByPk(userId);

		if (matchedUserId === null) throw new Error('invalid userId');
		let createdPost = await Post.create({ content, complete, userId });
		if (!createdPost) throw new Error('could not create post');
		return res.status(200).json({ data: createdPost });
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

const updatePostById = async (req, res) => {
	let errors = validationResult(req);
	try {
		if (!errors.isEmpty())
			return res.status(400).json({
				message: 'validation error',
				errors: errors.errors,
				status: 400,
			});

		let { content, complete, userId } = req.body;
		const { postId } = req.params;
		if (postId) {
			let matchedUserId = await User.findByPk(userId);
			if (matchedUserId === null) throw Error('invalid userId');
		}

		Post.findOne({ where: { id: postId } })
			.then((item) => {
				if (!item) throw Error('no post found');
				var updatedPostDetails = {
					content: content ? content : item.content,
					complete: complete ? complete : item.complete,
					userId: userId ? userId : item.userId,
				};
				item.update(updatedPostDetails).then((result) => {
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

const deletePostById = (req, res) => {
	const { postId } = req.params;
	let errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({
			message: 'body validation error',
			errors: errors.errors,
			status: 400,
		});

	Post.destroy({ where: { id: postId } })
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
const getAllPosts = async (req, res) => {
	try {
		let allPosts = await Post.findAll({
			// attributes: ['id', 'content', 'postId'],
			include: [
				{
					model: User,
					as: 'userItems',
					// attributes: ['id', 'title', 'createdAt'],
				},
			],
		});
		return res.status(200).json({ data: allPosts });
	} catch (err) {
		return res.status(400).json({
			message: err.message ? err.message : 'server error',
			status: 400,
		});
	}
};

const getPostById = async (req, res) => {
	try {
		const { postId } = req.params;
		let errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({
				message: 'params validation error',
				errors: errors.errors,
				status: 400,
			});

		let allPosts = await Post.findAll({
			include: [
				{
					model: User,
					as: 'userItems',
				},
			],
			where: { id: postId },
		});
		return res.status(200).json({ data: allPosts });
	} catch (err) {
		return res.status(400).json({
			message: err.message ? err.message : 'server error',
			status: 400,
		});
	}
};

const PostRoutes = {
	createPost,
	updatePostById,
	deletePostById,
	getAllPosts,
	getPostById,
};

module.exports = PostRoutes;
