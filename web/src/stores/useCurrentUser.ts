import create from "zustand";

interface CurrentUserState {
  id: number | null;
  status: "loggedIn" | "loggedOut" | "idle";
}

interface CurrentUserActions {
  setLoggedIn: (id: number) => void;
  setLoggedOut: () => void;
}

type CurrentUserStore = CurrentUserState & CurrentUserActions;

export const useCurrentUser = create<CurrentUserStore>((set) => ({
  id: null,
  status: "idle",
  setLoggedIn: (id) => set({ status: "loggedIn", id }),
  setLoggedOut: () => set({ id: null, status: "loggedOut" }),
}));
