import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();
  let isLogged = request.cookies.get("isLogged");
  if (!isLogged?.value) {
    if (request.nextUrl.pathname.startsWith("/chat")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
