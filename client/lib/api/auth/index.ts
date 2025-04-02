import api from "../index";
import { SigninData, SignupData, SignupResponse, SigninResponse } from "@/types/api.types";

export const signin = async (data: SigninData): Promise<SigninResponse> => {
    const response = await api.post("/auth/signin", data);
    return response.data;
};

export const signup = async (data: SignupData): Promise<SignupResponse> => {
    const response = await api.post("/auth/signup", data);
    return response.data;
};
