'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.Post, {
				foreignKey: 'userId',
				as: 'postItems',
			});
		}
	}
	User.init(
		{
			firstName: {
				type: DataTypes.STRING,
			},
			lastName: {
				type: DataTypes.STRING,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: 'email is required',
					},
					isEmail: {
						args: true,
						msg: 'invalid email',
					},
					isUnique: function (value, next) {
						User.findOne({ where: { email: value }, attributes: ['id'] })
							.then((user) => {
								if (user && this.id !== user.id) {
									return next('Email already in use');
								}
								return next();
							})
							.catch((err) => {
								return next(err);
							});
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: {
						args: [[7, 42]],
						msg: 'password length should be between 7 and 42 characters',
					},
				},
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
