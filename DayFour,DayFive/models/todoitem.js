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
        as: 'todoItems',
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
        validate: {
          isIn: {
            args: [[true, false]],
            msg: 'only true and false are allowed',
          },
          customValidator(value) {
            if (value === false && this.content.length < 5) {
              throw new Error("content length can't be less than 5 if complete is false");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'TodoItem',
      validate: {
        customValidator() {
          if (this.content.length > 5 && this.content.length < 8 && this.complete === true) {
            throw new Error('content value should be greater than 8');
          }
        },
      },
    }
  );
  return TodoItem;
};
