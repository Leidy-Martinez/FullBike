const Joi = require('joi');

const validateId = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.number().integer().positive().required()
    });

    const { error } = schema.validate({ id: parseInt(req.params.id) });
    
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID',
            error: error.details[0].message
        });
    }
    next();
};

// Validate Service Name

const validateServiceName = (req, res, next) => {
    const allowedServices = ['Silver', 'Bronze', 'Gold', "silver", "bronze", "gold"];
    const { name } = req.body;

    try {
        if (!allowedServices.includes(name)) {
            return res.status(400).json({ error: "Invalid service name. Allowed services: 'Silver', 'Bronze', 'Gold." });
        }
        next(); 
    } catch (error) {
        res.status(500).json({ error: "Failed to validate service name" });
    }
};

const validateCustomer = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(50).trim(),
        email: Joi.string().email().required().lowercase().trim(),
        // phoneNumber: Joi.string().required().pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/).messages({
        //     'string.pattern.base': 'Phone number must be in format (XXX) XXX-XXXX'
        // }),
        phoneNumber: Joi.string().required().min(10).max(15).trim(),
        password: Joi.string().required().min(6).max(50).trim()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
};

const validateMechanic = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(50)
            .messages({
                'string.empty': 'Name is required',
                'string.min': 'Name must be at least 2 characters',
                'string.max': 'Name cannot exceed 50 characters'
            }),

        email: Joi.string().required().email()
            .messages({
                'string.empty': 'Email is required',
                'string.email': 'Please provide a valid email'
            }),

        phoneNumber: Joi.string().required()
            // .pattern(/^\+?[\d\s-]+$/)
            .messages({
                'string.empty': 'Phone number is required',
                'string.pattern.base': 'Please provide a valid phone number'
            }),

        availability: Joi.string().valid('available', 'unavailable')
            .default('available')
            .messages({
                'any.only': 'Availability must be either available or unavailable'
            })
    });

    const { error } = schema.validate(req.body);
    
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    next();
};

const validateAppointment = async (req, res, next) => {
    const schema = Joi.object({
        customerId: Joi.number().integer().positive().required(),
        // mechanicId: Joi.number().integer().positive().required(),
        serviceId: Joi.number().integer().positive().required(),
        appointmentDate: Joi.date().required(),
    });

    const { error } = schema.validate(req.body);
    
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    next();
}

module.exports = { 
    validateId,
    validateServiceName,
    validateCustomer,
    validateMechanic,
    validateAppointment
};