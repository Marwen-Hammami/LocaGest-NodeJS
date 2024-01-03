import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, text, attachment) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      attachments: [{ filename: 'qr_code.png', content: attachment }]
    });

    console.log(`Message sent: ${info.messageId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default sendEmail;
