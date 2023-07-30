import { NextApiRequest, NextApiResponse } from "next";

import axios, { AxiosError } from "axios";
import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
// export default async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/token/`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.access) {
        res.setHeader("Set-Cookie", [
          cookie.serialize("access", response.data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 15,
            sameSite: "lax",
            path: "/",
          }),
        ]);

        return res.status(200).json({
          success: true,
        });
      } else {
        res.status(response.status).json({
          error: "Authentication failed",
        });
      }
    } catch (error) {
      if(error as AxiosError){
        const err = error as AxiosError
        if(err.response){
          res.status(err.response.status).json({
            error: err.response 
          });
        }
      }
      // res.status(error.response.status).json({
      //   error: error.response && error.response.data.error,
      // });
    }
  }
};
