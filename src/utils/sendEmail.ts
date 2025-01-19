import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Send email function
export async function sendOTPEmail(to: any, otp: any) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "Your OTP for Registration",
    text: `Your OTP is: ${otp}`,
    html: `<p>Your OTP is: <b>${otp}</b></p>`, // Optional HTML formatting
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Failed to send email:", error);
  }
}
