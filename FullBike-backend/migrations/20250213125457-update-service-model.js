'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('services', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('services', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  }
};
