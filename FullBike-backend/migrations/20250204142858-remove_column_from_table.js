/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("appointments", "mechanicId");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn("appoitments", "mechanicId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'mechanics',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  }
};
