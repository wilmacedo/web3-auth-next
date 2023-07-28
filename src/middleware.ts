import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { cookies } = request;

  const authData = cookies.get("app@auth");
  try {
    if (!authData) throw Error();
    const { value } = authData;

    JSON.parse(value);

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/private",
};
