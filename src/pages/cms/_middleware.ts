import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(
  request: NextRequest,
  _ev: NextFetchEvent
) {
  // const hostname = request.headers.get("host");
  const { pathname } = request.nextUrl;
  const token = request.cookies["sess"];
  const isLoginPage = pathname === "/cms/login";

  if (!token) {
    if (isLoginPage) return NextResponse.next(); // no need to redirect to login page

    const url = request.nextUrl.clone();
    url.pathname = "/cms/login";
    return NextResponse.redirect(url);
  }

  const verifyUrl = request.nextUrl.clone();
  verifyUrl.pathname = "/api/verifyToken";

  const res = await fetch(verifyUrl, {
    method: "POST",
    body: JSON.stringify({ token }),
  });

  // TODO: only use .json(), not .text() and ensure the status is 200
  const data = res.headers.get("Content-Type")!.includes("application/json")
    ? await res.json()
    : await res.text();

  if (!res.ok) {
    return new Response(
      JSON.stringify({
        error: {
          message: `${res.status}: ${
            typeof data === "string" ? data : JSON.stringify(data, null, 2)
          }`,
        },
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // token is valid, but user is not logged in/no passport session found (need to re-login)
  if (!data?.session?.passport?.user) {
    if (isLoginPage) return NextResponse.next(); // no need to redirect to login page, user is trying to login

    // redirect to login page
    const url = request.nextUrl.clone();
    url.pathname = "/cms/login";
    return NextResponse.redirect(url);
  }

  // token is valid, and user is logged in, but trying to access login page, redirect to dashboard page instead
  if (isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/cms";
    return NextResponse.redirect(url);
  }

  // token is valid, and user is logged in and trying to access dashboard, continue
  return NextResponse.next();
}
