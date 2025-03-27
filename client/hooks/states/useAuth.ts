import { create } from "zustand";

interface AuthState {
    isAuthenticated: boolean;
    userToken: string | null;
    setUserToken: (token: string) => void;
    logout: () => void;
}

const useAuth = create<AuthState>((set) => ({
    isAuthenticated: false,
    userToken: null,
    setUserToken: (token) => {
        set({ isAuthenticated: true, userToken: token });
        localStorage.setItem("userToken", token);
    },
    logout: () => {
        set({ isAuthenticated: false, userToken: null });
        localStorage.removeItem("userToken");
    },
}));

export default useAuth;