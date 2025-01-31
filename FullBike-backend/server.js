require("dotenv").config();
const express = require("express");
const { sequelize, connectDB } = require("./config/database");
const customerRoutes = require("./routes/customerRoutes");

const app = express();
app.use(express.json());

// Connect to database
connectDB();

// Sync models (without deleting existing data)
sequelize.sync({ alter: true })
    .then(() => console.log("✅ Database synced"))
    .catch(err => console.error("❌ Error syncing database:", err));

// Routes
app.use("/customers", customerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
