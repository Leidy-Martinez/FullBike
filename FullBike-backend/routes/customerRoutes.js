const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/authMiddleware');
const { validateId, validateCustomer, validateServiceName} = require('../middleware/validateMiddleware');

// Create new customer
router.post('/', validateCustomer, customerController.createCustomer);

// Get all customers
router.get('/', customerController.getAllCustomers);

// Login customer
router.post('/login', auth, customerController.loginCustomer);

// Get single customer by ID
router.get('/:id', validateId, customerController.getCustomerById);

// Update customer
router.patch('/:id', validateId, customerController.updateCustomer);

// Delete customer
router.delete('/:id', validateId, customerController.deleteCustomer);

// // Search customers
// router.get('/search', auth, customerController.searchCustomers);

// // Assign service to customer
router.post("/:id/service", validateId, validateServiceName, customerController.assignServiceToCustomer);

// // Get customer profile
// router.get('/:id/profile', customerController.getProfile);

// // Update password
// router.post('/reset-password', auth, customerController.resetPassword);

// // Logout customer
// router.post('/logout', auth, customerController.logout);

module.exports = router;