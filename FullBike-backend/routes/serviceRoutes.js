const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const auth = require('../middleware/authMiddleware');
const { validateId } = require('../middleware/validateMiddleware');

// Get all services
router.get('/', serviceController.getServices);

// // Get service by name
// router.get('/:name', serviceController.getServiceByName);

// Get service by id
router.get('/:id', validateId, serviceController.getServiceById);

// Create service (admin only)
router.post('/', serviceController.createService);

// Update service (admin only)
router.patch('/:name', serviceController.updateService);

// Delete service (admin only)

router.delete('/:id', validateId, serviceController.deleteService);

module.exports = router;