'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mechanic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mechanic.hasMany(models.Appointment, { foreignKey: 'mechanicId' });
    }
  }
  Mechanic.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    availability: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Mechanic',
    tableName: 'mechanics',
  });
  return Mechanic;
};