import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, maxlength: 500 },

    parentCommentId: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
    isReply: { type: Boolean, default: false },
    replyCount: { type: Number, default: 0 },

    reactions: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        type: { type: String, enum: ["like", "dislike"], required: true },
      },
    ],
    likeCount: { type: Number, default: 0 },
    dislikeCount: { type: Number, default: 0 },

    isEdited: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    editedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// ✅ Prevent replies to replies
commentSchema.pre("save", async function (next) {
  if (this.parentCommentId) {
    const parent = await mongoose.model("Comment").findById(this.parentCommentId);
    if (!parent) return next(new Error("Parent comment not found"));
    if (parent.isReply) {
      return next(new Error("Replies to replies are not allowed"));
    }
    parent.replyCount += 1;
    await parent.save();
    this.isReply = true;
  }
  next();
});

const Comment = model("Comment", commentSchema);
export default Comment;
