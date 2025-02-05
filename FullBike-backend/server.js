require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { connectDB } = require('./config/database');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

// Routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

// Start server
async function startServer() {
    try {
        await connectDB();
        // Sync models with database
        const { sequelize } = require('./config/database');
        await sequelize.sync({ alter: true });
        console.log('Database synced');

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
