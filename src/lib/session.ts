import { parse, serialize } from "cookie";

import { createLoginSession, getLoginSession } from "./auth";

import type { CookieSerializeOptions } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import type { RequestHandler } from "next-connect";

export function parseCookies(req: NextApiRequest) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies;

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie;
  return parse(cookie || "");
}

interface SessionOptions {
  name: string;
  secret: string;
  cookie: CookieSerializeOptions;
}

interface SessionRequest extends NextApiRequest {
  session?: {
    maxAge?: number;
    [key: string]: any;
  };
}

interface SessionResponse extends Omit<NextApiResponse, "end"> {
  end: (...args: any[]) => Promise<void>;
}

const session = ({
  name,
  secret,
  cookie: cookieOpts,
}: SessionOptions): RequestHandler<SessionRequest, SessionResponse> => {
  return async (req, res, next) => {
    const cookies = parseCookies(req);
    const token = cookies[name];
    let unsealed = {};

    if (token) {
      try {
        // the cookie needs to be unsealed using the password `secret`
        unsealed = await getLoginSession(token, secret);
      } catch (e) {
        // The cookie is invalid
      }
    }

    req.session = unsealed;

    // We are proxying res.end to commit the session cookie
    const oldEnd = res.end;
    res.end = async function resEndProxy(...args) {
      if (res.finished || res.writableEnded || res.headersSent) return;
      if (cookieOpts.maxAge) {
        req.session!.maxAge = cookieOpts.maxAge;
      }

      const token = await createLoginSession(req.session, secret);

      res.setHeader("Set-Cookie", serialize(name, token, cookieOpts));
      oldEnd.apply(this, args);
    };

    next();
  };
};

export default session;
