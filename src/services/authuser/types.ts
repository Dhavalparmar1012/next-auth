import { GenericResponse } from "@/types/api/ApiGenericResponse";

export type LoginUserParams = {
  email: string;
  password: string;
};

export interface LoginUserResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface RegisterUserParams {
  name: string;
  email: string;
  password: string;
}

export type RegisterUserData = {
  _id: string;
  name: string;
  email: string;
  role: string; // Example: "user" or "admin"
  createdAt: string;
  updatedAt: string;
};

export type RegisterUserResponse = GenericResponse & {
  data: RegisterUserData;
};

export type ForgotPasswordResponse = GenericResponse & {
  data: string;
};

export type VerifyOTPResponse = GenericResponse & {
  data: string;
};

export interface ErrorResponse {
  message: string;
}
