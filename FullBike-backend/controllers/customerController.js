const mockUsers = require('../data/mockUsers');

const customerController = {
    // Mock login
    loginCustomer(req, res) {
        // If the authenticate middleware passes, this code will be executed
        const user = req.user;

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    },

    // Mock create customer
    createCustomer(req, res) {
        const { name, email, phoneNumber, password } = req.body;

        if (!name || !email || !phoneNumber|| !password) {
            return res.status(400).json({
                message: 'Name, email, phone number and password are required'
            });
        }

        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({
                message: 'User with this email already exists'
            });
        }

        // Create mock user and add to the list
        const newUser = { id: mockUsers.length + 1, name, email, phoneNumber, password };
        mockUsers.push(newUser);

        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
    },
    
    getAllCustomers( _, res) {
        res.status(200).json({
            customers: mockUsers
        });
    },

    getCustomerById(req, res) {
        const id = parseInt(req.params.id);
        const user = mockUsers.find(u => u.id === id);

        if (!user) {
            return res.status(404).json({
                message: 'ID not found'
            });
        }

        res.status(200).json({
            user
        });
    },

    updateCustomer(req, res) {
        const id = parseInt(req.params.id);
        const { name, email, phoneNumber, password } = req.body;

        if (!name || !email || !phoneNumber || !password) {
            return res.status(400).json({
                message: 'Name, email, phone number and password are required'
            });
        }

        const user = mockUsers.find(u => u.id === id);
        if (!user) {
            return res.status(404).json({
                message: 'ID not found'
            });
        }

        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.password = password;

        res.status(200).json({
            message: 'User updated successfully',
            user
        });
    },

    deleteCustomer(req, res) {
        const id = parseInt(req.params.id);
        const userIndex = mockUsers.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return res.status(404).json({
                message: 'ID not found'
            });
        }

        mockUsers.splice(userIndex, 1);

        res.status(200).json({
            message: 'User deleted successfully'
        });
    }

};

module.exports = customerController;
