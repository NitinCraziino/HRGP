"use client";

import { create } from "zustand";
import { IUser } from "@/types";
import { getItemLocalStorage, setItemLocalStorage } from "@/lib/utils";

interface AuthState {
    isAuthenticated: boolean;
    userToken: string | null;
    user: IUser | null;
    setUserToken: (token: string) => void;
    logout: () => void;
    setUser: (user: IUser) => void;
}

const useAuth = create<AuthState>((set) => {
    const storedToken = getItemLocalStorage("userToken");
    const storedUser = getItemLocalStorage("user");

    return {
        isAuthenticated: !!storedToken,
        userToken: storedToken || null,
        user: storedUser ? JSON.parse(storedUser) : null,

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
    };
});

export default useAuth;
