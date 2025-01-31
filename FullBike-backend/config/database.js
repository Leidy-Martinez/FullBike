const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_URI, {
    dialect: "postgres",
    logging: false,
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully.");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
}

module.exports = { sequelize, connectDB };
