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
        unique: true,
        validate: {
            isIn: {
                args: [["Bronze", "Silver", "Gold"]],
                msg: "Service must be Bronze, Silver, or Gold"
            }
        }
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
    Service.hasMany(models.Customer, { foreignKey: 'serviceId'});
};

module.exports = Service;