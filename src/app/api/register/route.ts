import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { hashPassword } from "@/helpers/authHelper";
import { connectMongoDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Connect to MongoDB
    await connectMongoDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user in the database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully.",
        data: newUser,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error during registration: ", error);

    // Return an error response
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while registering the user.",
      },
      { status: 500 }
    );
  }
}
