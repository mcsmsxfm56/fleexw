import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import jwt from "jsonwebtoken";
import { token } from "../../trabajador/modTrabajador";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization } = req.headers;
  let token = null;
  if (authorization && authorization.toLocaleLowerCase().startsWith("bearer")) {
    token = authorization.split(" ")[1]; // obtenemos el token del authorization 'bearer token'
  }
  if (!token) {
    return res.status(401).json("Token inexistente o invalido");
  }
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
  if (decodedToken) {
    if (req.method === "GET") {
      const empresaTable = await prisma.empresa.findMany();
      return res.status(200).json(empresaTable);
    }
    if (req.method === "PUT") {
      const {
        idEmpresa,
        authorizedByAdmin,
        nombre,
        nombreceo,
        telefono,
        ciudad,
        direccion,
        email,
        isDeleted,
      } = req.body;
      const updateEmpresa = await prisma.empresa.update({
        where: { id: idEmpresa },
        data: {
          nombre,
          isDeleted,
          nombreceo,
          email,
          authorizedByAdmin,
          ciudad,
          direccion,
          telefono,
        },
      });
      return res.status(200).json("actualizacion con exito");
    }
  }
}
