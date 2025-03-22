const fileTypeValidator = (file) => {
  console.log(file);
  const filetypes = /csv|img|pdf|ppt/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype); // filename/png
  return extname && mimetype;
};

module.exports = { fileTypeValidator };
