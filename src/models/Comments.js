const mongoose = require("mongoose");

const { Schema, model, models } = mongoose;

const commentSchema = new Schema(
  {
    email: {
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
  },
  { timestamps: true }
);

const Comment = models.Comment || model("Comment", commentSchema);
export default Comment;