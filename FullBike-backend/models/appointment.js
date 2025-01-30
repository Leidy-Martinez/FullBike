'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Appointment.belongsTo(models.Customer, { foreignKey: 'customerId' });
      Appointment.belongsTo(models.Mechanic, { foreignKey: 'mechanicId' });
      Appointment.belongsTo(models.Service, { foreignKey: 'serviceId' });
    }
  }
  Appointment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    customerId: DataTypes.INTEGER,
    mechanicId: DataTypes.INTEGER,
    serviceId: DataTypes.INTEGER,
    appointmentDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointments'
  });
  return Appointment;
};