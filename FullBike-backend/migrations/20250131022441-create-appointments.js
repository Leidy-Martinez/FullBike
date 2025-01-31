'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
// Create 'appointments' table
await queryInterface.createTable('appointments', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  customerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'customers', 
      key: 'id'           
    },
    onDelete: 'SET NULL', // set customerId to null if customer is deleted
  },
  mechanicId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'mechanics', 
      key: 'id'           
    },
    onDelete: 'SET NULL', // set mechanicId to null if mechanic is deleted
  },
  serviceId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'services',  
      key: 'id'           
    },
    onDelete: 'SET NULL', // Optional: set serviceId to null if service is deleted
  },
  appointmentDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isFuture(value) {
        if (value < new Date()) {
          throw new Error('Appointment date must be in the future');
        }
      }
    }
  },
  status: {
    type: Sequelize.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
    defaultValue: 'pending',
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false
  }
});
},

async down(queryInterface, _Sequelize) {
  await queryInterface.dropTable('appointments'); 
}
};