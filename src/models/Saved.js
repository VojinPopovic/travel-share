const mongoose = require("mongoose");

const { Schema, model, models } = mongoose;

const savedSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    postid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Saved = models.Saved || model("Saved", savedSchema);
export default Saved;