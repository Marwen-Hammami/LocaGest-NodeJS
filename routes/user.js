import express from 'express';
import { createUser, getAllUsers, updateUser, deleteUser , signInUser } from '../controller/user.js';

const router = express.Router();

// Create a new user
router.post('/signup', createUser);

// Get all users
router.get('/', getAllUsers);

// Update a user
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

//sign in 
router.post('/signin', signInUser);


export default router;
