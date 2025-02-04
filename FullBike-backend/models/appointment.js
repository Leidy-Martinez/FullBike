const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Appointment = sequelize.define("Appointment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customers',
            key: 'id'
        }
    },
    // mechanicId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'mechanics',
    //         key: 'id'
    //     }
    // },
    serviceId: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'services',
            key: 'id'
        }
    },
    appointmentDate: {
        type: DataTypes.DATE,
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
    // status: {
    //     type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
    //     defaultValue: 'pending',
    //     allowNull: false
    // }
}, {
    tableName: 'appointments',
    timestamps: true
});

// Define associations
Appointment.associate = (models) => {
    Appointment.belongsTo(models.Customer, { foreignKey: 'customerId' });
    // Appointment.belongsTo(models.Mechanic, { foreignKey: 'mechanicId' });
    Appointment.belongsTo(models.Service, { foreignKey: 'serviceId' });
};

module.exports = Appointment;