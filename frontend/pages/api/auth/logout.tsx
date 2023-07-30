import { NextApiRequest, NextApiResponse } from "next";

import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", [
      cookie.serialize("access", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 0,
        sameSite: "lax",
        path: "/",
      }),
    ]);

    return res.status(200).json({
      success: true,
    });
  }
};
