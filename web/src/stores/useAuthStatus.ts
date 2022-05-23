import create from "zustand";

interface AuthStatusState {
  id: number | null;
  status: "loggedIn" | "loggedOut" | "idle";
}

interface AuthStatusActions {
  setLoggedIn: (id: number) => void;
  setLoggedOut: () => void;
}

type AuthStatusStore = AuthStatusState & AuthStatusActions;

export const useAuthStatus = create<AuthStatusStore>((set) => ({
  id: null,
  status: "idle",
  setLoggedIn: (id) => set({ status: "loggedIn", id }),
  setLoggedOut: () => set({ id: null, status: "loggedOut" }),
}));
