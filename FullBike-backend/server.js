require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const customerRoutes = require("./routes/customerRoutes");

const app = express();
app.use(express.json());

// Connect to database and sync models
const startServer = async () => {
    try {
        await connectDB();
        
        // Routes
        app.use("/customers", customerRoutes);
        
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
};

startServer();
