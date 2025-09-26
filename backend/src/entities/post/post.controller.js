import { generateResponse } from "../../lib/responseFormate.js";
import PostService from "./post.service.js";


class PostController {
  static async createPost(req, res) {
    try {
      const post = await PostService.createPost({
        ...req.body,
        authorId: req.user._id, 
      });
      generateResponse(res, 201, true, "Post created successfully", post);
    } catch (err) {
      generateResponse(res, 400, false, err.message, null);
    }
  }

  static async getAllPosts(req, res) {
    try {
      const { skip = 0, limit = 20 } = req.query;
      const posts = await PostService.getAllPosts(Number(skip), Number(limit));
      generateResponse(res, 200, true, "Posts fetched successfully", posts);
    } catch (err) {
      generateResponse(res, 400, false, err.message, null);
    }
  }

  static async getPostById(req, res) {
    try {
      const post = await PostService.getPostById(req.params.postId);
      if (!post) {
        return generateResponse(res, 404, false, "Post not found", null);
      }
      generateResponse(res, 200, true, "Post fetched successfully", post);
    } catch (err) {
      generateResponse(res, 400, false, err.message, null);
    }
  }

  static async updatePost(req, res) {
    try {
      const post = await PostService.updatePost(
        req.params.postId,
        req.user._id,
        req.body
      );
      if (!post) {
        return generateResponse(res, 404, false, "Post not found or unauthorized", null);
      }
      generateResponse(res, 200, true, "Post updated successfully", post);
    } catch (err) {
      generateResponse(res, 400, false, err.message, null);
    }
  }

  static async deletePost(req, res) {
    try {
      const post = await PostService.deletePost(req.params.postId, req.user._id);
      if (!post) {
        return generateResponse(res, 404, false, "Post not found or unauthorized", null);
      }
      generateResponse(res, 200, true, "Post deleted successfully", post);
    } catch (err) {
      generateResponse(res, 400, false, err.message, null);
    }
  }

  static async addReaction(req, res) {
    try {
      const post = await PostService.addReaction(
        req.params.postId,
        req.user._id,
        req.body.type
      );
      generateResponse(res, 200, true, "Reaction added successfully", post);
    } catch (err) {
      generateResponse(res, 400, false, err.message, null);
    }
  }

  static async removeReaction(req, res) {
    try {
      const post = await PostService.removeReaction(req.params.postId, req.user._id);
      generateResponse(res, 200, true, "Reaction removed successfully", post);
    } catch (err) {
      generateResponse(res, 400, false, err.message, null);
    }
  }
}

export default PostController;
