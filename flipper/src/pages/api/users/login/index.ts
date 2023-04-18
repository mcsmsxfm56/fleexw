// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

interface DataLogin {
  email: String;
  password: String;
  token: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataLogin>
) {
  const body = req.body;
  // if (!body.email || !body.password) {
  //   throw Error("email and password required");
  // }

  if (req.method === "GET") {
    return res.send({
      email: "email",
      password: "password",
      token: "token",
    });
  }

  if (req.method === "POST") {
    try {
      const find = await prisma.Empresa.findFirst({
        where: { email: body.email },
      });

      return res.status(200).json(find);
    } catch (error: any) {
      res.status(400).send(error.message);
      console.log(error);
    }
  }
}
