const nodemailer = require("nodemailer");

const sendEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  await transporter.sendMail({
    from: `"Traverix" <${process.env.EMAIL}>`,
    to,
    subject: "Traverix - Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 30px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2563eb;">Traverix 🌍</h2>
        <h3>Password Reset Request</h3>
        <p>Your OTP for password reset is:</p>
        <div style="font-size: 36px; font-weight: bold; color: #2563eb; letter-spacing: 8px; text-align: center; padding: 20px; background: #f0f4ff; border-radius: 8px;">
          ${otp}
        </div>
        <p style="margin-top: 20px; color: #666;">This OTP is valid for <strong>10 minutes</strong>.</p>
        <p style="color: #666;">If you didn't request this, please ignore this email.</p>
        <hr style="margin-top: 30px;"/>
        <p style="color: #999; font-size: 12px;">© 2026 Traverix. All Rights Reserved.</p>
      </div>
    `
  });
};

module.exports = sendEmail;