const express = require('express');
const { sequelize } = require('./models');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/', routes);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ status: 'OK', message: 'Full-Bike API is running' });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// // Error Handler
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({
//         message: 'Internal Server Error',
//         error: process.env.NODE_ENV === 'development' ? err.message : {}
//     });
// });

//Debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Database connection and server start
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Unable to start server:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;