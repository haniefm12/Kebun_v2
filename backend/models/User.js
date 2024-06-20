const mongoose = require("mongoose");

// Defining the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    set: (v) => v.replace(/\b\w/g, (l) => l.toUpperCase()),
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    // required: true,
  },
  roles: [
    {
      type: String,
      default: "Employee",
    },
  ],
  image: {
    type: String,
    default: "none",
  },
  active: {
    type: Boolean,
    default: true,
  },
});
// Hashing the password before saving the user

module.exports = mongoose.model("User", userSchema);
