// middleware/auth.js
const mockUsers = require('../data/mockUsers');

// Mock authentication middleware
const authenticate = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required'
        });
    }

    // Find user by email
    const user = mockUsers.find(u => u.email === email);

    // If user doesn't exist
    if (!user) {
        return res.status(400).json({
            message: 'User not found'
        });
    }

    // Check if the password matches
    if (user.password !== password) {
        return res.status(400).json({
            message: 'Invalid password'
        });
    }

    // If authentication is successful, attach user data to the request
    req.user = user;
    next();
};

module.exports = authenticate;
