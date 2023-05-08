import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
