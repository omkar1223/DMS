const { validate: isUuid } = require("uuid");

const validateFolder = (folder) => {
  if (!folder.name || typeof folder.name !== "string") {
    return "Required folder name and it should string type";
  }
  if (
    !folder.type ||
    (folder.type !== "csv" &&
      folder.type !== "img" &&
      folder.name !== "ppt" &&
      folder.type !== "pdf")
  ) {
    return "Required folder type and it should be of type csv or img or ppt or pdf";
  }
  if (
    !folder.maxFileLimit ||
    (!Number.isInteger(parseInt(folder.maxFileLimit)) &&
      !parseInt(folder.maxFileLimit) > 0)
  ) {
    return "Required folder maxFileLimit and should be positive integer";
  }
};

const validateFolderId = (folderId) => {
  if (!isUuid(folderId)) {
    return "Invalid FolderId";
  }
};

module.exports = { validateFolder, validateFolderId };
