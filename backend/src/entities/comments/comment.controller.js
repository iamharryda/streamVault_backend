import { generateResponse } from "../../lib/responseFormate.js";
import CommentService from "./comment.service.js";


class CommentController {
  static async createComment(req, res) {
    try {
      const comment = await CommentService.createComment({
        ...req.body,
        userId: req.user._id, // requires auth
      });
      generateResponse(res, 201, true, "Comment created successfully", comment);
    } catch (err) {
      generateResponse(res, 400, false, err.message, null);
    }
  }

  static async getCommentsByPost(req, res) {
    try {
      const { skip = 0, limit = 10 } = req.query;
      const comments = await CommentService.getCommentsByPost(
        req.params.postId,
        Number(skip),
        Number(limit)
      );
      generateResponse(res, 200, true, "Comments fetched successfully", comments);
    } catch (err) {
      generateResponse(res, 400, false, err.message, null);
    }
  }

  static async getReplies(req, res) {
    try {
      const { skip = 0, limit = 10 } = req.query;
      const replies = await CommentService.getReplies(
        req.params.commentId,
        Number(skip),
        Number(limit)
      );
      generateResponse(res, 200, true, "Replies fetched successfully", replies);
    } catch (err) {
      generateResponse(res, 400, false, err.message, null);
    }
  }

  static async updateComment(req, res) {
    try {
      const comment = await CommentService.updateComment(
        req.params.commentId,
        req.user._id,
        req.body.content
      );
      if (!comment) {
        return generateResponse(res, 404, false, "Comment not found or unauthorized", null);
      }
      generateResponse(res, 200, true, "Comment updated successfully", comment);
    } catch (err) {
      generateResponse(res, 400, false, err.message, null);
    }
  }

  static async deleteComment(req, res) {
    try {
      const comment = await CommentService.deleteComment(
        req.params.commentId,
        req.user._id
      );
      if (!comment) {
        return generateResponse(res, 404, false, "Comment not found or unauthorized", null);
      }
      generateResponse(res, 200, true, "Comment deleted successfully", comment);
    } catch (err) {
      generateResponse(res, 400, false, err.message, null);
    }
  }

  static async addReaction(req, res) {
    try {
      const comment = await CommentService.addReaction(
        req.params.commentId,
        req.user._id,
        req.body.type
      );
      generateResponse(res, 200, true, "Reaction added successfully", comment);
    } catch (err) {
      generateResponse(res, 400, false, err.message, null);
    }
  }

  static async removeReaction(req, res) {
    try {
      const comment = await CommentService.removeReaction(
        req.params.commentId,
        req.user._id
      );
      generateResponse(res, 200, true, "Reaction removed successfully", comment);
    } catch (err) {
      generateResponse(res, 400, false, err.message, null);
    }
  }
}

export default CommentController;
