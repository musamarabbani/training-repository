module.exports = {
  up: (queryInterface, Sequelize, done) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        // queryInterface.dropTable('TodoItems'),
        // queryInterface.dropTable('todos'),
      ])
    ),

  down: (queryInterface, Sequelize, done) => queryInterface.sequelize.transaction((t) => Promise.all([queryInterface.dropTable('todos')])),
};
