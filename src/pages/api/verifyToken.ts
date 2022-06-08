import { getLoginSession } from "@/lib/auth";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }
  const { token } = JSON.parse(req.body);

  try {
    const session = await getLoginSession(
      token,
      process.env.TOKEN_SECRET as string
    );

    res.status(200).json({ session });
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
}
