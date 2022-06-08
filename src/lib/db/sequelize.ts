import { Sequelize } from "@sequelize/core";
import pg from "pg";

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;

export const sequelize = DB_CONNECTION_URL
  ? new Sequelize(DB_CONNECTION_URL, {
      dialect: "postgres",
      dialectModule: pg,
    })
  : new Sequelize("sqlite::memory:");
