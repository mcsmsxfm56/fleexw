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
  }
}
