import User from '../models/user.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import transporter from '../emailConfig.js';
import otpGenerator from 'otp-generator';
import jwt from 'jsonwebtoken';
import twilio from 'twilio';
import { FileUpload } from '../middlewares/multer-config.js';


const saltRounds = 10;
const secretKey = '756d47db75d3e5fdd75aed04700046c52f0d6125ac8ba18eba1b4c3c3552aadf';
const OTP_EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds

// Create user route with Multer middleware for image upload
export function createUser(req, res) {
    // Use Multer middleware to handle image upload
    FileUpload(req, res, function (err) {
                if (err) {
            console.error('Error uploading image:', err);
            return res.status(500).json({ error: 'Error uploading image.' });
        }

        const {
            username,
            email,
            password,
            firstName,
            lastName,
            rate,
            specialization,
            experience,
            roles,
            phoneNumber,
            creditCardNumber,
        } = req.body;

        // Validate input data
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required fields.' });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format.' });
        }

        // Validate the roles against a list of allowed roles
        const allowedRoles = ['admin', 'technician', 'client'];
        if (!allowedRoles.includes(roles)) {
            return res.status(400).json({ error: 'Invalid roles provided.' });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        // Generate OTP
        const otpCode = otpGenerator.generate(6, { upperCase: false, specialChars: false });

        // Set the expiration time for OTP
        const otpExpiration = Date.now() + OTP_EXPIRATION_TIME;

        // Extract image filename from Multer
        const image = req.file ? req.file.filename : null;

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
            roles,
            phoneNumber,
            creditCardNumber,
            image,
            otpCode,
            otpExpiration,
            isVerified: false,
        });

        // Save the user to the database
        newUser.save()
            .then(savedUser => {
                const verificationLink = `http://localhost:9090/User/verify-email?email=${encodeURIComponent(savedUser.email)}&otp=${encodeURIComponent(otpCode)}`;

                const mailOptions = {
                    from: 'maher.karoui@esprit.tn',
                    to: savedUser.email,
                    subject: 'Account Verification',
                    text: `Thank you for creating an account. Please click on the following link to verify your email:\n\n${verificationLink}`,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return res.status(500).json({ error: error.message });
                    }
                    res.status(201).json(savedUser);
                });
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            });
    });
}








/*
export function createUser(req, res) {
    const { username, email, password, firstName, lastName, rate, specialization, experience, roles } = req.body;

    // Validate input data (e.g., check if required fields are present)
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required fields.' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Validate the roles against a list of allowed roles
    const allowedroles = ['admin', 'technician', 'client'];
    if (!allowedroles.includes(roles)) {
        return res.status(400).json({ error: 'Invalid roles provided.' });
    }

    // Hash the password before saving it
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Generate an OTP (One-Time Password)
    const otpCode = otpGenerator.generate(6, { upperCase: false, specialChars: false });

    // Set the expiration time for the OTP
    const otpExpiration = Date.now() + OTP_EXPIRATION_TIME;

    // Create a new user instance with OTP details
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        rate,
        specialization,
        experience,
        roles,
        otpCode,
        otpExpiration,
        isVerified: false, // Add a field to track email verification status
    });

    // Save the user to the database
    newUser.save()
        .then(savedUser => {
            // Send an email with the verification link
            const verificationLink = `http://localhost:9090/User/verify-email?email=${encodeURIComponent(savedUser.email)}&otp=${encodeURIComponent(otpCode)}`;

            const mailOptions = {
                from: 'maher.karoui@esprit.tn', // replace with your email
                to: savedUser.email,
                subject: 'Account Verification',
                text: `Thank you for creating an account. Please click on the following link to verify your email:\n\n${verificationLink}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                res.status(201).json(savedUser);
            });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
}*/

