const { Customer } = require('../models');

const customerController = {
    async getAllCustomers(req, res) {
        try {
            const customers = await Customer.findAll();
            res.json(customers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};


module.exports = customerController;