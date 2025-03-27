import api from "../index";
import { SigninData } from "@/types/api.types";

export const signin = async (data: SigninData) => {
    const response = await api.post("/auth/signin", data);
    return response.data;
};
