import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";


interface putEvento {
  isDeleted?: boolean;
  nombre?: string;
  fecha?: string | Date;
  hora_final?: string | Date;
  lugar?: string;
  cupos?: number;
  perfil?: string;
  pago?: number;
  observaciones?: string;
  trabajadores?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    //ruta GET /api/event/:id para obtener un evento en especifico
    //NextApiRequest.query extends {}
    //req.query[0] as unknown

    //RECIBIR ID DE UNA EMPRESA PARA MOSTRARLE SUS EVENTOS, FIELD EVENTOS EN MODELO
    const id: string = req.query[0] as string; //ESPERA UN STRING UUID
    const empresaEventos = await prisma.empresa.findUnique({
      where: {
        id,
      },
    });

    res.status(200).send(empresaEventos);
  } else if (req.method === "DELETE") {
    //recibe la id del evento por query y hace borrado logico
    const id: string = req.query.id as string;
    const event = await prisma.evento.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    res.status(200).send("deleted");
  } else if (req.method === "PUT") {
    const id: string = req.query.id as string;
    //console.log(id);
    if (Object.keys(req.body).length === 0) {
      res.status(400).send("Objeto vacio");
    }
    try {
      if (!id) throw new Error("No existe ese evento");
      let {
        isDeleted,
        trabajadores,
        nombre,
        fecha,
        hora_final,
        lugar,
        cupos,
        perfil,
        pago,
        observaciones,
      }: putEvento = req.body;

      const evento = await prisma.evento.update({
        where: {
          id: id,
        },
        data: {
          nombre: nombre,
          fecha_inicio: fecha,
          fecha_final: hora_final,
          lugar: lugar,
          cupos: cupos,
          perfil: perfil,
          pago: pago,
          observaciones: observaciones,
        },
      });
      if (evento) {
        return res.status(200).send("Evento actualizado con exito");
      }
    } catch (error: any) {
      return res.status(400).send(error.message);
    }

  }
}
