import NotificationService from "./notification.service.js";
import { generateResponse } from "../../lib/responseFormate.js";

class NotificationController {
  static async getNotifications(req, res) {
    try {
      const { skip = 0, limit = 20 } = req.query;
      const notifications = await NotificationService.getUserNotifications(
        req.user._id,
        Number(skip),
        Number(limit)
      );
      generateResponse(res, 200, true, "Notifications fetched successfully", notifications);
    } catch (err) {
      generateResponse(res, 500, false, err.message, null);
    }
  }

  static async markAsRead(req, res) {
    try {
      const updated = await NotificationService.markAsRead(req.params.id, req.user._id);
      if (!updated) {
        return generateRespon(res, 404, false, "Notification not found", null);
      }
      generateResponse(res, 200, true, "Notification marked as read", updated);
    } catch (err) {
      generateResponse(res, 500, false, err.message, null);
    }
  }

  static async markAllAsRead(req, res) {
    try {
      await NotificationService.markAllAsRead(req.user._id);
      generateResponse(res, 200, true, "All notifications marked as read", null);
    } catch (err) {
      generateResponse(res, 500, false, err.message, null);
    }
  }
}

export default NotificationController;
