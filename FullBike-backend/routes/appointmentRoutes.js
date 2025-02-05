const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/authMiddleware');
const { validateId } = require('../middleware/validateMiddleware');

// Create new appointment
router.post('/', appointmentController.createAppointment);

// Get all appointments
router.get('/', appointmentController.getAllAppointments);

// Get appointment by ID
router.get('/:id', validateId, appointmentController.getAppointmentById);

// Update appointment
router.patch('/:id', validateId, appointmentController.updateAppointment);

// Delete appointment
router.delete('/:id', validateId, appointmentController.deleteAppointment);

// Assign customer appointments
router.post('/:id/schedule', validateId, appointmentController.assignAppointmentToCustomer);

// // Get appointments by status
// router.get('/status/:status', appointmentController.getAppointmentsByStatus);

// // Get appointments by date range
// router.get('/date-range', appointmentController.getAppointmentsByDateRange);

// // Update appointment status
// router.patch('/:id/status', validateId, appointmentController.updateAppointmentStatus);

// // Get customer's appointments
// router.get('/customer/:customerId', appointmentController.getCustomerAppointments);

// // Get mechanic's appointments
// router.get('/mechanic/:mechanicId', appointmentController.getMechanicAppointments);

module.exports = router;