const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const auth = require('../middleware/authMiddleware');

// Get all services
router.get('/', serviceController.getServices);

// Get service by name
router.get('/:name', serviceController.getServiceByName);

// Get service by id
router.get('/:id', serviceController.getServiceById);

// Create service (admin only)
router.post('/', serviceController.createService);

// Update service (admin only)
router.patch('/:name', serviceController.updateService);

module.exports = router;