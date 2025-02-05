const { Appointment, Customer, Service } = require('../models');

const appointmentController = {
    // Create appointment
    createAppointment: async (req, res) => {
        try {
            const appointment = await Appointment.create(req.body);
            res.status(201).json(appointment);
        } catch (error) {
            res.status(500).json({ error: "Failed to create appointment" });
        }
    },

    // Get all appointments
    getAllAppointments: async (req, res) => {
        try {
            const appointments = await Appointment.findAll({
                include: [
                    { model: Customer, attributes: ['name', 'email'] },
                    // { model: Mechanic, attributes: ['name'] },
                    { model: Service, attributes: ['name', 'price'] }
                ]
            });
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch appointments" });
        }
    },

    // Get appointment by ID
    getAppointmentById: async (req, res) => {
        try {
            const appointment = await Appointment.findByPk(req.params.id, {
                include: [
                    { model: Customer, attributes: ['name', 'email'] },
                    { model: Mechanic, attributes: ['name'] },
                    { model: Service, attributes: ['name', 'price'] }
                ]
            });
            if (!appointment) {
                return res.status(404).json({ error: "Appointment not found" });
            }
            res.status(200).json(appointment);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch appointment" });
        }
    },

    // Update appointment
    updateAppointment: async (req, res) => {
        try {
            const appointment = await Appointment.findByPk(req.params.id);
            if (!appointment) {
                return res.status(404).json({ error: "Appointment not found" });
            }
            await appointment.update(req.body);
            res.status(200).json(appointment);
        } catch (error) {
            res.status(500).json({ error: "Failed to update appointment" });
        }
    },

    // Delete appointment
    deleteAppointment: async (req, res) => {
        try {
            const appointment = await Appointment.findByPk(req.params.id);
            if (!appointment) {
                return res.status(404).json({ error: "Appointment not found" });
            }
            await appointment.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Failed to delete appointment" });
        }
    },

    // Update appointment status
    updateStatus: async (req, res) => {
        try {
            const { status } = req.body;
            const appointment = await Appointment.findByPk(req.params.id);
            if (!appointment) {
                return res.status(404).json({ error: "Appointment not found" });
            }
            appointment.status = status;
            await appointment.save();
            res.status(200).json(appointment);
        } catch (error) {
            res.status(500).json({ error: "Failed to update status" });
        }
    },

    // Get appointments by customer
    getCustomerAppointments: async (req, res) => {
        try {
            const appointments = await Appointment.findAll({
                where: { customerId: req.params.customerId },
                include: [
                    { model: Service, attributes: ['id'] }
                ]
            });
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch customer appointments" });
        }
},

// Create new appointment for assigned service
assignAppointmentToCustomer: async (req, res) => {
    const { id } = req.params; // Customer ID
    const { date } = req.body; // Appointment date

    try {
        // Find customer
        const customer = await Customer.findByPk(id, {
            include: [{ model: Service }]
        });

        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        if (!customer.serviceId) {
            return res.status(400).json({ error: "Customer does not have an assigned service." });
        }

        // Create appointment
        const appointment = await Appointment.create({
            appointmentDate: date,
            customerId: customer.id,
            serviceId: customer.serviceId
        });

        res.status(201).json({
            success: true,
            message: "Appointment scheduled successfully",
            data: appointment
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to assign appointment", details: error.message });
    }
    }
};

module.exports = appointmentController;