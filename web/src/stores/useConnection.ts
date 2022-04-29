import create from "zustand";

interface WebSocketState {
  connection: WebSocket | null;
  status: "idle" | "connected" | "disconnected";
}

interface WebSocketActions {
  connect: (connection: WebSocket) => void;
  disconnect: () => void;
}

type WebSocketStore = WebSocketState & WebSocketActions;

export const useConnection = create<WebSocketStore>((set) => ({
  connection: null,
  status: "idle",
  connect: (connection) => set({ connection, status: "connected" }),
  disconnect: () => set({ connection: null, status: "disconnected" }),
}));
