import express from 'express';
import { createUser,getAllUsers,updateRoleByEmail, updateUser, deleteUser, getUserCount ,createUserAdmin, signInUser ,forgotPassword , resetPassword ,verifyEmail, forgotPasswordSMS, updateUserUsername, updateUserPhone, updateUserEmail,newPassword, updateUserPassword , GetUser, verifyOTP, updateRoleByUsername, signInUserAdmin, banUser, unbanUser, banUserWithDuration  } from '../controller/user.js';
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

// Reset password WITH SMS
router.post('/sms', forgotPasswordSMS);

router.post('/newpass', newPassword);

router.post('/otp', verifyOTP);

router.post('/banUser/:id', banUser);
router.post('/UnbanUser/:id', unbanUser);
router.post('/banUserWithDuration/:id', banUserWithDuration);







//verify via mail
router.get('/verify-email', verifyEmail);

// Protected routes (authentication required)

// Authentication middleware applied to the following routes

// Get all users
router.get('/all', getAllUsers);
router.get('/count', getUserCount);


// Update a user
router.put('/:id', updateUser);
router.put('/username/:id', updateUserUsername);
router.put('/phone/:id', updateUserPhone);
router.put('/email/:id', updateUserEmail);
router.put('/pass/:id', updateUserPassword);



router.put('/role/:username', updateRoleByUsername);
router.put('/roles/:email', updateRoleByEmail);





router.get('/get/:id', GetUser);




// Delete a user
router.delete('/delete/:id', deleteUser);







export default router;