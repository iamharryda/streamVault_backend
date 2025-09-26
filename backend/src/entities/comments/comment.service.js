import Comment from "./comment.model.js";
import Post from "../post/post.model.js";

class CommentService {
  static async createComment(data) {
    const comment = new Comment(data);
    await comment.save();

    // increment post comment count
    await Post.findByIdAndUpdate(data.postId, { $inc: { commentCount: 1 } });

    return comment;
  }

  static async getCommentsByPost(postId, skip = 0, limit = 10) {
    return await Comment.find({ postId, parentCommentId: null, isDeleted: false })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "username email profileImage")
      .populate({
        path: "replies",
        match: { isDeleted: false },
        options: { sort: { createdAt: 1 } },
        populate: { path: "userId", select: "username email profileImage" },
      });
  }

  static async getReplies(parentCommentId, skip = 0, limit = 10) {
    return await Comment.find({ parentCommentId, isDeleted: false })
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "username email profileImage");
  }

  static async updateComment(commentId, userId, content) {
    return await Comment.findOneAndUpdate(
      { _id: commentId, userId, isDeleted: false },
      { content, isEdited: true, editedAt: new Date() },
      { new: true }
    );
  }

  static async deleteComment(commentId, userId) {
    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, userId },
      { isDeleted: true },
      { new: true }
    );

    if (comment) {
      await Post.findByIdAndUpdate(comment.postId, { $inc: { commentCount: -1 } });
      if (comment.isReply && comment.parentCommentId) {
        await Comment.findByIdAndUpdate(comment.parentCommentId, {
          $inc: { replyCount: -1 },
        });
      }
    }

    return comment;
  }

  static async addReaction(commentId, userId, type) {
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Comment not found");

    comment.reactions = comment.reactions.filter(
      (r) => r.userId.toString() !== userId.toString()
    );
    comment.reactions.push({ userId, type });

    comment.likeCount = comment.reactions.filter((r) => r.type === "like").length;
    comment.dislikeCount = comment.reactions.filter((r) => r.type === "dislike").length;

    await comment.save();
    return comment;
  }

  static async removeReaction(commentId, userId) {
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Comment not found");

    comment.reactions = comment.reactions.filter(
      (r) => r.userId.toString() !== userId.toString()
    );

    comment.likeCount = comment.reactions.filter((r) => r.type === "like").length;
    comment.dislikeCount = comment.reactions.filter((r) => r.type === "dislike").length;

    await comment.save();
    return comment;
  }
}

export default CommentService;
