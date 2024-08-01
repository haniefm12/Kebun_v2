require("dotenv").config();
const express = require("express");
const app = express();
const { connectDB } = require("./config/dbConn");
const { cloudinaryConfig } = require("./config/cloudinaryConfig");
const { setupMiddleware } = require("./middleware/middleware");
const { setupRoutes } = require("./routes/setupRoutes");

connectDB();
cloudinaryConfig();

setupMiddleware(app);
setupRoutes(app);

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
