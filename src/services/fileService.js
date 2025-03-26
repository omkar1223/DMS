const { cloudinary } = require("../config/cloudinary");
const { unlink } = require("fs");

const uploadFile = async (file) => {
  try {
    console.log(file);
    const cloud_response = await cloudinary.uploader.upload(file.path, {
      resource_type: "raw", // Specify raw resource type
    });
    unlink(file.path, (err) => {
      if (err) {
        console.log(err);
      }
    });
    console.log(cloud_response);
    return cloud_response;
  } catch (error) {
    console.error({ error: error.message });
  }
};

module.exports = { uploadFile };
