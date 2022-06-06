import { Work } from "@/lib/sequelize";
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      // Get data from your database
      const works = await Work.findAll();
      res.status(200).json(works);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
