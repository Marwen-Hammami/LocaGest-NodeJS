// Import the User model
import User from '../models/user.js';

// Create a new user
export default function createUser(req, res) {
    const { firstName, lastName, email, password, phoneNumber, dateOfBirth, online } = req.body;

    // Validate input data (e.g., check if required fields are present)
    if (!firstName || !lastName || !email) {
        return res.status(400).json({ error: 'First name, last name, and email are required fields.' });
    }

    // Create a new user instance
    const newUser = new User({
        firstName,
        lastName,
        email,
        password, // Remember to hash the password before saving it!
        phoneNumber,
        dateOfBirth,
        online,
    });

    // Save the user to the database
    newUser.save()
        .then(savedUser => {
            res.status(201).json(savedUser);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
}

// Rest of your code...


// Retrieve all users
export function getAllUsers(req, res) {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
}

// Update a user
export function updateUser(req, res) {
    const userId = req.params.id;
    const { firstName, lastName, email, phoneNumber, dateOfBirth, online } = req.body;

    User.findByIdAndUpdate(userId, {
        firstName,
        lastName,
        email,
        phoneNumber,
        dateOfBirth,
        online,
    }, { new: true }) // Return the updated user
        .then(updatedUser => {
            res.status(200).json(updatedUser);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
}

// Delete a user
export function deleteUser(req, res) {
    const userId = req.params.id;

    // Find the user by ID and delete
    User.findByIdAndDelete(userId)
        .then(deletedUser => {
            res.status(200).json(deletedUser);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
}
