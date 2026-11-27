
const User = require('../models/userModel');

// Get all users
const getUsers = async (request, response) => {
    try {
        const users = await User.find();

        response.status(200).json(users);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

// Add a user
const createUser = async (request, response) => {
    try {
        const user = await User.create(request.body);

        response.status(201).json(user);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
};

// Get one user
const getUser = async (request, response) => {
    try {
        const user = await User.findById(request.params.id);

        if (!user) {
            return response.status(404).json({
                message: 'User not found'
            });
        }

        response.status(200).json(user);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
};

// Update a user
const updateUser = async (request, response) => {
    try {
        const user = await User.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true, runValidators: true }
        );

        if (!user) {
            return response.status(404).json({
                message: 'User not found'
            });
        }

        response.status(200).json(user);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
};

// Delete a user
const deleteUser = async (request, response) => {
    try {
        const user = await User.findByIdAndDelete(request.params.id);

        if (!user) {
            return response.status(404).json({
                message: 'User not found'
            });
        }

        response.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
};
