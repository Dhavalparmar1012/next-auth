import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";

interface ResetPasswordRequestBody {
  password: string;
  email: string;
}

export async function POST(req: Request) {
  try {
    // Parse the JSON body
    const { password, email }: ResetPasswordRequestBody = await req.json();

    // Connect to MongoDB
    await connectMongoDB();

    // Find user by OTP
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    await User.updateOne({ email }, { password: hashedPassword });
    return NextResponse.json(
      { success: true, message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during password reset:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while resetting the password",
      },
      { status: 500 }
    );
  }
}
