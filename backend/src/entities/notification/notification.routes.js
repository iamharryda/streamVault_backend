import express from "express";
import NotificationController from "./notification.controller.js";
import { verifyToken } from "../../core/middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, NotificationController.getNotifications);
router.put("/:id/read", verifyToken, NotificationController.markAsRead);
router.put("/markAll/read", verifyToken, NotificationController.markAllAsRead);

export default router;
