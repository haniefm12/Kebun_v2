const mongoose = require("mongoose");
// import { Schema } from "mongoose";

import bcrypt from "bcrypt";

import validator from "validator";

// Defining the user schema
const userSchema = new Schema({
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
    required: true,
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
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
// Validating the user input
userSchema.path("username").validate((username) => {
  return validator.isAlphanumeric(username);
}, "Username should be alphanumeric");
userSchema.path("phoneNumber").validate((phoneNumber) => {
  return validator.isMobilePhone(phoneNumber, "any");
}, "Invalid phone number");

module.exports = mongoose.model("User", userSchema);
