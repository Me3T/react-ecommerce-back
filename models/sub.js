const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const subSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: { type: ObjectId, ref: "Category", required: true },
  },
  {
    timestamps: true,
  }
);

//*Slug is the url type
//*trim is used to ignore the spaces
//*timestamps will auto generate the created dates

module.exports = mongoose.model("Sub", subSchema);
