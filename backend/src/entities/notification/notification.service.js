import Notification from "./notification.model.js";
import { io } from "../../app.js";

class NotificationService {
  // create and emit notification
  static async createNotification({ receiverId, senderId, type, postId, commentId, message }) {
    const notification = await Notification.create({
      userId: receiverId,
      senderId,
      type,
      postId,
      commentId,
      message,
    });

    // real-time emit to the receiver (socket.io room by userId)
    io.to(receiverId.toString()).emit("notification", notification);

    return notification;
  }

  // fetch user notifications
  static async getUserNotifications(userId, skip = 0, limit = 20) {
    return await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("senderId", "username profileImage")
      .populate("postId", "mediaTitle mediaPoster")
      .populate("commentId", "content");
  }

  // mark one notification as read
  static async markAsRead(notificationId, userId) {
    return await Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { isRead: true },
      { new: true }
    );
  }

  // mark all as read
  static async markAllAsRead(userId) {
    return await Notification.updateMany({ userId }, { isRead: true });
  }
}

export default NotificationService;
