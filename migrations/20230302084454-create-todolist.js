'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('todolist', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      user: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: 'user'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('todolist');
  }
};