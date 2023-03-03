'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todolist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: "user",
        as: "users"
      })
    }
  }
  todolist.init({
    project: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'todolist',
    tableName: 'todolist'
  });
  return todolist;
};