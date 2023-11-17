import nodemailer from 'nodemailer';

// Use environment variables to store sensitive information
const EMAIL_USER = process.env.EMAIL_USER || 'maher.karoui@esprit.tn';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || 'zocc mybz laeo xvxw';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

export default transporter;
