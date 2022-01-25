'use strict';

module.exports = {
	up: (queryInterface, Sequelize, done) => {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				// queryInterface.dropTable('TodoItems'),
				// queryInterface.dropTable('todos'),
			]);
		});
	},

	down: (queryInterface, Sequelize, done) => {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([queryInterface.dropTable('todos')]);
		});
	},
};
