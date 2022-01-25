'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.addColumn('Users', 'password', {
					type: Sequelize.STRING,
					allowNull: false,
					validate: {
						len: {
							args: [7, 42],
							msg: 'password length should be between 7 and 42 characters',
						},
					},
				}),
			]);
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
