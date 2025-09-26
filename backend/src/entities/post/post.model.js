import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    content: { type: String, required: true, maxLength: 1000 },
    hasSpoiler: { type: Boolean, default: false },

    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    mediaId: { type: String, required: true },
    mediaType: { type: String, enum: ["movie", "series"], required: true },
    mediaTitle: { type: String, required: true },
    mediaPoster: { type: String },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    reactions: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        type: { type: String, enum: ["like", "dislike"], required: true },
      },
    ],
    likeCount: { type: Number, default: 0 },
    dislikeCount: { type: Number, default: 0 },

    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    commentCount: { type: Number, default: 0 },

    isEdited: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);
export default Post;
