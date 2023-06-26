const mongoose = require("mongoose");

const { Schema, model, models } = mongoose;

const groupSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    groupname: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Group = models.Group || model("Group", groupSchema);
export default Group;
