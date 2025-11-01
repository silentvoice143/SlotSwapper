import app from "./server";
import dotenv from "dotenv";
import http from "http";
import connectDB from "./connectDB/connect-mongo";
import { initSocket } from "./socket";

dotenv.config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

const startServer = async () => {
  try {
    connectDB();
    initSocket(server);

    server.listen(PORT, () => {
      const BASE_URL =
        process.env.NODE_ENV === "production"
          ? process.env.BACKEND_URL ||
            "https://slotswapper-backend-ol2r.onrender.com"
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
