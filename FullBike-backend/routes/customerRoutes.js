const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const auth = require('../middleware/authMiddleware');
const { validateId, validateCustomer } = require('../middleware/validateMiddleware');



// Create new customer
router.post('/', validateCustomer, customerController.createCustomer);

// Login customer
router.post('/login', auth, customerController.loginCustomer);

// Get all customers
router.get('/', customerController.getAllCustomers);

// Get single customer by ID
router.get('/:id', validateId, customerController.getCustomerById);

// Update customer
router.patch('/:id', validateId, customerController.updateCustomer);

// Delete customer
router.delete('/:id', validateId, customerController.deleteCustomer);

// // Search customers
// router.get('/search', auth, customerController.searchCustomers);

module.exports = router;