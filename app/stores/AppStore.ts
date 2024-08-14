import { create } from "zustand";

type AppStatus = "" | "loading" | "success" | "error";
type AppState = {
  status: AppStatus;
  setStatus: (status: AppStatus) => void;
};

export const useAppStore = create<AppState>((set) => ({
  status: "",
  setStatus: (status) => set({ status }),
}));
