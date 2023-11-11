import express from 'express';
<<<<<<< HEAD
import { createUser, getAllUsers, updateUser, deleteUser , signInUser } from '../controller/user.js';
=======
import { body } from 'express-validator';

import createUser, { getAllUsers, updateUser, deleteUser } from '../controller/user.js';
>>>>>>> origin/User

const router = express.Router();

// Create a new user
<<<<<<< HEAD
router.post('/signup', createUser);

// Get all users
=======
router.post(
    '/',
    body('firstName').isString(),
    body('lastName').isString(),
    body('email').isEmail(),
    body('password').isString(),
    body('phoneNumber').isString(),
    body('dateOfBirth').isDate(),
    body('online').isBoolean(),
    createUser
);

// Retrieve all users
>>>>>>> origin/User
router.get('/', getAllUsers);

// Update a user
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

<<<<<<< HEAD
//sign in 
router.post('/signin', signInUser);


=======
>>>>>>> origin/User
export default router;
