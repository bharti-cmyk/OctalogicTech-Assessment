'use strict';

module.exports = {
  async up(queryInterface:any, Sequelize:any) {
    await queryInterface.createTable('vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vehicleTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'vehicleTypes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
    });
  },

  async down(queryInterface:any) {
    await queryInterface.dropTable('vehicles');
  },
};
