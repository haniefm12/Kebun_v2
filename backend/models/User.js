const mongoose = require("mongoose");

// Defining the user schema
const userSchema = new mongoose.Schema(
  {
    //user id auto
    //name
    name: {
      type: String,
      required: true,
      set: (v) => v.replace(/\b\w/g, (l) => l.toUpperCase()),
    },
    //username
    username: {
      type: String,
      required: true,
      //onlylowercase?
      set: (v) => v.toLowerCase(),
    },
    //password
    password: {
      type: String,
      required: true,
    },
    //phone
    phoneNumber: {
      type: String,
      // required: true,
    },
    //roles with 3 choice admin managar and employee?
    role: {
      type: String,
      enum: ["admin", "manager", "employee"],
      default: "employee",
    },
    //picture
    image: {
      type: String,
      default: "none",
    },
    //status
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
// Hashing the password before saving the user

module.exports = mongoose.model("User", userSchema);
