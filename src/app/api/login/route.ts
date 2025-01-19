import jwt from "jsonwebtoken";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import { comparePasswords } from "@/helpers/authHelper";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    // Connect to MongoDB
    await connectMongoDB();
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 400 }
      );
    }

    // Compare the password
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.NEXT_APP_JWT_SECRET!,
      { expiresIn: "3d" }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login: ", error);

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while logging in.",
      },
      { status: 500 }
    );
  }
}
