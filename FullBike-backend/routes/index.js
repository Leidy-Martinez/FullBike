const express = require('express');
const router = express.Router();
const customerRoutes = require('./customerRoutes');
const mechanicRoutes = require('./mechanicRoutes');
const appointmentRoutes = require('./appointmentRoutes');

// Mount routes
router.use('/customers', customerRoutes);
// router.use('/mechanics', mechanicRoutes);
// router.use('/appointments', appointmentRoutes);

// Test API endpoint
router.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'API is working' });
});

module.exports = router;