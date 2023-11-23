import express from 'express';
import { createUser, getAllUsers, updateUser, deleteUser , signInUser ,forgotPassword , resetPassword ,verifyEmail, forgotPasswordSMS  } from '../controller/user.js';
import { authenticate } from '../middlewares/authenticate.js';


const router = express.Router();
// Create a new user
router.post('/signup', createUser);

// Sign in
router.post('/signing', signInUser);

// Forgot password
router.post('/password', forgotPassword);

// Reset password
router.post('/reset-password', resetPassword);

// Reset password WITH SMS
router.post('/sms', forgotPasswordSMS);


//verify via mail
router.get('/verify-email', verifyEmail);

// Protected routes (authentication required)

// Authentication middleware applied to the following routes

// Get all users
router.get('/', getAllUsers);

// Update a user
router.put('/:id', updateUser);

router.use(authenticate);


// Delete a user
router.delete('/:id', deleteUser);







export default router;