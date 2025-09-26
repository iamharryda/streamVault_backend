import express from "express";
import CommentController from "./comment.controller.js";
// const { verifyToken } = require("../../core/middlewares/authMiddleware"); // if you use JWT
// const authMiddleware = require("../middleware/auth"); // enable when ready

const router = express.Router();

// Create comment/reply
router.post("/:postId", /*authMiddleware,*/ CommentController.createComment);

// Get all comments for a post
router.get("/:postId", CommentController.getCommentsByPost);

// Get replies for a comment
router.get("/replies/:commentId", CommentController.getReplies);

// Update comment
router.put("/:commentId", /*authMiddleware,*/ CommentController.updateComment);

// Delete comment
router.delete("/:commentId", /*authMiddleware,*/ CommentController.deleteComment);

// Reactions
router.post("/:commentId/react", /*authMiddleware,*/ CommentController.addReaction);
router.delete("/:commentId/react", /*authMiddleware,*/ CommentController.removeReaction);

export default router;
