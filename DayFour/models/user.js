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
				},
				unique: {
					args: true,
					msg: 'email address already in use',
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
