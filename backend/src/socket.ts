// socket.ts
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

export let io: Server; // export reference

export const initSocket = (server: any) => {
  io = new Server(server, {
    path: "/ws-chat",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id);

    const token = socket.handshake.auth?.token || null;
    const userId = socket.handshake.auth?.userId || null;

    if (token) {
      try {
        const decoded: any = jwt.verify(
          token,
          process.env.JWT_SECRET || "secret"
        );
        socket.data.userId = decoded.id || userId;
        socket.join(`user:${socket.data.userId}`);
        console.log(`👤 Authenticated user connected: ${socket.data.userId}`);
      } catch {
        console.log("⚠️ Invalid token, treating as guest");
      }
    } else {
      console.log("👥 Guest connected");
    }

    socket.emit("welcome", "✅ Connected to Study Ease WebSocket!");

    socket.on("chatMessage", (msg) => {
      console.log("📩 Public message:", msg);
      socket.broadcast.emit("chatMessage", msg);
    });

    socket.on("privateMessage", ({ toUserId, message }) => {
      if (!socket.data.userId) {
        return socket.emit(
          "error",
          "❌ You must be logged in to send private messages"
        );
      }

      console.log(
        `📨 Private message from ${socket.data.userId} → ${toUserId}: ${message}`
      );
      io.to(`user:${toUserId}`).emit("privateMessage", {
        from: socket.data.userId,
        message,
      });
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  console.log("⚙️ Socket.IO initialized");

  return io;
};
