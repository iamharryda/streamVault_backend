import express from "express";
import PostController from "./post.controller.js";
import { verifyToken } from "../../core/middlewares/authMiddleware.js";
// const authMiddleware = require("../middleware/auth"); // if you use JWT

const router = express.Router();

// CRUD
router.post("/",verifyToken ,PostController.createPost);
router.get("/", PostController.getAllPosts);
router.get("/:postId", PostController.getPostById);
router.put("/:postId",verifyToken, PostController.updatePost);
router.delete("/:postId", verifyToken, PostController.deletePost);

// Reactions
router.post("/:postId/react", verifyToken, PostController.addReaction);
router.delete("/:postId/react", verifyToken, PostController.removeReaction);

export default router;
