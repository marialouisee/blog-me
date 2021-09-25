import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StatsSchema = new Schema(
  {
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  {
    _id: false,
  }
);

const PostSchema = new Schema(
  {
    title: { type: String, required: [true, 'Title is required'] },
    text: { type: String, required: [true, 'Text is required'] },
    imageUrl: { type: String, required: [true, 'Image URL is required'] },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    stats: { type: StatsSchema },
  },
  {
    versionKey: false,
    timestamps: true, // will create createdAt and updatedAt fields
  }
);

const Post = model("Post", PostSchema);

export default Post;