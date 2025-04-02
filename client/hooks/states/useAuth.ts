"use client";

import { create } from "zustand";
import { getItemLocalStorage, setItemLocalStorage } from "@/lib/utils";
import { SigninResponse } from "@/types/api.types";

interface AuthState {
    isAuthenticated: boolean;
    userToken: string | null;
    user: SigninResponse['user'] | null;
    company: SigninResponse['company'] | null;
    setUserToken: (token: string) => void;
    logout: () => void;
    setUser: (user: SigninResponse['user']) => void;
    setCompany: (company: SigninResponse['company']) => void;
}

const useAuth = create<AuthState>((set) => {
    const storedToken = getItemLocalStorage("userToken");
    const storedUser = getItemLocalStorage("user");
    const storedCompany = getItemLocalStorage("company");

    return {
        isAuthenticated: !!storedToken,
        userToken: storedToken || null,
        user: storedUser ? JSON.parse(storedUser) : null,
        company: storedCompany ? JSON.parse(storedCompany) : null,

        setUserToken: (token) => {
            set({ isAuthenticated: true, userToken: token });
            setItemLocalStorage("userToken", token);
        },

        logout: () => {
            set({ isAuthenticated: false, userToken: null, user: null });
            localStorage.removeItem("userToken");
            localStorage.removeItem("user");
        },

        setUser: (user) => {
            set({ user, isAuthenticated: true });
            localStorage.setItem("user", JSON.stringify(user));
        },

        setCompany: (company) => {
            set({ company, isAuthenticated: true });
            localStorage.setItem("company", JSON.stringify(company));
        },
    };
});

export default useAuth;
