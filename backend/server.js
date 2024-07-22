require("dotenv").config();
const express = require("express");
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const cloudinaryConfig = require("./config/cloudinaryConfig");
const cloudinary = require("cloudinary").v2;
const app = express();
const passPublicId = require("./middleware/passPublicId");
const { createGarden } = require("./controllers/gardenControllers");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/notes", require("./routes/noteRoutes"));
app.use("/garden", require("./routes/gardenRoutes"));
app.use("/finances", require("./routes/financeRoutes"));
app.use("/inventorys", require("./routes/inventoryRoutes"));
app.get("/get-signature", (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    cloudinary.config().api_secret
  );
  res.json({ timestamp, signature });
});

app.post("/do-something-with-photo", (req, res) => {
  console.log("req.body:", req.body);
  // const expectedSignature = cloudinary.utils.api_sign_request(
  //   {
  //     public_id: req.body.public_id,
  //     version: req.body.version,
  //     secure_url: req.body.secure_url,
  //   },
  //   cloudinary.config().api_secret
  // );

  const imageID = req.body.public_id;
  const imageHttps = req.body.secure_url;
  console.log(imageHttps, imageID);
  // Call the createGarden function with imageID

  // Send the imageID back to the client
  res.json({
    imageHttps: imageHttps,
    imageID: imageID,
    message: "Image processed successfully",
  });
});

app.use(errorHandler);
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
