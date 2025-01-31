const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Service = sequelize.define("Service", {
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
            len: [2, 100]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0
        }
    },
}, {
    tableName: 'services',
    timestamps: true
});

// Define associations
Service.associate = (models) => {
    Service.hasMany(models.Appointment, { foreignKey: 'serviceId' });
};

module.exports = Service;