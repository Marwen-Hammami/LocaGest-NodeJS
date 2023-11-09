import express from 'express';
import { body } from 'express-validator';

import createUser, { getAllUsers, updateUser, deleteUser } from '../controller/user.js';

const router = express.Router();

// Create a new user
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
router.get('/', getAllUsers);

// Update a user
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

export default router;
