'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class todo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.TodoItem, {
				foreignKey: 'todoId',
				as: 'todoItems',
			});
		}
	}
	todo.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'todo',
		}
	);
	return todo;
};
