import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserData {
  name: string;
  telegramId: string;
}

interface AuthState {
  isLoggedIn: boolean;
  userData: UserData;
  login: () => void;
  logout: () => void;
  setUserData: (data: UserData) => void;
}

export const useStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userData: {
        name: "",
        telegramId: "",
      },
      login: () => set({ isLoggedIn: true }),
      logout: () =>
        set({
          isLoggedIn: false,
          userData: { name: "", telegramId: "" },
        }),
      setUserData: (data: UserData) => set({ userData: data }),
    }),
    {
      name: "auth-storage",
    }
  )
);
