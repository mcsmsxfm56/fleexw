import prisma from "../../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface Evento {
  id: string;
  isDeleted: boolean;
  nombre: string;
  fecha_inicio: string | Date;
  fecha_final: string | Date;
  lugar: string | RegExp | undefined;
  cupos: number;
  perfil: string;
  pago: number;
  observaciones: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Evento[]>
) {
  if (req.method === "PUT" && req.body.realmethod === "GET") {
    const id = req.body.id as string;
    let presentDate = new Date();
    presentDate.setHours(presentDate.getHours() - 5);
    const trabajador = await prisma.trabajador.findUnique({
      where: { id },
    });
    if (trabajador) {
      let eventosPorCiudad = await prisma.evento.findMany({
        where: {
          fecha_inicio: { gte: presentDate },
          lugar: {
            contains: trabajador.ciudad as string,
            mode: "insensitive",
          },
        },
      });
      if (!eventosPorCiudad) {
        const eventosNotFound = "No hay eventos disponibles";
        res.status(404).json(eventosNotFound);
      }
      return res.status(200).json(eventosPorCiudad);
    }
  }
}
