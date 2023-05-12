import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const trabajadorId = req.body.trabajadorId as string;
    const eventoId = req.body.eventoId as string;
    const notificacionVista = req.body.notificacionVista as boolean;
    try {
      const trabajadorenevento = await prisma.trabajadoresEnEventos.update({
        where: {
          eventoId_trabajadorId: {
            eventoId,
            trabajadorId,
          },
        },
        data: {
          notificacionVista
        }
      })
      return res.status(200).json('Cambio notificacionVista exitoso');
    } catch (error: unknown) {
      return res.status(400).json(error);
    }
  }
}