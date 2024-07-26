const mongoose = require("mongoose");
const { logEvents } = require("../middleware/logger");

const connectDB = () => {
  mongoose.connect(process.env.DATABASE_URI);

  mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err);
    logEvents(
      `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
      "mongoErrLog.log"
    );
  });
};

module.exports = { connectDB };
