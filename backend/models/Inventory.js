const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  garden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Garden",
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  itemType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Inventory", inventorySchema);
