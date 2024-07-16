const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  garden: {
    type: String,
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
