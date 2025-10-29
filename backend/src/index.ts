import { AppDataSource } from "./connectDB/data-source";
import app from "./server";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken"; // if using JWT
import { createSuperAdmin } from "./utils/createSuperAdmin";

dotenv.config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

const io = new Server(server, {
  path: "/ws-chat",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);

  // Extract login info from handshake
  const token = socket.handshake.auth?.token || null;
  const userId = socket.handshake.auth?.userId || null;

  if (token) {
    try {
      // (optional) validate JWT token
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET || "secret"
      );
      socket.data.userId = decoded.id || userId; // store in socket session
      socket.join(`user:${socket.data.userId}`); // private room
      console.log(`👤 Authenticated user connected: ${socket.data.userId}`);
    } catch (err) {
      console.log("⚠️ Invalid token, treating as guest");
    }
  } else {
    console.log("👥 Guest connected");
  }

  // Public welcome
  socket.emit("welcome", "✅ Connected to Study Ease WebSocket!");

  // Public chat
  socket.on("chatMessage", (msg) => {
    console.log("📩 Public message:", msg);
    socket.broadcast.emit("chatMessage", msg); // broadcast to others
  });

  // Private message (only for logged-in users)
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

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Database connected");

    // Create super admin if not exists
    await createSuperAdmin();

    server.listen(PORT, () => {
      const BASE_URL =
        process.env.NODE_ENV === "production"
          ? process.env.BACKEND_URL ||
            "https://study-ease-nodejs-backend.onrender.com"
          : `http://localhost:${PORT}`;

      console.log(`🚀 Server running at ${BASE_URL}`);
      console.log(`📑 Swagger docs at ${BASE_URL}/api-docs`);
      console.log(
        `🔗 Socket.io at ws://${BASE_URL.replace(/^https?:\/\//, "")}/ws-chat`
      );
    });
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
};

startServer();
