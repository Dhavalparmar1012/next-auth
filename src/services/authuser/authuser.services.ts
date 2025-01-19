import axios, { AxiosError } from "axios";
import {
  ErrorResponse,
  ForgotPasswordResponse,
  LoginUserParams,
  LoginUserResponse,
  RegisterUserParams,
  RegisterUserResponse,
  VerifyOTPResponse,
} from "./types";
import { toast } from "react-toastify";

export class AuthServices {
  static loginUser = async (
    params: LoginUserParams
  ): Promise<LoginUserResponse | string> => {
    try {
      const res = await axios.post<LoginUserResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`,
        params,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.status === 200 && res.data.success) {
        return res.data; // Ensure the success flag is set to true
      } else {
        return "Invalid credentials"; // Handle invalid cases
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.message || "Error occurred");
    }
  };

  static registerUser = async (
    params: RegisterUserParams
  ): Promise<RegisterUserResponse | string> => {
    try {
      const response = await axios.post<RegisterUserResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`,
        params,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.data.success) toast.error(response.data.error);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.message || "Error occurred");
    }
  };

  static forgotPasswordEmail = async (
    email: string | null
  ): Promise<ForgotPasswordResponse | string> => {
    try {
      const response = await axios.post<ForgotPasswordResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/forgot-password`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.data.success) toast.error(response.data.error);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.message || "Error occurred");
    }
  };

  static otpVerification = async (
    otp: string | null
  ): Promise<VerifyOTPResponse | string> => {
    try {
      const response = await axios.post<VerifyOTPResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/verify-otp`,
        { otp },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.data.success) toast.error(response.data.error);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.message || "Error occurred");
    }
  };

  static resetPassword = async (
    email: string | null,
    password: string
  ): Promise<VerifyOTPResponse | string> => {
    try {
      const response = await axios.post<VerifyOTPResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reset-password`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.data.success) toast.error(response.data.error);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.message || "Error occurred");
    }
  };
}
