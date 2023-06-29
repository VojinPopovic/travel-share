const mongoose = require("mongoose");

const { Schema, model, models } = mongoose;

const commentsSchema = new Schema(
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
    commentmaker: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comments = models.Comments || model("Comments", commentsSchema);
export default Comments;