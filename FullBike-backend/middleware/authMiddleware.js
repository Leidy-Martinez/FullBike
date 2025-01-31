const { Customer } = require('../models');

// Mock authentication middleware
const authenticate = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required'
        });
    }

    try {
        // Find user in database
        const user = await Customer.findOne({ 
            where: { email } 
        });

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        // Verify password
        if (user.password !== password) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({
            message: 'Authentication failed'
        });
    }
};

module.exports = authenticate;
