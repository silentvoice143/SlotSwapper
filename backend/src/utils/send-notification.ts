// utils/sendNotification.ts
import { Notification } from "../models/notification.model";
import { io } from "../socket";
import { CustomException } from "../exception/custom-exception";

export const sendNotification = async (
  userId: string,
  title: string,
  message: string
) => {
  if (!userId || !title || !message) {
    throw new CustomException("Missing required notification fields", 400);
  }

  const notification = new Notification({
    user: userId,
    title,
    message,
  });
  await notification.save();

  io.to(`user:${userId}`).emit("notification", {
    title,
    message,
    createdAt: notification.createdAt,
  });

  console.log(`📢 Notification sent to user:${userId}`);
};
