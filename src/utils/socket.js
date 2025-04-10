import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

let socket = null; // 🔁 Shared instance

export const createSocketConnection = () => {
  if (socket) return socket; // Reuse if already created

  const isLocal = location.hostname === "localhost";

  socket = isLocal
    ? io(BASE_URL || "http://localhost:3000") // fallback if needed
    : io("/", { path: "/api/socket.io" });

  return socket;
};
