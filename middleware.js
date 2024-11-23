// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
    const pathname = request.nextUrl.pathname;
    const response = NextResponse.next();

    // Tambahkan informasi pathname ke header
    response.headers.set("x-pathname", pathname);
    return response;
}
