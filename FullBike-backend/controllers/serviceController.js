const { Service, Customer, Appointment } = require("../models");

const getServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch services" });
    }
};

const createService = async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const existingService = await Service.findOne({ where: { name } });
        if (existingService) {
            return res.status(400).json({ error: "Service name already exists" });
        }
        const service = await Service.create({ name, description, price });
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ error: "Failed to create service" });
    }
};

const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch service" });
    }
};

const updateService = async (req, res) => {
    const { name } = req.params;
    try {
        const service = await Service.findOne({ where: { name } });
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }
        await service.update(req.body);
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: "Failed to update service" });
    }
};

const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }
        await service.destroy();
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete service" });
    }
};

// const getServiceByName = async (req, res) => {
//     const { name } = req.params;
//     try {
//         const service = await Service.findOne({ 
//             where: { name },
//             include: [{
//                 model: Customer,
//                 through: { attributes: [] }
//             }]
//         });
//         if (!service) {
//             return res.status(404).json({ error: "Service not found" });
//         }
//         res.status(200).json(service);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch service" });
//     }
// };

module.exports = {
    getServices,
    createService,
    getServiceById,
    updateService,
    deleteService
};