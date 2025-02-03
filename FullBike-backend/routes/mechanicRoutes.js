const express = require('express');
const router = express.Router();
const mechanicController = require('../controllers/mechanicController');
const auth = require('../middleware/authMiddleware');
const { validateId, validateMechanic } = require('../middleware/validateMiddleware');

// Create new mechanic
router.post('/', validateMechanic, mechanicController.createMechanic);

// bulk create mechanics
router.post('/bulk', mechanicController.bulkCreateMechanics);

// Get all mechanics
router.get('/', mechanicController.getAllMechanics);

// Get single mechanic by ID
router.get('/:id', validateId, mechanicController.getMechanicById);

// Update mechanic
router.patch('/:id', validateId, mechanicController.updateMechanic);

// Delete mechanic
router.delete('/:id', validateId, mechanicController.deleteMechanic);

// Get mechanic's appointments
router.get('/:id/appointments', validateId, mechanicController.getMechanicAppointments);

module.exports = router;