'use strict';
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Mechanic = sequelize.define("Mechanic", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 50]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    availability: {
        type: DataTypes.ENUM('available', 'unavailable'),
        defaultValue: 'available',
        allowNull: false
        }
    }
}, {
    tableName: 'mechanics',
    timestamps: true
});

// Define associations
Mechanic.associate = (models) => {
    Mechanic.hasMany(models.Appointment, { foreignKey: 'mechanicId' });
};

module.exports = Mechanic;