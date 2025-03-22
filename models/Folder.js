import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

module.exports = (DataTypes, sequelize) => {
  const Folder = sequelize.define(
    "Folder",
    {
      folderId: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      type: {
        type: DataTypes.ENUM("csv", "img", "pdf", "ppt"),
        allowNull: false,
      },
      maxFileLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "folders",
      timestamps: false,
    }
  );
  return Folder;
};
