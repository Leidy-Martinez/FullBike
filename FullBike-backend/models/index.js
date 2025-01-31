const { sequelize } = require('../config/database');
const { Sequelize } = require('sequelize');

// Import models (without invoking)
const Customer = require('./customer');
const Mechanic = require('./mechanic');
const Service = require('./service');
const Appointment = require('./appointment');

const db = {
  Customer,
  Mechanic,
  Service,
  Appointment,
  sequelize,
  Sequelize,
};

// Initialize associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
