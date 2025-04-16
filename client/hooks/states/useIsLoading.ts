import { create } from "zustand";

interface IsLoadingState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useIsLoading = create<IsLoadingState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));

export default useIsLoading;
