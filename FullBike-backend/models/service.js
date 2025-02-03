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
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'services',
    timestamps: true
});

// Define associations
Service.associate = (models) => {
    Service.hasMany(models.Appointment, { foreignKey: 'serviceId' });
};

module.exports = Service;