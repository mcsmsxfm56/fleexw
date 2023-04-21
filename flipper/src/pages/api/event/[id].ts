import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    //ruta GET /api/empresa/name para obtener una empresa en especifico
    //NextApiRequest.query extends {}
    //req.query[0] as unknown
    const id: number = parseInt(req.query[0] as string);
    const event = await prisma.evento.findUnique({
      where: {
        id,
      },
    });

    res.status(200).send(event);
  } else if (req.method === "DELETE") {
    //recibe la id del evento por query y hace borrado logico
    const id: number = parseInt(req.query[0] as string);
    const event = await prisma.evento.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    res.status(200).send("deleted");
  }
}
