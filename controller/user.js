<<<<<<< HEAD
import User from '../models/user.js';
import validator from 'validator';
import bcrypt from 'bcrypt';

const saltRounds = 10;

// Create a new user
export function createUser(req, res) {
    const { username, email, password, firstName, lastName, rate, specialization, experience, Roles } = req.body;

    // Validate input data (e.g., check if required fields are present)
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required fields.' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Validate the Roles against a list of allowed roles
    const allowedRoles = ['admin', 'technicien', 'client'];
    if (!allowedRoles.includes(Roles)) {
        return res.status(400).json({ error: 'Invalid Roles provided.' });
    }

    // Hash the password before saving it
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Create a new user instance
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        rate,
        specialization,
        experience,
        Roles,
=======
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
>>>>>>> origin/User
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

<<<<<<< HEAD
=======
// Rest of your code...


>>>>>>> origin/User
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
<<<<<<< HEAD
    const { username, email, password, firstName, lastName, creditCardNumber, rate, specialization, experience, Roles } = req.body;

    User.findByIdAndUpdate(userId, {
        username,
        email,
        password,
        firstName,
        lastName,
        creditCardNumber,
        rate,
        specialization,
        experience,
        Roles,
=======
    const { firstName, lastName, email, phoneNumber, dateOfBirth, online } = req.body;

    User.findByIdAndUpdate(userId, {
        firstName,
        lastName,
        email,
        phoneNumber,
        dateOfBirth,
        online,
>>>>>>> origin/User
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
<<<<<<< HEAD

// Sign in a user
export function signInUser(req, res) {
    const { email, password } = req.body;

    // Validate input data
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required fields.' });
    }

    // Sanitize the email input
    const sanitizedEmail = validator.escape(email);

    // Find the user by email
    User.findOne({ email: sanitizedEmail })
        .then(user => {
            if (!user) {
                return res.status(400).json({ error: 'Invalid email or password.' });
            }

            // Compare the provided password with the stored hashed password
            bcrypt.compare(password, user.password)
                .then((result) => {
                    if (result) {
                        // If they match, return only necessary data
                        const userData = {
                            id: user.id,
                            username: user.username,
                            email: user.email
                        };
                        res.status(200).json(userData);
                    } else {
                        res.status(400).json({ error: 'Invalid email or password.' });
                    }
                })
                .catch((error) => {
                    res.status(500).json({ error: error.message });
                });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
}

=======
>>>>>>> origin/User
