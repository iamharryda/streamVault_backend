import mongoose, { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // receiver
    senderId: { type: Schema.Types.ObjectId, ref: "User" }, // who triggered it
    type: {
      type: String,
      enum: ["like", "comment", "reply", "follow", "post", "system"],
      required: true,
    },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    commentId: { type: Schema.Types.ObjectId, ref: "Comment" },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = model("Notification", notificationSchema);
export default Notification;
