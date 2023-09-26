const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const middleware = require("./utils/middlewares");
const notesRouter = require("./controllers/notesRouter");
const config = require('./utils/config');

mongoose.set("strictQuery", false);
logger.info("connecting to", config.MONGO_DB_URI);

mongoose
  .connect(config.MONGO_DB_URI)
  .then((result) => {
    logger.info(`connected to MongoDB`.cyan.underline);
  })
  .catch((error) => {
    logger.error("error connectiong to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
