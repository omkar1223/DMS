const {
  File,
} = require("/Users/user/Documents/document-management-system/models/File");
const {
  Folder,
} = require("/Users/user/Documents/document-management-system/models/Folder");
const uploadFile = require("../services/fileService");

const uploadFileToCloud = async (req, res) => {
  const folderId = req.params.folderId;
  const { description } = req.body;

  try {
    const folder = await Folder.findByPk(folderId);
    if (!folder) {
      res.status(404).json({ msg: "Folder not found" });
    }

    if (!req.files) {
      return res
        .status(400)
        .json({ error: "File not present in request body." });
    }

    if (Array.isArray(req.files) && req.files.length === 0) {
      return res.status(400).json({ error: "No file was uploadedcsb." });
    }

    const folderFiles = await File.findAll({
      where: {
        folderId: folderId,
      },
    });

    if (folder.maxFileLimit === folderFiles.length) {
      return res.status(404).json({ msg: "Max File Limit reached" });
    }

    console.log(req.files);
    const file = req.files[0];

    const result = await uploadFile(file);

    console.log(result);

    const fileUpload = await File.create({
      folderId: folderId,
      name: file.filename,
      description: description,
      type: file.mimetype,
      size: file.size,
      fileUrl: result.url,
    });

    return res
      .status(200)
      .json({ msg: "File uploaded successfully", file: fileUpload });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
