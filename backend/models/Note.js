const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const noteSchema = new mongoose.Schema(
  {
    //tugas id auto
    //kebun id
    garden: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Garden",
    },
    //user id
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    //tugas tittle
    title: {
      type: String,
      required: true,
    },
    //tugas description
    text: {
      type: String,
      required: true,
    },
    //status tugas
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    //tanggal tugas
    timestamps: true,
  }
);

noteSchema.plugin(AutoIncrement, {
  inc_field: "ticket",
  id: "ticketNums",
  start_seq: 1,
});

module.exports = mongoose.model("Note", noteSchema);
