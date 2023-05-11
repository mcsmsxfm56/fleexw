import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
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
    return res.status(401).send("Token inexistente o invalido");
  }
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
  if (decodedToken) {
    if (req.method === "GET") {
      const empresaTable = await prisma.empresa.findMany();
      const eventoTable = await prisma.evento.findMany({
        include: {
          empresa: true,
        },
      });
      const trabajadorTable = await prisma.trabajador.findMany();
      const trabajadoresEnEventosTable =
        await prisma.trabajadoresEnEventos.findMany({
          include: {
            evento: {
              include: {
                empresa: true,
                trabajadores: true,
              },
            },
            trabajadores: true,
          },
        });
      const dataDashboard = {
        empresaTable,
        eventoTable,
        trabajadorTable,
        trabajadoresEnEventosTable,
      };
      return res.status(200).send(dataDashboard);
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
      return res.status(200).send("actualizacion con exito");
    }
  }
}
