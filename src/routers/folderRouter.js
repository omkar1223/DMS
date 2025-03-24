const express = require("express");
const folderRouter = express.Router();
const { upload } = require("../middleware/fileUpload");
const {
  createFolder,
  updateFolder,
  deleteFolder,
  getAllFolders,
} = require("../controllers/folderController");
const {
  uploadFileToCloud,
  updateFileDescription,
  deleteFile,
  getAllFilesByFolder,
} = require("../controllers/fileController");

folderRouter.post("/create", createFolder);

folderRouter.put("/:folderId", updateFolder);

folderRouter.delete("/:folderId", deleteFolder);

folderRouter.get("/", getAllFolders);

folderRouter.post(
  "/:folderId/files",
  function (req, res, next) {
    upload(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.status(404).json({ error: err.message });
      }
      next();
    });
  },
  uploadFileToCloud
);

folderRouter.put("/:folderId/files/:fileId", updateFileDescription);

folderRouter.delete("/:folderId/files/:fileId", deleteFile);

folderRouter.get("/:folderId/files", getAllFilesByFolder);

module.exports = folderRouter;
