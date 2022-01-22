'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class TodoItem extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.todo, {
				foreignKey: 'todoId',
				onDelete: 'CASCADE',
			});
		}
	}
	TodoItem.init(
		{
			content: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			complete: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: 'TodoItem',
		}
	);
	return TodoItem;
};
