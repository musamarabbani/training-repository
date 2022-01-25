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
        validate: {
          len: {
            args: [[2, 25]],
            msg: 'title must be between 2 to 25 characters',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'todo',
    }
  );
  todo.addHook('afterValidate', 'customValidateHook', (todos, options) => {
    console.log('todos inside hook', todos);
    console.log('todos inside options', options);
    todos.title += todos.title;
  });
  return todo;
};
