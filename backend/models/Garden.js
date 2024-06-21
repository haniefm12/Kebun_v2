const mongoose = require("mongoose");

const gardenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
});
module.exports = mongoose.model("Garden", gardenSchema);
