const mongoose = require("mongoose");

const gardenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      set: (v) => v.replace(/\b\w/g, (l) => l.toUpperCase()),
    },
    address: {
      type: String,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      default: " ",
    },
    notes: {
      type: Array,
      default: [
        {
          note: String,
          date: Date,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Garden", gardenSchema);
