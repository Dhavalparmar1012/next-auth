import mongoose, { Schema, models, Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  otp?: string | null;
  otpExpiresAt?: Date | null;
  role: "admin" | "user";
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiresAt: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "user"], // Ensure role is either 'admin' or 'user'
      default: "user",
    },
  },
  { timestamps: true }
);

export const User = models.User || mongoose.model<IUser>("User", userSchema);
