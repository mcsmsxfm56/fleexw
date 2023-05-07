// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  if (!body.email || !body.password) {
    return res.send("mandatory data are missing");
  }
  if (req.method !== "POST") {
    return res.send("this method is invalid");
  }

  try {
    const email = body.email.toLowerCase();

    const trabajadorEncontrado: any = await prisma.trabajador.findFirst({
      where: {
        email: email,
        //isDeleted: false
      },
    });

    const empresaEncontrada: any = await prisma.empresa.findFirst({
      where: {
        email: email,
        //authorizedByAdmin: true,
        //isDeleted: false
      },
    });
    const user = empresaEncontrada || trabajadorEncontrado;

    if (!user) return res.status(400).json("no se encontro el usuario");
    if (empresaEncontrada) {
      if (empresaEncontrada.authorizedByAdmin === false) {
        return res.status(400).json("Autorizacion pendiente");
      }

      if (empresaEncontrada.isDeleted === true) {
        return res.status(400).json("Su cuenta ha sido baneada");
      }
    }

    if (trabajadorEncontrado) {
      if (trabajadorEncontrado.isDeleted === true) {
        return res.status(400).json("Su cuenta ha sido baneada");
      }
    }
    const comparaPass = await bcrypt.compare(body.password, user.password);

    if (!comparaPass) {
      return res.status(400).json("Invalid Email or Password");
    }
    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
      },
      secretKey
    );

    let rol = "empresa";
    const isAdmin = user.isAdmin;
    if ("idType" in user) {
      rol = "trabajador";
    }
    return res.status(200).json({
      token: token,
      id: user.id,
      nombre: user.name || user.nombre,
      rol: rol,
      isAdmin,
    });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
