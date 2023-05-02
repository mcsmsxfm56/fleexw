import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT" && req.body.realmethod === "GET") {
    const trabajadorId = req.body.trabajadorId;
    const trabajadoresEnEventos = await prisma.trabajadoresEnEventos.findMany({
      where: {
        trabajadorId,
      },
      include: {
        evento: {
          include: {
            empresa: true,
          },
        },
      },
    });
    //console.log(eventoId);
    //console.log(trabajadoresEnEventos);
    //console.log(trabajadoresEnEventos);
    return res.status(200).send(trabajadoresEnEventos);
  }
  if (req.method === "GET") {
    const eventoId = req.body.eventoId as string;
    try {
      const trabajadoresEnEventos = await prisma.trabajadoresEnEventos.findMany(
        {
          where: {
            eventoId,
          },
        }
      );
      //console.log(eventoId);
      //console.log(trabajadoresEnEventos);
      res.status(200).send(trabajadoresEnEventos);
    } catch (error: unknown) {
      res.status(400).send(error);
    }
  }
  if (req.method === "PUT") {
    /*
    {
      "trabajadorId": "9c386e92-b891-4cd7-965e-31d6772f5014",
      "status": "APROBADO" | "RECHAZADO" | "PENDIENTE"
    }
    OBJETO ESPERADO
    */
    const status = req.body.status as string;
    const eventoId = req.body.eventoId as string;
    const trabajadorId = req.body.trabajadorId as string;
    try {
      const trabajadorUpdateStatus = await prisma.trabajadoresEnEventos.update({
        where: {
          eventoId_trabajadorId: {
            eventoId,
            trabajadorId,
          },
        },
        data: {
          status,
        },
      });
      //console.log(eventoId);
      //console.log(trabajadorUpdateStatus);
      res.status(200).send(trabajadorUpdateStatus);
    } catch (error: unknown) {
      res.status(400).send(error);
    }
  }
  if (req.method === "POST") {
    /*
    {
      "trabajadorId": "9c386e92-b891-4cd7-965e-31d6772f5014",
      "eventoId": ""
    }
    OBJETO ESPERADO
    */
    const eventoId = req.body.eventoId as string;
    const trabajadorId = req.body.trabajadorId as string;
    try {
      const trabajadorCreateStatus = await prisma.trabajadoresEnEventos.create({
        data: {
          eventoId,
          trabajadorId,
          status: "PENDIENTE",
        },
      });
      //console.log(eventoId);//
      //console.log(trabajadorUpdateStatus);
      return res.status(200).send(trabajadorCreateStatus);
    } catch (error: unknown) {
      return res.status(400).send(error);
    }
  }
}
