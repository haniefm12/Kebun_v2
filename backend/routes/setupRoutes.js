const express = require("express");
const cloudinary = require("cloudinary").v2;
const path = require("path"); // Add this line
const rootRoutes = require("./root");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const noteRoutes = require("./noteRoutes");
const gardenRoutes = require("./gardenRoutes");
const financeRoutes = require("./financeRoutes");
const inventoryRoutes = require("./inventoryRoutes");

const setupRoutes = (app) => {
  app.use("/", express.static(path.join(__dirname, "/public")));
  app.use("/", rootRoutes);
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  app.use("/notes", noteRoutes);
  app.use("/garden", gardenRoutes);
  app.use("/finances", financeRoutes);
  app.use("/inventorys", inventoryRoutes);
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
    const imageID = req.body.public_id;
    const imageHttps = req.body.secure_url;
    res.json({
      imageHttps: imageHttps,
      imageID: imageID,
      message: "Image processed successfully",
    });
  });

  app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "../views", "404.html"));
    } else if (req.accepts("json")) {
      res.json({ message: "404 Not found" });
    } else {
      res.type("txt").send("404 Not found");
    }
  });
};

module.exports = { setupRoutes };
