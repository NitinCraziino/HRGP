"use client";

import { create } from "zustand";
import { IUser } from "@/types";
import { getItemLocalStorage, setItemLocalStorage } from "@/lib/utils";

interface AuthState {
    isAuthenticated: boolean;
    userToken: string | null;
    setUserToken: (token: string) => void;
    logout: () => void;
    user: IUser | null;
    setUser: (user: IUser) => void;
}

const useAuth = create<AuthState>((set) => ({
    isAuthenticated: false,
    userToken: getItemLocalStorage("userToken") || null,
    user: getItemLocalStorage("user") ? JSON.parse(getItemLocalStorage("user")!) : null,
    setUserToken: (token) => {
        set({ isAuthenticated: true, userToken: token });
        setItemLocalStorage("userToken", token);
    },
    logout: () => {
        set({ isAuthenticated: false, userToken: null });
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
    },
    setUser: (user: IUser) => {
        set({ user });
        localStorage.setItem("user", JSON.stringify(user));
    },
}));

export default useAuth;