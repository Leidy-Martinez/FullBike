const { Service } = require('../models');

const getServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch services" });
    }
};

const getServiceByName = async (req, res) => {
    try {
        const service = await Service.findOne({ 
            where: { name: req.params.name }
        });
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch service" });
    }
};

// Get service by ID 
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

const createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ error: "Failed to create service" });
    }
};

const updateService = async (req, res) => {
    try {
        const service = await Service.update(req.body, {
            where: { name: req.params.name }
        });
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: "Failed to update service" });
    }
};

const deleteService = async (req, res) => {
    try {
        await Service.destroy({
            where: { id: req.params.id }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete service" });
    }
};

module.exports = {
    getServices,
    getServiceByName,
    getServiceById,
    createService,
    updateService,
    deleteService
};