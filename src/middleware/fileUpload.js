const multer = require("multer");
const path = require("path");
const { UNEXPECTED_FILE_TYPE } = require("../constants/file");
const { DATE } = require("sequelize");
const exp = require("constants");
const { fileTypeValidator } = require("../validations/fileTypeValidator");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    const isFileTypeAllowed = fileTypeValidator(file);
    if (isFileTypeAllowed) {
      return cb(null, true);
    } else {
      cb(
        new multer.MulterError(
          UNEXPECTED_FILE_TYPE.code,
          UNEXPECTED_FILE_TYPE.msg
        )
      );
    }
  },
}).array("file", 1);

module.exports = { upload };
