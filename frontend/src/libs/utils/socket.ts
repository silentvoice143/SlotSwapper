import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

// Use lazy initialization so the socket is created only when needed
export const socket = io(SOCKET_URL, {
  path: "/ws-chat",
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false, // connect manually after setting auth
});

// Function to connect socket (with or without token)
export const connectSocket = (token?: string, userId?: string) => {
  if (socket.connected) return socket;

  // Set auth only if token is available
  socket.auth = token
    ? { token, userId }
    : { userId: userId || "guest-" + Math.random().toString(36).slice(2) };

  socket.connect();
  return socket;
};

export const disconnectSocket = () => {
  if (socket.connected) {
    console.log("🔌 Disconnecting socket:", socket.id);
    socket.removeAllListeners(); // optional but good for cleanup
    socket.disconnect();
  }
};
