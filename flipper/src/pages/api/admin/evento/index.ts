import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const eventoTable = await prisma.evento.findMany();
    return res.status(200).send(eventoTable);
  }
  if (req.method === "PUT") {
    const {
      idEvento,
      admitePostulaciones,
      nombre,
      fecha_inicio,
      fecha_final,
      lugar,
      cupos,
      perfil,
      pago,
      numeroPostulantes,
      observaciones,
      isDeleted,
    } = req.body;
    const updateEvento = await prisma.evento.update({
      where: { id: idEvento },
      data: {
        nombre,
        isDeleted,
        admitePostulaciones,
        fecha_inicio,
        fecha_final,
        lugar,
        cupos,
        perfil,
        pago,
        numeroPostulantes,
        observaciones,
      },
    });
    return res.status(200).send("actualizacion con exito");
  }
}
