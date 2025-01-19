import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";

interface VerifyOtpRequestBody {
  otp: string;
}

export async function POST(req: Request) {
  try {
    // Parse the JSON body
    const { otp }: VerifyOtpRequestBody = await req.json();

    // Connect to MongoDB
    await connectMongoDB();

    // Find user with the provided OTP and check expiration
    const user = await User.findOne({ otp });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP" },
        { status: 400 }
      );
    }

    // Check if OTP has expired
    if (new Date(user.otpExpiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, message: "OTP has expired" },
        { status: 400 }
      );
    }

    // OTP is valid and not expired
    // Nullify the OTP so it cannot be reused
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    // OTP is valid and not expired
    return NextResponse.json(
      { success: true, message: "OTP verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during OTP verification:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while verifying OTP" },
      { status: 500 }
    );
  }
}
