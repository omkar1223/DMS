const express = require("express");
const folderRouter = express.Router();
const { upload } = require("../middleware/fileUpload");
const {
  createFolder,
  updateFolder,
  deleteFolder,
  getAllFolders,
} = require("../controllers/folderController");

folderRouter.post("/folder/create", createFolder);

folderRouter.put("/folders/:folderId", updateFolder);

folderRouter.delete("/folders/:folderId", deleteFolder);

folderRouter.get("/folders", getAllFolders);

folderRouter.post("/folders/:folderId/files", function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(404).json({ error: err.message });
    }
    next();
  });
});
