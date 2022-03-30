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
    link: DataTypes.STRING,
    thumbnail: {
      type: DataTypes.STRING,
      // TODO: remove this virtual getter in production, only used for development purposes
      get() {
        return this.getDataValue("link") ?? this.getDataValue("thumbnail");
      },
    },
    visible: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.name.length % 2 === 0;
      },
      set(_value) {
        throw new Error("Do not try to set the `visible` value!");
      },
    },
    display: {
      type: DataTypes.VIRTUAL,
      get() {
        return {
          name: this.name,
          visible: this.visible,
        };
      },
      set(_value) {
        throw new Error("Do not try to set the `display` value!");
      },
    },
  },
  {}
);

if (!authenticated) {
  sequelize.authenticate();
  authenticated = true;
}

export const Models = { Work };
