import { parse, serialize } from "cookie";

import { createLoginSession, getLoginSession } from "./auth";

import type { IncomingMessage, ServerResponse } from "http";
import type { RequestHandler } from "next-connect";

const parseCookies = (req: any) => {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies;

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie;
  return parse(cookie || "");
};

interface SessionOptions {
  name: string;
  secret: string;
  cookie: {
    maxAge?: number;
    httpOnly?: boolean;
    secure?: boolean;
    path?: string;
    sameSite?: "strict" | "lax"; // TODO: Just use string?
  };
}

type MyReq = {
  session: {
    [key: string]: any;
  };
} & IncomingMessage;

interface MyResponse extends Omit<ServerResponse, "end"> {
  // end: (data: any, encoding: string) => void;
  /* end(cb?: () => void): void;
  end(chunk: any, cb?: () => void): void;
  end(chunk: any, encoding: BufferEncoding, cb?: () => void): void; */
  end(
    chunk?: Function | any,
    encoding?: Function | BufferEncoding,
    cb?: Function
  ): void;
}

const session = <ReqExt = {}, ResExt = {}>({
  name,
  secret,
  cookie: cookieOpts,
}: SessionOptions): RequestHandler<ReqExt & MyReq, ResExt & MyResponse> => {
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
    res.end = async function resEndProxy(
      arg1?: Function | any,
      arg2?: Function | BufferEncoding,
      arg3?: Function
    ) {
      // res.finished ||
      if (res.finished || res.writableEnded || res.headersSent) return;
      if (cookieOpts.maxAge) {
        req.session.maxAge = cookieOpts.maxAge;
      }

      const token = await createLoginSession(req.session, secret);

      res.setHeader("Set-Cookie", serialize(name, token, cookieOpts));

      if (typeof arg1 === "function") {
        // end(cb?: () => void): void;
        oldEnd.apply(this, [arg1]);
      } else if (typeof arg2 === "function") {
        // end(chunk: any, cb?: () => void): void;
        oldEnd.apply(this, [arg1, arg2]);
      } else if (typeof arg3 === "function") {
        // end(chunk: any, encoding: string, cb?: () => void): void;
        oldEnd.apply(this, [arg1, arg2, arg3]);
      } else {
        oldEnd.apply(this);
      }
    };

    next();
  };
};

export default session;
