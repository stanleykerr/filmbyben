import nextConnect from "next-connect";

import { User } from "@/lib/db";
import auth from "@/middleware/auth";

import type { NextApiRequest, NextApiResponse } from "next";

interface CustomReq extends NextApiRequest {
  user: any;
  logOut(): void;
}

interface ExtendedResponse extends NextApiResponse {
  cookie(name: string, value: string): void;
}

const handler = nextConnect<CustomReq, ExtendedResponse>();

handler
  .use<CustomReq>(auth)
  .get((req, res) => {
    // You do not generally want to return the whole user object
    // because it may contain sensitive field such as !!password!! Only return what needed

    if (req.user) {
      const { name, username, email } = req.user;
      res.json({ user: { name, username, email } });
    } else {
      res.status(401).send(req.user);
    }
  })
  .post(async (req, res) => {
    // TODO: implement user creation
    const { username: _username, password: _password, name: _name } = req.body;
    // await User.create({ username, password, name });
    res.status(200).json({ success: true, message: "created new user" });
  })
  .use((req, res, next) => {
    // handlers after this (PUT, DELETE) all require an authenticated user
    // This middleware to check if user is authenticated before continuing
    if (!req.user) {
      res.status(401).send("unauthenticated");
    } else {
      next();
    }
  })
  .put(async (req, res) => {
    const { name } = req.body;
    const user = await User.update({ name }, { where: { id: req.user.id } });
    res.json({ user });
  })
  .delete(async (req, res) => {
    await User.destroy({ where: { id: req.user.id } });
    req.logOut();
    res.status(204).end();
  });

export default handler;
