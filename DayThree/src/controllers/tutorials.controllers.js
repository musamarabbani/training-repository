import Db from '../models';
import { body, validationResult } from 'express-validator';

const Tutorial = Db.tutorials;
const Op = Db.Sequelize.Op;

const create = (req, res) => {
	// Create a Tutorial

	let { title, description, published } = req.body;
	const tutorial = {
		title: title,
		description: description,
		published: published ? published : false,
	};
	Tutorial.create(tutorial)
		.then((data) => {
			return res.status(200).json({ data });
		})
		.catch((err) => {
			res.status(500).json({
				message:
					err.message || 'Some error occurred while creating the Tutorial.',
			});
		});
};

const findAll = async (req, res) => {
	try {
		let tutorials = await Tutorial.findAll();
		return res.status(200).json(tutorials);
	} catch (err) {
		return res.status(400).json({ err: err });
	}
};
const updateById = async (req, res) => {
	const { id } = req.params;
	try {
		let updatedRecord = await Tutorial.update(req.body, { where: { id } });
		if (updatedRecord[0] === 0)
			return res.status(400).json({ err: 'no record found with this id' });
		return res.status(200).json({ msg: 'record updated successfully' });
	} catch (err) {
		return res
			.status(500)
			.json({ err: 'could not delete, something went wrong' });
	}
};
const deleteById = async (req, res) => {
	const { id } = req.params;
	try {
		let deletedTutorial = await Tutorial.destroy({ where: { id } });
		if (deletedTutorial === 0)
			return res.status(400).json({ err: 'no record found with this id' });
		return res.status(200).json({ msg: 'record deleted successfully' });
	} catch (err) {
		return res
			.status(500)
			.json({ err: 'could not delete, something went wrong' });
	}
};

const TutorialController = {
	create,
	findAll,
	updateById,
	deleteById,
};

export default TutorialController;
