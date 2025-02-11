const { setServers } = require("dns");
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
            customer: customer
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

// Assign service to customer
const assignServiceToCustomer = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

        try {
        // Find customer
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        // Find service
        const serviceName = await Service.findOne({ where: { name: name } });
        if (!serviceName) {
            return res.status(404).json({ error: "Service not found" });
        }

        // Assign the new service (overwriting any previous one)
        customer.serviceId = serviceName.id;
        await customer.save();

        // Get updated customer with service details
        const updatedCustomer = await Customer.findByPk(id, {
            include: [{ model: Service, attributes: ["id", "name", "description", "price"] }]
        });

        res.status(200).json({
            success: true,
            message: "Service assigned successfully",
            data: updatedCustomer
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to assign service", details: error.message });
    }
};

// // Customer Profile

// const getProfile = async (req, res) => {
//     const { id } = req.customer;
//     try {
//         const customer = await Customer.findByPk(id, {
//             include: [{ model: Service, attributes: ["id", "name", "description", "price"] }]
//         });
//         if (!customer) {
//             return res.status(404).json({ error: "Customer not found" });
//         }
//         res.status(200).json(customer);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch customer" });
//     }
// };






module.exports = {
    getAllCustomers,
    createCustomer,
    loginCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    assignServiceToCustomer,
};
