import axios from "axios";
import { SERVER_URL } from "@/config";
import { DeleteParams, GetParams, PatchParams, PostParams, PutParams } from "@/types/api";

const api = axios.create({
    baseURL: `${SERVER_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

export const GET = async <T>({ route, params }: GetParams) => {
    const url = params ? `${route}/${params.postalCode}` : route;
    const response = await api.get<T>(url);
    return response.data;
};

export const POST = async <T>({ route, params, body }: PostParams) => {
    const url = params ? `${route}/${params.postalCode}` : route;
    const response = await api.post<T>(url, body);
    return response.data;
};

export const PUT = async <T>({ route, params, body }: PutParams) => {
    const url = params ? `${route}/${params.postalCode}` : route;
    const response = await api.put<T>(url, body);
    return response.data;
};

export const DELETE = async <T>({ route, params }: DeleteParams) => {
    const url = params ? `${route}/${params.postalCode}` : route;
    const response = await api.delete<T>(url);
    return response.data;
};

export const PATCH = async <T>({ route, params }: PatchParams) => {
    const url = params ? `${route}/${params.postalCode}` : route;
    const response = await api.patch<T>(url);
    return response.data;
};