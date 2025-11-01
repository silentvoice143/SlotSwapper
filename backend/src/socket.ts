import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    path: "/ws-chat",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Client connected:", socket.id);

    const token = socket.handshake.auth?.token || null;
    const userId = socket.handshake.auth?.userId || null;
    console.log("🔑 Auth data:", { token, userId }, process.env.JWT_SECRET);

    if (token) {
      try {
        const decoded: any = jwt.verify(
          token,
          process.env.JWT_SECRET || "secret"
        );
        console.log("✅ Token verified:", decoded);
        socket.data.userId = decoded.id || userId;
        socket.join(`user:${socket.data.userId}`);
        console.log(`👤 Authenticated user: ${socket.data.userId}`);
      } catch (err) {
        console.log("⚠️ Invalid token — connecting as guest", err);
      }
    }

    socket.emit("welcome", "✅ Connected to SlotSwapper WebSocket!");

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  console.log("⚙️ Socket.IO initialized");
  return io;
};
