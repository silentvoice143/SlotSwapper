import { useEffect } from "react";
import { socket, connectSocket, disconnectSocket } from "../utils/socket";
import { useAppSelector } from "./useRedux";

export const useSocket = () => {
  const { token, userId } = useAppSelector((state) => state.auth);
  useEffect(() => {
    disconnectSocket();
    connectSocket(token as string, userId as string);

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("welcome", (msg) => {
      console.log("📡", msg);
    });

    socket.on("notification", (data) => {
      console.log("🔔 Notification:", data);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("welcome");
      socket.off("notification");
      socket.off("privateMessage");
      socket.off("disconnect");
    };
  }, [token, userId]);
};
