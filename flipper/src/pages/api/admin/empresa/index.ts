import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const empresaTable = await prisma.empresa.findMany();
    return res.status(200).send(empresaTable);
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
