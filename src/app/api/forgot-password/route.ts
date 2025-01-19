import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { connectMongoDB } from "@/lib/db";
import { sendOTPEmail } from "@/utils/sendEmail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    await connectMongoDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    await sendOTPEmail(email, otp);

    return NextResponse.json(
      { success: true, message: "OTP sent to email." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "An error occurred while sending the OTP." },
      { status: 500 }
    );
  }
}
