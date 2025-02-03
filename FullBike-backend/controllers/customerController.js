const { Customer, Service, Appointment} = require("../models");

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

// Selected Service (Only One)
const selectOneService = async (req, res) => {
    const { id } = req.params;
    const { serviceId } = req.body;

    try {
        // 1. Find customer
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        // 2. Check if service exists
        const service = await Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }

        // 3. Check if customer already has a service selected
        const existingService = await customer.getServices();
        if (existingService.length > 0) {
            return res.status(400).json({ 
                error: "Customer already has a service selected" 
            });
        }

        // 4. Set the selected service for customer
        
        const selectedService = await customer.createService({
            attributes: ['id', 'name', 'description', 'price']
        });

        res.status(200).json({
            message: "Service selected successfully",
            service: selectedService[0]
        });

    } catch (error) {
        res.status(500).json({ 
            error: "Failed to select service",
            details: error.message 
        });
    }
};

module.exports = {
    getAllCustomers,
    createCustomer,
    loginCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    selectOneService
};
