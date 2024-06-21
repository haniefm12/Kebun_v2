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
      unique: true,
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
    //role
    roles: [
      {
        type: String,
        default: "Employee",
      },
    ],
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
