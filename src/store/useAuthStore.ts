import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { IAuthStore } from "./types";
import { createJSONStorage } from "zustand/middleware";

const creds: IAuthStore["creds"] = {
  email: null,
  authState: "logged-out",
  role: null
};

const useAuthStore = create<IAuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        creds,
        getIsLogin: () => get().creds.authState === "logged-in",
        resetCreds: () => set({ creds }),
        updateCreds: (creds) => set({ creds: { ...get().creds, ...creds } }),
      }),
      { name: "useAuthStore", storage: createJSONStorage(() => localStorage) },
    ),
  ),
);

export { useAuthStore };
