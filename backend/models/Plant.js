const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  garden: {
    type: String,
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
