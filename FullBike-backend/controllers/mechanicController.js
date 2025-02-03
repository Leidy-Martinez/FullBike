const { Mechanic, Appointment } = require('../models');

const mechanicController = {
    // Get all mechanics
    getAllMechanics: async (req, res) => {
        try {
            const mechanics = await Mechanic.findAll();
            res.status(200).json(mechanics);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch mechanics" });
        }
    },

    // Create new mechanic
    createMechanic: async (req, res) => {
        try {
            const mechanic = await Mechanic.create(req.body);
            res.status(201).json(mechanic);
        } catch (error) {
            res.status(500).json({ error: "Failed to create mechanic" });
        }
    },

    // Bulk create mechanics
    bulkCreateMechanics: async (req, res) => {
        try {
            const mechanics = await Mechanic.bulkCreate(req.body);
            res.status(201).json(mechanics);
        } catch (error) {
            res.status(500).json({ error: "Failed to create mechanics" });
        }
    },

    // Get mechanic by ID
    getMechanicById: async (req, res) => {
        try {
            const mechanic = await Mechanic.findByPk(req.params.id);
            if (!mechanic) {
                return res.status(404).json({ error: "Mechanic not found" });
            }
            res.status(200).json(mechanic);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch mechanic" });
        }
    },

    // Update mechanic
    updateMechanic: async (req, res) => {
        try {
            const mechanic = await Mechanic.findByPk(req.params.id);
            if (!mechanic) {
                return res.status(404).json({ error: "Mechanic not found" });
            }
            await mechanic.update(req.body);
            res.status(200).json(mechanic);
        } catch (error) {
            res.status(500).json({ error: "Failed to update mechanic" });
        }
    },

    // Delete mechanic
    deleteMechanic: async (req, res) => {
        try {
            const mechanic = await Mechanic.findByPk(req.params.id);
            if (!mechanic) {
                return res.status(404).json({ error: "Mechanic not found" });
            }
            await mechanic.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Failed to delete mechanic" });
        }
    },

    // Get mechanic's appointments
    getMechanicAppointments: async (req, res) => {
        try {
            const mechanic = await Mechanic.findByPk(req.params.id, {
                include: [{
                    model: Appointment,
                    attributes: ['id', 'date', 'status']
                }]
            });
            if (!mechanic) {
                return res.status(404).json({ error: "Mechanic not found" });
            }
            res.status(200).json(mechanic.Appointments);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch mechanic's appointments" });
        }
    }
};

module.exports = mechanicController;