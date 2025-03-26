const sequelize = require("../../sequelize");
const { DataTypes } = require("sequelize");
const Folder = require("../models/Folder");

const File = sequelize.define(
  "File",
  {
    fileId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    folderId: {
      type: DataTypes.UUID,
      References: {
        model: Folder,
        key: "folderId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uploadedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "files",
    timestamps: false,
  }
);

module.exports = File;
