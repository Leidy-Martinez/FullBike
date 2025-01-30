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

const validateCustomer = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(50).trim(),
        email: Joi.string().email().required().lowercase().trim(),
        phoneNumber: Joi.string().required().pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/).messages({
            'string.pattern.base': 'Phone number must be in format (XXX) XXX-XXXX'
        }),
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

module.exports = { 
    validateId,
    validateCustomer 
};