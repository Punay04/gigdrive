import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  userData: {
    name: string;
    telegramId: string;
  };
}

export const useStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
      userData: {
        name: "",
        telegramId: "",
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
