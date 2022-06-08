import { Role } from "./models/Role";
import { User } from "./models/User";
import { Work } from "./models/Work";
import { WorkCategory } from "./models/WorkCategory";
import { sequelize } from "./sequelize";

export const initDB = async (force = false) => {
  // add any model-to-model associations here before authenticating (e.g. x.hasMany(y))
  WorkCategory.hasMany(Work, { as: "category", foreignKey: "categoryId" });
  Work.belongsTo(WorkCategory, { as: "category" });

  User.belongsToMany(Role, { through: "UserRoles" });
  Role.belongsToMany(User, { through: "UserRoles" });

  await sequelize.authenticate();
  await sequelize.sync({ force });
};

initDB();

export * from "./sequelize";
export * from "./models/Work";
export * from "./models/WorkCategory";
export * from "./models/Role";
export * from "./models/User";
