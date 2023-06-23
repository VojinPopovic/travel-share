const mongoose = require("mongoose");

const { Schema, model, models } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    friends: {
      type: String,
      required: true,
    },
    groups: {
      type: String,
      required: true,
    },
    saved: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
