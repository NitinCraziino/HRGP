import api from "../index";
import {
    SigninData,
    SignupData,
    SignupResponse,
    SigninResponse,
    MessageResponse,
    ForgotPasswordData,
    VerifyVerificationCodeData,
    ResetPasswordData,
    ResendVerificationCodeData,
} from "@/types/api.types";
import { authRoutes } from "@/config/api";

export const signin = async (data: SigninData): Promise<SigninResponse> => {
    const response = await api.post(authRoutes.signin, data);
    return response.data;
};

export const signup = async (data: SignupData): Promise<SignupResponse> => {
    const response = await api.post(authRoutes.signup, data);
    return response.data;
};

export const forgotPassword = async (data: ForgotPasswordData): Promise<MessageResponse> => {
    const response = await api.post(authRoutes.forgotPassword, data);
    return response.data;
};

export const verifyVerificationCode = async (data: VerifyVerificationCodeData): Promise<MessageResponse> => {
    const response = await api.post(authRoutes.verifyVerificationCode, data);
    return response.data;
};

export const resetPassword = async (data: ResetPasswordData): Promise<MessageResponse> => {
    const response = await api.post(authRoutes.resetPassword, data);
    return response.data;
};

export const resendVerificationCode = async (data: ResendVerificationCodeData): Promise<MessageResponse> => {
    const response = await api.post(authRoutes.resendVerificationCode, data);
    return response.data;
};
