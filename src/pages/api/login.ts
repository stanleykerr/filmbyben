import nextConnect from "next-connect";

import passport from "@/lib/passport";
import auth from "@/middleware/auth";

import type { NextApiRequest, NextApiResponse } from "next";

interface CustomReq extends NextApiRequest {
  user: any;
}

const handler = nextConnect<CustomReq, NextApiResponse>();

handler.use(auth).post(passport.authenticate("local"), (req, res) => {
  res.json({ user: req.user });
});

export default handler;
