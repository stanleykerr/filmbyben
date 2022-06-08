import crypto from "crypto";

import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { nanoid } from "nanoid";

import { sequelize } from "../sequelize";

import type { Role } from "./Role";

/**
 * TODO: use pepper with generated salt when hashing passwords
 * import { PEPPER } from "@/shared/constants";
 */
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<string>; // id can be undefined during creation (generated by nanoid)
  declare username: string;
  declare email: string;
  declare name: string;

  declare salt: CreationOptional<Buffer>;
  declare hashedPassword: CreationOptional<Buffer>;

  declare password?: NonAttribute<string>;

  // timestamps
  declare createdAt: CreationOptional<Date>; // createdAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>; // updatedAt can be undefined during creation

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  // TODO: put proper types in number/string place
  declare getRoles: BelongsToManyGetAssociationsMixin<Role>;
  declare addRole: BelongsToManyAddAssociationsMixin<Role, string>;
  declare addRoles: BelongsToManyAddAssociationMixin<Role, number>;
  declare setRoles: BelongsToManySetAssociationsMixin<Role, number>;
  declare removeRole: BelongsToManyRemoveAssociationMixin<Role, number>;
  declare removeRoles: BelongsToManyRemoveAssociationsMixin<Role, number>;
  declare hasRole: BelongsToManyHasAssociationMixin<Role, number>;
  declare hasRoles: BelongsToManyHasAssociationsMixin<Role, number>;
  declare countRoles: BelongsToManyCountAssociationsMixin;
  declare createRole: BelongsToManyCreateAssociationMixin<Role>;

  validatePassword(inputPassword: string): boolean {
    const hashedInput = crypto.pbkdf2Sync(
      inputPassword,
      this.salt,
      1000,
      64,
      "sha512"
    );

    return crypto.timingSafeEqual(this.hashedPassword, hashedInput);
  }
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: () => nanoid(),
    },
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    salt: {
      type: DataTypes.BLOB,
      defaultValue: () => crypto.randomBytes(16),
    },
    hashedPassword: DataTypes.BLOB,
    password: {
      type: DataTypes.VIRTUAL(DataTypes.STRING),
      set(value: string) {
        this.setDataValue(
          "hashedPassword",
          crypto.pbkdf2Sync(value, this.salt, 1000, 64, "sha512")
        );
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "User",
  }
);

/*
const salt = crypto.randomBytes(16).toString("hex");
const hash = crypto
  .pbkdf2Sync(password, salt, 1000, 64, "sha512")
  .toString("hex");
*/
