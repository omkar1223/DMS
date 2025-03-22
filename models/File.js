import { DataTypes } from "sequelize";
import sequelize from "../sequelize";
import { Folder } from "./Folder";

module.exports = (DataTypes, sequelize) => {
  const File = sequelize.define(
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
      tableName: "Files",
      timestamps: false,
    }
  );
  return File;
};
