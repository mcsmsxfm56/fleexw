import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    //ruta GET /api/empresa/name para obtener una empresa en especifico
    const { nombre } = req.query;
    const user = await prisma.empresa.findFirst({
      where: {
        nombre,
      },
    });
    if (user) {
      user.password = undefined;
      res.status(200).send(user);
    } else {
      res.status(400).send("Empresa no encontrada");
    }
  } else if (req.method === "DELETE") {
    //console.log("llego al flujo");
    const { nombre } = req.query;
    const updateUser = await prisma.empresa.update({
      where: {
        nombre,
      },
      data: {
        isDeleted: true,
      },
    });
    res.status(200).send("DELETE");
  }
}
