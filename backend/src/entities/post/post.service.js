import mongoose from 'mongoose';
import Post from './post.model.js';

class PostService {
  static async createPost(data, user) {
    const post = new Post(data);
    await post.save();
    
const { default: NotificationService } = await import("../notification/notification.service.js");    // Create notification after post is saved
    await NotificationService.createNotification({
      receiverId: post.authorId,        
      senderId: user._id,
      type: "post",
      postId: post._id,
      message: `${user.username} created a new post`,
    });

    return post; 
  }

  static async getAllPosts(skip = 0, limit = 20) {
    return await Post.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('authorId', 'username email')
      .populate('comments');
  }

  static async getPostById(postId) {
    return await Post.findById(postId)
      .populate('authorId', 'username email')
      .populate('comments');
  }

  static async updatePost(postId, userId, updateData) {
    return await Post.findOneAndUpdate(
      { _id: postId, authorId: userId, isDeleted: false },
      { ...updateData, isEdited: true },
      { new: true }
    );
  }

  static async deletePost(postId, userId) {
    return await Post.findOneAndUpdate(
      { _id: postId, authorId: userId },
      { isDeleted: true },
      { new: true }
    );
  }

  static async addReaction(postId, userId, type) {
    //  First remove any existing reaction by this user
    await Post.updateOne(
      { _id: postId },
      { $pull: { reactions: { userId: new mongoose.Types.ObjectId(userId) } } }
    );

    // Then push the new reaction
    await Post.updateOne(
      { _id: postId },
      {
        $push: {
          reactions: { userId: new mongoose.Types.ObjectId(userId), type }
        }
      }
    );

    // ✅ Recalculate counts in one aggregation update
    const post = await Post.findById(postId);
    post.likeCount = post.reactions.filter((r) => r.type === 'like').length;
    post.dislikeCount = post.reactions.filter(
      (r) => r.type === 'dislike'
    ).length;
    await post.save({ validateModifiedOnly: true });

    return post;
  }

  static async removeReaction(postId, userId) {
    // ✅ Pull out the user's reaction directly in Mongo
    await Post.updateOne(
      { _id: postId },
      { $pull: { reactions: { userId: new mongoose.Types.ObjectId(userId) } } }
    );

    // ✅ Recalculate counts
    const post = await Post.findById(postId);
    post.likeCount = post.reactions.filter((r) => r.type === 'like').length;
    post.dislikeCount = post.reactions.filter(
      (r) => r.type === 'dislike'
    ).length;
    await post.save({ validateModifiedOnly: true });

    return post;
  }
}

export default PostService;
