const express = require("express");
const fileRouter = express.Router();
const { getFilesByType } = require("../controllers/fileController");

fileRouter.get("/", getFilesByType);

module.exports = fileRouter;
