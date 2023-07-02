const mongoose = require("mongoose");

const { Schema, model, models } = mongoose;

const friendSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    addeduser: {
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
    accepted: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Friend = models.Friend || model("Friend", friendSchema);
export default Friend;
