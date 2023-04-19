import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { DataTRegister } from "../users/register/trabajador";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataTRegister | string>
) {
  const { id } = req.query;
  console.log(id);
  const { authorization } = req.headers;
  console.log(authorization);
  try {
    if (req.method === "GET") {
      const trabajador = await prisma.trabajador.findUnique({
        where: { id: id as string },
      });
      trabajador
        ? res.status(200).send(trabajador)
        : res.status(400).send("no se pudo encontrar el trabajador");
    }
    if (req.method === "PUT") {
      /// EN ESPERA DEL TOKEN --- NO TOCAR
      if (!id) throw new Error("Token inexistente o invalido");
      const token = authorization?.split(" ")[1];
      //const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
      //console.log("2", decodedToken);
      const user = await prisma.trabajador.findUnique({
        where: { id: id as string },
      });
      console.log(user);
      if (user) return res.status(200).send("user encontrado");
    }
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
