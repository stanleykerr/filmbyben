import { DataTypes, Sequelize } from "sequelize";

import { nanoid } from "nanoid";

let authenticated = false;

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "testdb.sqlite",
});

/*
  id (nanoid)
  name
  thumbnail
  category?
  date?
  video link
  preview start time?
*/

export const Work = sequelize.define(
  "Work",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: () => nanoid(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
    link: DataTypes.STRING,
  },
  {}
);

if (!authenticated) {
  sequelize.authenticate();
  authenticated = true;
}

export const Models = { Work };
