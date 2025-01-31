
//** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create 'customers' table
    await queryInterface.createTable('customers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    //Create 'mechanics' table
    await queryInterface.createTable('mechanics', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      availability: {
        type: Sequelize.ENUM('available', 'unavailable'),
        defaultValue: 'available',
        allowNull: false
      },

      createdAt: {  
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }

    });

    // Create 'services' table
    await queryInterface.createTable('services', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('appointments');
    await queryInterface.dropTable('services');
    await queryInterface.dropTable('mechanics');
    await queryInterface.dropTable('customers');
  }
};