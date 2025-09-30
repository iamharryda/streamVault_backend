import express from "express";
import CommentController from "./comment.controller.js";
import { verifyToken } from "../../core/middlewares/authMiddleware.js";


const router = express.Router();

// Create comment/reply
router.post("/:postId", verifyToken, CommentController.createComment);

// Get all comments for a post
router.get("/:postId", CommentController.getCommentsByPost);

// Get replies for a comment
router.get("/replies/:commentId", CommentController.getReplies);

// Update comment
router.put("/:commentId", verifyToken,CommentController.updateComment);

// Delete comment
router.delete("/:commentId", verifyToken, CommentController.deleteComment);

// Reactions
router.post("/:commentId/react", verifyToken, CommentController.addReaction);
router.delete("/:commentId/react", verifyToken, CommentController.removeReaction);

export default router;
