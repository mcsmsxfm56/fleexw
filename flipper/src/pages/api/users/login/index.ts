// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  if (!body.email || !body.password || !body.rol) {
    return res.send("mandatory data are missing");
  }
  if (req.method !== "POST") {
    return res.send("this method is invalid");
  }

  try {
    if (body.rol.toLowerCase() === "empresa") {
      const email = body.email.toLowerCase();
      const empresaEncontrada = await prisma.Empresa.findFirst({
        where: { email: email },
      });
      if (!empresaEncontrada) res.status(400).send("denied entry");

      const compare = await bcrypt.compare(
        body.password,
        empresaEncontrada.password
      );
      if (!compare) res.status(400).send("denied entry");

      //no me toma el .env
      const token = jwt.sign(
        {
          email: empresaEncontrada.email,
        },
        "flipper23",
        { expiresIn: "15m" }
      );
      return res.status(200).json({
        token: token,
        id: empresaEncontrada.id,
      });
    }

    if (body.rol.toLowerCase() === "trabajador") {
      // Busco en la tabla trabajador y envio el token con sus datos
    }
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
