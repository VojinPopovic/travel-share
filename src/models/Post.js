const mongoose = require("mongoose");

const { Schema, model, models } = mongoose;

const postsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userimage: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Posts = models.Posts || model("Posts", postsSchema);
export default Posts;
