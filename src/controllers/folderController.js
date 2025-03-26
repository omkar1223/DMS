const Folder = require("../models/Folder");
const {
  validateFolder,
  validateFolderId,
} = require("../validations/folderValidation");

const createFolder = async (req, res) => {
  const { name, type, maxFileLimit } = req.body;

  try {
    const error = validateFolder(req.body);
    if (error) {
      res.status(404).json({ error: error });
    }

    const folderExits = await Folder.findOne({ where: { name } });
    if (folderExits) {
      res.status(404).json({ msg: "Folder already exists" });
    }

    const folder = await Folder.create({
      name: name,
      type: type,
      maxFileLimit: parseInt(maxFileLimit),
    });

    return res.status(200).json({
      message: "Folder Created Successfully",
      folder: folder,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateFolder = async (req, res) => {
  const { name, type, maxFileLimit } = req.body;
  const folderId = req.params.folderId;
  try {
    let error;

    error = validateFolderId(folderId);
    if (error) {
      res.status(400).json({ msg: error });
    }
    error = validateFolder(req.body);
    if (error) {
      res.status(400).json({ error: error });
    }

    const folderExits = await Folder.findOne({ where: { folderId: folderId } });
    if (!folderExits) {
      res.status(400).json({ msg: "FolderId not exists" });
    }

    const folder = await Folder.update(
      {
        name: name,
        type: type,
        maxFileLimit: parseInt(maxFileLimit),
      },
      {
        where: { folderId: folderId },
        returning: true,
      }
    );
    console.log(folder);
    return res
      .status(200)
      .json({ msg: "Folder updated succesfully", folder: folder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFolder = async (req, res) => {
  const folderId = req.params.folderId;
  try {
    let error;

    error = validateFolderId(folderId);
    if (error) {
      res.status(400).json({ msg: error });
    }
    const folderExits = await Folder.findOne({ where: { folderId: folderId } });
    if (folderExits) {
      await folderExits.destroy({
        where: { id: folderId },
      });

      return res
        .status(200)
        .json({ msg: "Folder deleted successfully with its files" });
    } else {
      res.status(404).json({ msg: "Id not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllFolders = async (req, res) => {
  try {
    const allFolders = await Folder.findAll({});

    return res.status(200).json(allFolders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createFolder, updateFolder, deleteFolder, getAllFolders };
