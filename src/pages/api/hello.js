// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Work, sequelize } from "@lib/sequelize";

import { nanoid } from "nanoid";

const defaultz = [
  ["The Wedding of Mariah and Jamie Baker", "https://youtu.be/uILHfVBHA_M"],
  ["Gabrielle Waves Sunset Reel", "https://youtu.be/_IBLFuoNXLo"],
  ["Vapor Rage Commercial", "https://youtu.be/FSjgNTnoZbo"],
  ["Las Vegas by Sunset", "https://youtu.be/Ob86XOgvWOY"],
  ["Shadow - Ma$e", "https://youtu.be/k7qIj9U3Yss"],
  ["May 2021 Film Reel", "https://youtu.be/iYJa8BcOOK0"],
  ["The View from the Top", "https://youtu.be/juzgYjBQij0"],
];

export default async function handler(req, res) {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    defaultz
      .map(([name, link]) => ({ name, thumbnail: nanoid(10), link }))
      .forEach((o) => Work.create(o));

    res
      .status(200)
      .json({ name: "Connection has been established successfully." });
  } catch (error) {
    res.status(200).json({ name: "Unable to connect to the database:", error });
  }
}