export async function updateUserUsername(req, res) {
    try {
        const userId = req.params.id;
        const { username } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.username = username;
        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function updateUserPhone(req, res) {
    try {
        const userId = req.params.id;
        const { phoneNumber } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.phoneNumber = phoneNumber;
        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateUserEmail(req, res) {
    try {
        const userId = req.params.id;
        const { email } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.email = email;
        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateUserPassword(req, res) {
    try {
        const userId = req.params.id;
        const { password } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.password = bcrypt.hashSync(password, saltRounds);
        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Get a user by ID
export function GetUser(req, res) {
    const userId = req.params.id;
  
    User.findById(userId)
      .then(user => {
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
        res.status(200).json(user);
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  }

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
    const { username, email, password, firstName, lastName, creditCardNumber } = req.body;

    User.findByIdAndUpdate(userId, {
        username,
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        creditCardNumber,
       
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
                            email: user.email
                        };
                        const token = jwt.sign(userData, secretKey);

                        res.status(200).json({ userData, token });
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

const accountSid = 'ACf91e1b74b1c8896aa6888016ab2aa3ee';
const authToken = '85479a5ad6341e434caf2e8ec9fa35e2';
const twilioPhoneNumber = '+12512209884';
const client = twilio(accountSid, authToken);

export function forgotPasswordSMS(req, res) {
    const { email } = req.body;

    // Generate an OTP (e.g., a 6-digit code)
    const otpCode = otpGenerator.generate(6, { upperCase: false, specialChars: false });

    // Set the expiration time for the OTP (e.g., 10 minutes)
    const otpExpiration = Date.now() + 600000;

    // Update the user's otpCode and otpExpiration in the database
    User.findOneAndUpdate(
        { email },
        { otpCode, otpExpiration },
        { new: true }
    )
    .then(user => {
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Log the updated user data
        console.log('Updated User Data:', user);

        // Ensure the phone number is in the E.164 format
        const phoneNumberE164 = `+21628723453`;  // Replace with the user's phone number field
        console.log('Sending SMS to:', phoneNumberE164);

        // Use Twilio to send the OTP via SMS
        client.messages.create({
            body: `Your OTP for password reset is: ${otpCode}`,
            from: twilioPhoneNumber,
            to: phoneNumberE164,
        })
        .then(() => {
            res.status(200).json({ message: 'Reset OTP sent to your phone.' });
        })
        .catch(error => {
            console.error('Error sending SMS:', error);
            res.status(500).json({ error: 'Error sending OTP via SMS.' });
        });
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
}






export function forgotPassword(req, res) {
    const { email } = req.body;

    // Generate an OTP (e.g., a 6-digit code)
    const otpCode = otpGenerator.generate(6, { upperCase: false, specialChars: false });

    // Set the expiration time for the OTP (e.g., 10 minutes)
    const otpExpiration = Date.now() + 600000;

    // Update the user's otpCode and otpExpiration in the database
    User.findOneAndUpdate(
        { email },
        { otpCode, otpExpiration },
        { new: true }
    )
    .then(user => {
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Log the updated user data
        console.log('Updated User Data:', user);

        // Use the OTP in the email
        const mailOptions = {
            from: 'maher.karoui@esprit.tn', // replace with your email
            to: user.email,
            subject: 'Password Reset',
            text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
                `Please use the following OTP (One-Time Password) to complete the process:\n\n` +
                `${otpCode}\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json({ message: 'Reset OTP sent to your email.' });
        });
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
}

export async function verifyOTP(req, res) {
    const { email, otpCode } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ error: 'User not found.' });
      }
  
      console.log('Provided OTP Code:', otpCode);
      console.log('Stored OTP Code:', user.otpCode);
      console.log('OTP Expiration:', user.otpExpiration);
  
      // Check if OTP code and expiration exist
      if (!user.otpCode || !user.otpExpiration) {
        console.log('OTP data missing.');
        return res.status(400).json({ error: 'Invalid or expired OTP code.' });
      }
  
      // Validate the OTP
      const isOTPValid = user.otpCode === otpCode && user.otpExpiration >= Date.now();
      console.log('Is OTP Valid?', isOTPValid);
  
      res.status(200).json({ isOTPValid });
    } catch (error) {
      console.log('Error verifying OTP:', error.message);
      res.status(500).json({ error: error.message });
    }
  }
  export async function newPassword(req, res) {
    const { email, password, confirmPassword } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ error: 'User not found.' });
      }
  
      // Check if password and confirm password match
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Password and confirm password do not match.' });
      }
  
      // Update the user's password
      user.password = bcrypt.hashSync(password, saltRounds);
      user.otpCode = undefined;
      user.otpExpiration = undefined;

      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
      console.log('Error updating password:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

export async function resetPassword(req, res) {
    const { email, otpCode, newPassword } = req.body;
   

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User not found.' });
        }

        console.log('Provided OTP Code:', otpCode);
        console.log('Stored OTP Code:', user.otpCode);
        console.log('OTP Expiration:', user.otpExpiration);

        // Check if OTP code and expiration exist
        if (!user.otpCode || !user.otpExpiration) {
            console.log('OTP data missing.');
            return res.status(400).json({ error: 'Invalid or expired OTP code.' });
        }

        // Validate the OTP
        if (user.otpCode !== otpCode || user.otpExpiration < Date.now()) {
            console.log('Invalid or expired OTP code.');
            return res.status(400).json({ error: 'Invalid or expired OTP code.' });
        }

        // Update the user's password and clear the OTP fields
        user.password = bcrypt.hashSync(newPassword, saltRounds);
        user.otpCode = undefined;
        user.otpExpiration = undefined;

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
        console.log('Error resetting password:', error.message);
        res.status(500).json({ error: error.message });
    }
}
export function isUserVerified(req, res) {
    const { email } = req.body;

    // Find the user by email
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            // Check if OTP code and expiration exist
            if (!user.otpCode || !user.otpExpiration) {
                return res.status(200).json({ verified: false });
            }

            // Check if OTP code is still valid
            if (user.otpExpiration >= Date.now()) {
                // Send a verification email (optional)
                const mailOptions = {
                    from: 'maher.karoui@esprit.tn', // replace with your email
                    to: user.email,
                    subject: 'Account Verified',
                    text: 'Your account has been verified successfully.',
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return res.status(500).json({ error: error.message });
                    }
                    // If the email is sent successfully, return verified status
                    res.status(200).json({ verified: true });
                });
            } else {
                // Clear the expired OTP fields
                user.otpCode = undefined;
                user.otpExpiration = undefined;

                // Save the user document without OTP fields
                user.save()
                    .then(() => {
                        // Send an email notifying about expiration (optional)
                        const mailOptions = {
                            from: 'maher.karoui@esprit.tn', // replace with your email
                            to: user.email,
                            subject: 'OTP Expiration',
                            text: 'Your OTP has expired. Please request a new OTP for verification.',
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return res.status(500).json({ error: error.message });
                            }
                            // If the email is sent successfully, return verified status
                            res.status(200).json({ verified: false });
                        });
                    })
                    .catch(error => res.status(500).json({ error: error.message }));
            }
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
}



//Verify email
export async function verifyEmail(req, res) {
    const { email, otp } = req.query;
    console.log('Received email:', email);
    console.log('Received otp:', otp);

    try {
        // Find the user by email
        const user = await User.findOne({ email, otpCode: otp, isVerified: false });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or OTP.' });
        }

        // Check if OTP code is still valid
        if (user.otpExpiration >= Date.now()) {
            // Update the user's verification status
            user.isVerified = true;

            // Clear the OTP fields
            user.otpCode = undefined;
            user.otpExpiration = undefined;

            // Save the updated user
            await user.save();

            return res.status(200).json({ message: 'Email verification successful.' });
        } else {
            // Clear the expired OTP fields
            user.otpCode = undefined;
            user.otpExpiration = undefined;

            // Save the user document without OTP fields
            await user.save();

            return res.status(400).json({ error: 'Invalid or expired OTP code.' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}