const express = require("express");
const { logger, logEvents } = require("./logger");
const errorHandler = require("./errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("../config/corsOptions");
const passPublicId = require("./passPublicId");

const setupMiddleware = (app) => {
  app.use(logger);
  app.use(cors(corsOptions));
  app.use(express.json()); // Now express is defined
  app.use(cookieParser());
  app.use(errorHandler);
  app.use(passPublicId);
};

module.exports = { setupMiddleware };
