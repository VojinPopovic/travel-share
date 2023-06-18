const mongoose = require("mongoose");

const { Schema, model, models } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", postSchema);
export default Post;