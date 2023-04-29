import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { cancelNotification, transport } from "@/services/transportEmail";
import { DataTRegister } from "../users/register/trabajador";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //res.status(200).send("llega a la ruta");
  /* console.log(req.method); */
  const id: string = req.body.eventoId as string;
  /* console.log(id); */
  const evento = await prisma.evento.findUnique({
    where: {
      id,
    },

    include: {
      trabajadores: {
        include: {
          trabajadores: true,
        },
      },
    },
  });
  if (req.method === "PUT" && req.body.realmethod === "GET") {
    try {
      if (evento) return res.status(200).send(evento);
    } catch (error: any) {
      return res.status(400).send(evento);
    }
  }
  /*
  1. RUTA GET /api/event/:idEvento
  /api/event/2
  */
  // if (req.method === "GET") {
  //   /*
  //   if (evento?.isDeleted) {
  //     res.status(404).send("evento no encontrado");
  //   } else {
  //     res.status(200).send(evento);
  //   }
  //   */
  //   //const id: string = req.query.id as string; //id del usuario
  //   //console.log(id);
  //   const userTrabajador = await prisma.trabajador.findUnique({
  //     where: {
  //       id,
  //     },
  //   });
  //   if (userTrabajador === null) {
  //     const userEmpresa = await prisma.empresa.findUnique({
  //       where: {
  //         id,
  //       },
  //       select: {
  //         nombre: true,
  //         isDeleted: true,
  //         nombreceo: true,
  //         email: true,
  //         ciudad: true,
  //         direccion: true,
  //         telefono: true,
  //         eventos: true,
  //       },
  //     });
  //     console.log(userEmpresa); //cuando no encuentra nada user === null
  //     res.status(200).send(userEmpresa);
  //   }
  //   const allEvents = await prisma.evento.findMany();
  //   console.log(allEvents); //cuando no encuentra nada user === null
  //   res.status(200).send(allEvents);
  //}
  /*
  2. RUTA PUT /api/home/:idEvento
  /api/home/2
  RUTA PARA QUE LA EMPRESA PUEDA ACTUALIZAR EL STATUS DEL POSTULANTE
  {
    "trabajadorId": "34326e6f-2392-4097-810a-715df40bace1",
    "status": "RECHAZADO"
  }
  */
  if (req.method === "PUT" && req.body.realmethod === "PUT") {
    if (evento?.isDeleted) {
      res.status(404).send("evento no encontrado");
    } else {
      res.status(200).send(evento);
    }
    const trabajadorId: string = req.body.trabajadorId as string;
    const status: string = req.body.status as string;
    const eventoUpdate = await prisma.trabajadoresEnEventos.update({
      where: {
        eventoId_trabajadorId: {
          eventoId: id,
          trabajadorId,
        },
      },
      data: {
        status,
      },
    });
    res.status(200).send("Status del candidato actualizado");
  }
  /*
  3. RUTA DELETE /api/home/:idEvento
  /api/home/2
  RUTA PARA QUE LA EMPRESA PUEDA CANCELAR EVENTOS
  */
  if (req.method === "PUT" && req.body.realmethod === "DELETE") {
    console.log("detecta que es deleted");
    if (evento?.isDeleted) {
      return res.status(404).send("evento no encontrado o ya eliminado");
    } else {
      console.log(id);
      const deletedEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          isDeleted: true,
        },
      });
      const trabajadoresEvento = await prisma.trabajadoresEnEventos.findMany({
        where: {
          eventoId: evento?.id,
        },
        include: {
          trabajadores: true,
        },
      });
      let aprobados: any = [];
      trabajadoresEvento.forEach((e: any) => {
        if (e.status === "APROBADO") {
          aprobados.push(e);
        }
      });

      if (aprobados.length > 0) {
        const mails = aprobados.map((e: any) => {
          return e.trabajadores.email;
        });

        transport.sendMail(
          cancelNotification(mails, evento?.nombre),
          (err: any, info: any) =>
            err ? console.log(err) : console.log(info.response)
        );
      }
      return res.status(200).send("Evento borrado con exito");
    }
  }
}
