import express from 'express';
import {
  createUser,
  getAllUsers,
  calculateStatistics,
  updateRoleById,
  updateUser,
  deleteUser,
  getUserCount,
  createUserAdmin,
  signInUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  forgotPasswordSMS,
  updateUserUsername,
  updateUserPhone,
  updateUserEmail,
  newPassword,
  updateUserPassword,
  GetUser,
  verifyOTP,
  signInUserAdmin,
  banUser,
  unbanUser,
  banUserWithDuration,
  getAllUsersFlutter,
  archiveUser,
} from '../controllers/user.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

// Create a new user
router.post('/signup', createUser);
router.post('/signupA', createUserAdmin);

// Sign in
router.post('/signing', signInUser);
router.post('/signingA', signInUserAdmin);

// Forgot password
router.post('/password', forgotPassword);

// Reset password
router.post('/reset-password', resetPassword);

// Reset password with SMS
router.post('/sms', forgotPasswordSMS);

// Set new password
router.post('/newpass', newPassword);

// Verify OTP
router.post('/otp', verifyOTP);

// Archive a user
router.post('/archive/:id', archiveUser);

// Ban and unban a user
router.post('/banUser/:id', banUser);
router.post('/UnbanUser/:id', unbanUser);
router.post('/banUserWithDuration/:id', banUserWithDuration);

// Verify via email
router.get('/verify-email', verifyEmail);

// Protected routes (authentication required)

// Authentication middleware applied to the following routes

// Get all users
router.get('/all', getAllUsersFlutter);
router.get('/count', getUserCount);
router.get('/', getAllUsers);


// Update a user
router.put('/:id', updateUser);
router.put('/username/:id', updateUserUsername);
router.put('/phone/:id', updateUserPhone);
router.put('/email/:id', updateUserEmail);
router.put('/pass/:id', updateUserPassword);
router.post('/role/:id', updateRoleById);

// Get a user by ID
router.get('/get/:id', GetUser);

// Get statistics
router.get('/stat', calculateStatistics);

// Delete a user
router.delete('/delete/:id', deleteUser);

// Logout route handler
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    // Redirect the user to the login page or any other desired page
    res.redirect('/login');
  });
});

export default router;