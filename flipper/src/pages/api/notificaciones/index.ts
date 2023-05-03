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
    // Buscar evento y guardarme la fecha de inicio
    try {
      const trabajadorenevento = await prisma.trabajadoresEnEventos.update({
        where: {
          eventoId_trabajadorId: {
            eventoId,
            trabajadorId,
          },
          // Donde la fecha de inicio no haya pasado
        },
        data: {
          notificacionVista
        }
      })
      return res.status(200).send('Cambio exitoso');
    } catch (error: unknown) {
      res.status(400).send(error);
    }
  }
}