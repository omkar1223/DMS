const File = require("../models/File");
const Folder = require("../models/Folder");
const { uploadFile } = require("../services/fileService");
const { Op } = require("sequelize");

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
      name: file.originalname,
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

const updateFileDescription = async (req, res) => {
  const folderId = req.params.folderId;
  const fileId = req.params.fileId;

  try {
    const folder = await Folder.findByPk(folderId);
    if (!folder) {
      return res.status(404).json({ msg: "Folder not found" });
    }

    const file = await File.findByPk(fileId);
    if (!file) {
      return res.status(404).json({ msg: "File not found" });
    }
    const { description } = req.body;
    if (!description) {
      return res.status(404).json({ msg: "description is needed" });
    }
    file.description = description;

    await file.save();
    return res.status(200).json({
      msg: "File description succesfully updated",
      file: file,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteFile = async (req, res) => {
  const { folderId } = req.params.folderId;
  const { fileId } = req.params.fileId;

  try {
    const folder = await Folder.findByPk(folderId);
    if (!folder) {
      return res.status(404), json({ msg: "folder is not present" });
    }
    const file = await File.findByPk(fileId);
    if (!file) {
      return res.status(404), json({ msg: "file is not present" });
    }
    await file.destroy();

    return res.status(200).json({ msg: "File deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const getAllFilesByFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    const { sort } = req.query;
    let folderFiles;
    if (sort === "size" || sort === "uploadedAt") {
      folderFiles = await File.findAll({
        where: { folderId: folderId },
        order: [[sort, "ASC"]],
      });
    } else {
      folderFiles = await File.findAll({ where: { folderId: folderId } });
      return res.status(200).json({ files: folderFiles });
    }
    return res.status(200).json(folderFiles);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getFilesByType = async (req, res) => {
  const { type } = req.query.type;
  //let files;
  try {
    let files;
    if (!type) {
      files = await File.findAll({});
    } else {
      files = await File.findAll({
        where: { type: { [Op.like]: `%${type}$%` } },
      });
    }

    return res.status(200).json(files);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadFileToCloud,
  updateFileDescription,
  deleteFile,
  getAllFilesByFolder,
  getFilesByType,
};
