import { NextRequest, NextResponse } from "next/server";

const allowedParams = [
  "keyword",
  "location",
  "page",
  "education",
  "experience",
  "salary",
  "jobType",
];

export default function Middleware(req: NextRequest) {
  const url = req.nextUrl;
  let changed = false;

  url.searchParams.forEach((param, key) => {
    if (!allowedParams.includes(key)) {
      url.searchParams.delete(key);
      changed = true;
    }
  });

  if (changed) {
    return NextResponse.redirect(url);
  }
}
