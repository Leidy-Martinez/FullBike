const Customer = require("../models/customer");

// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch customers" });
    }
};

// Create new customer-signup
const createCustomer = async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;
    try {
        const existingCustomer = await Customer.findOne({ where: { email } });
        if (existingCustomer) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const customer = await Customer.create({ name, email, password, phoneNumber });
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ error: "Failed to create customer" });
    }
};

// Login customer
const loginCustomer = async (req, res) => {
    const { email, password } = req.body;
    try {
        const customer = await Customer.findOne({ where: { email, password } });
        if (!customer) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        res.status(200).json({
            message: "Login successful",
            // customer: customer
        });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

// Get customer by ID 
const getCustomerById = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch customer" });
    }
};

// Update customer
const updateCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        await customer.update(req.body);
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: "Failed to update customer" });
    }
};

// Delete customer
const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        await customer.destroy();
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete customer" });
    }
};

module.exports = {
    getAllCustomers,
    createCustomer,
    loginCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
