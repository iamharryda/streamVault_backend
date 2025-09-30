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
  return await Comment.find({ postId, parentCommentId: null })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("userId", "username profileImage") 
    .populate({
      path: "replies", // virtual populate
      options: { sort: { createdAt: 1 }, limit: 5 }, 
      populate: { path: "userId", select: "username profileImage" },
    });
}


  static async getReplies(parentCommentId, skip = 0, limit = 10) {
    return await Comment.find({ parentCommentId})
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "username email profileImage");
  }

  static async updateComment(commentId, userId, content) {
    return await Comment.findOneAndUpdate(
      { _id: commentId, userId},
      { content, isEdited: true, editedAt: new Date() },
      { new: true }
    );
  }

  static async deleteComment(commentId, userId) {
  // 1. Find and delete the target comment
  const comment = await Comment.findOneAndDelete({ _id: commentId, userId });

  if (!comment) return null;

  // 2. If it's a reply → just decrement parent reply count
  if (comment.isReply && comment.parentCommentId) {
    await Comment.findByIdAndUpdate(comment.parentCommentId, {
      $inc: { replyCount: -1 },
    });

    // also decrement post comment count
    await Post.findByIdAndUpdate(comment.postId, { $inc: { commentCount: -1 } });
    return comment;
  }

  // 3. If it's a parent comment → delete all its replies (cascade)
  const replies = await Comment.find({ parentCommentId: comment._id });

  if (replies.length > 0) {
    const replyIds = replies.map((r) => r._id);

    // delete replies in one go
    await Comment.deleteMany({ parentCommentId: comment._id });

    // update post: decrease comment count by number of replies + parent
    await Post.findByIdAndUpdate(comment.postId, {
      $inc: { commentCount: -(replies.length + 1) },
      $pull: { comments: { $in: [comment._id, ...replyIds] } },
    });
  } else {
    // no replies, just decrement count
    await Post.findByIdAndUpdate(comment.postId, {
      $inc: { commentCount: -1 },
      $pull: { comments: comment._id },
    });
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
