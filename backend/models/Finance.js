const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema(
  {
    garden: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Garden",
    },
    supplier: {
      type: String,
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
    unitPrice: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    itemType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Finance", financeSchema);
