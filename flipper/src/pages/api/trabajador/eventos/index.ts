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

    const trabajador = await prisma.trabajador.findUnique({
      where: { id },
    });
    //console.log("trabajador", trabajador);

    if (trabajador) {
      let eventosPorCiudad = await prisma.evento.findMany({
        where: {
          lugar: {
            contains: trabajador.ciudad as string,
            mode: "insensitive",
          },
        },
      });
      //console.log("evento por ciudad", eventosPorCiudad);
      if (!eventosPorCiudad) {
        const eventosNotFound = "No hay eventos disponibles";
        res.status(404).send(eventosNotFound);
      }
      //console.log(eventosPorCiudad);
      return res.status(200).send(eventosPorCiudad);
    }
  }
}
