import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import jwt from "jsonwebtoken";

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
      const eventoTable = await prisma.evento.findMany();
      return res.status(200).json(eventoTable);
    }
    if (req.method === "PUT") {
      const {
        idEvento,
        admitePostulaciones,
        nombre,
        fecha_inicio,
        fecha_final,
        lugar,
        cupos,
        perfil,
        pago,
        numeroPostulantes,
        observaciones,
        isDeleted,
      } = req.body;
      const updateEvento = await prisma.evento.update({
        where: { id: idEvento },
        data: {
          nombre,
          isDeleted,
          admitePostulaciones,
          fecha_inicio,
          fecha_final,
          lugar,
          cupos,
          perfil,
          pago,
          numeroPostulantes,
          observaciones,
        },
      });
      return res.status(200).json("actualizacion con exito");
    }
  }
}
