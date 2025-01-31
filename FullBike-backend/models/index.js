const fs = require("fs");
const path = require("path");
const { sequelize } = require("../config/database");
const basename = path.basename(__filename);
const models = {};

// Import all models dynamically
fs.readdirSync(__dirname)
  .filter((file) => file !== basename && file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    models[model.name] = model;
  });

// Associate models after all have been loaded
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
