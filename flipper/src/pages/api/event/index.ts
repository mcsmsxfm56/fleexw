import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { cancelNotification, transport } from "@/services/transportEmail";
import { DataTRegister } from "../users/register/trabajador";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization } = req.headers;
  /* console.log(authorization); */
  let token = null;
  if (authorization && authorization.toLocaleLowerCase().startsWith("bearer")) {
    token = authorization.split(" ")[1]; // obtenemos el token del authorization 'bearer token'
    /* console.log(token); */
  }
  if (!token) {
    return res.status(401).json("Token inexistente o invalido");
  }
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
  if (decodedToken) {
    if (req.method === "GET") {
      let allEvents = await prisma.evento.findMany();
      allEvents = allEvents.filter(
        (objEvent: any) => objEvent.isDeleted === false
      );
      return res.status(200).json(allEvents);
    }

    if (req.method === "PUT" && req.body.realmethod === "GET") {
      try {
        const id: string = req.body.eventoId as string;
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
        if (evento) return res.status(200).json(evento);
        return res.status(404).json("No se encontro el evento");
      } catch (error: any) {
        return res.status(400).json(error);
      }
    }
    /*
  1. RUTA GET /api/event/:idEvento
  /api/event/2
  */
    // if (req.method === "GET") {
    //   /*
    //   if (evento?.isDeleted) {
    //     res.status(404).json("evento no encontrado");
    //   } else {
    //     res.status(200).json(evento);
    //   }
    //   */
    //   //const id: string = req.query.id as string; //id del usuario
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
    //     res.status(200).json(userEmpresa);
    //   }
    //   const allEvents = await prisma.evento.findMany();
    //   res.status(200).json(allEvents);
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
      const id: string = req.body.eventoId as string;
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
      if (evento?.isDeleted) {
        return res.status(404).json("evento no encontrado");
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
          notificacionVista: false,
        },
      });
      return res
        .status(200)
        .json(`Status del candidato actualizado a ${eventoUpdate.status}`);
    }
    /*
  3. RUTA DELETE /api/home/:idEvento
  /api/home/2
  RUTA PARA QUE LA EMPRESA PUEDA CANCELAR EVENTOS
  */
    if (req.method === "PUT" && req.body.realmethod === "DELETE") {
      const id: string = req.body.eventoId as string;
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
      if (evento?.isDeleted) {
        return res.status(404).json("evento no encontrado o ya eliminado");
      } else {
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
          e.status = "CANCELADO";
        });

        if (aprobados.length > 0) {
          const mails = aprobados.map((e: any) => {
            return e.trabajadores.email;
          });

          transport.sendMail(
            cancelNotification(mails, evento?.nombre),
            (err: any, info: any) => (err ? err : info.response)
          );
        }

        // Actualiza las postulaciones para sean CANCELADO
        await prisma.trabajadoresEnEventos.updateMany({
          where: {
            eventoId: evento?.id,
          },
          data: {
            status: "CANCELADO",
          },
        });

        return res.status(200).json("Evento borrado con exito");
      }
    }
  }
}
