const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  garden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Garden",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Plant", plantSchema);
