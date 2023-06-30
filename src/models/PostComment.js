const mongoose = require("mongoose");

const { Schema, model, models } = mongoose;

const postCommentSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    userimage: {
      type: String,
      required: true,
    },
    commentmaker: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post_comment =
  models.Post_comment || model("Post_comment", postCommentSchema);
export default Post_comment;
