import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { Trabajador } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT" && req.body.realmethod === "GET") {
    const trabajadorId = req.body.trabajadorId;
    const { status, ordenFecha } = req.body;

    if (status && ordenFecha === "PROXIMOS") {
      const trabajadorConfirmado = await prisma.trabajadoresEnEventos.findMany({
        where: {
          trabajadorId,
          status: status,
          evento: {
            fecha_inicio: { gte: new Date() },
          },
        },
        include: {
          evento: {
            include: {
              empresa: true,
            },
          },
        },
      });
      return res.status(200).send(trabajadorConfirmado);
    }

    if (status && ordenFecha === "HISTORIAL") {
      const historialEventosTrabajador =
        await prisma.trabajadoresEnEventos.findMany({
          where: {
            trabajadorId,
            status: status,
            evento: {
              fecha_inicio: { lte: new Date() },
            },
          },
          include: {
            evento: {
              include: {
                empresa: true,
              },
            },
          },
        });
      return res.status(200).send(historialEventosTrabajador);
    }

    const trabajadoresEnEventos = await prisma.trabajadoresEnEventos.findMany({
      where: {
        trabajadorId,
        evento: {
          fecha_inicio: { gte: new Date() },
        },
      },
      include: {
        evento: {
          include: {
            empresa: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    // console.log("trabajadores en eventos", trabajadoresEnEventos);
    return res.status(200).send(trabajadoresEnEventos);
    /*
    

    if (!req.body.historial) {
      const trabajadoresEnEventos = await prisma.trabajadoresEnEventos.findMany(
        {
          // Donde la fecha de inicio no haya pasado
          where: {
            AND: [
              {
                trabajadorId,
              },
              {
                evento: {
                  fecha_inicio: {
                    gte: new Date(),
                  },
                },
              },
            ],
          },
          include: {
            evento: {
              include: {
                empresa: true,
              },
            },
          },
        }
      );
      return res.status(200).send(trabajadoresEnEventos);
    }
    if (req.body.historial) {
      const trabajadorId = req.body.trabajadorId;
      const trabajadoresEnEventos = await prisma.trabajadoresEnEventos.findMany(
        {
          // Donde la fecha de inicio HAYA pasado
          where: {
            AND: [
              {
                trabajadorId,
              },
              {
                evento: {
                  fecha_inicio: {
                    lte: new Date(),
                  },
                },
              },
            ],
          },
          include: {
            evento: {
              include: {
                empresa: true,
              },
            },
          },
        }
      );
      return res.status(200).send(trabajadoresEnEventos);
    }
    */
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
  // if (req.method === "POST" && req.body.realmethod === "HISTORIAL") {
  //   const trabajadorId = req.body.trabajadorId;
  //   const trabajadoresEnEventos = await prisma.trabajadoresEnEventos.findMany({
  //     // Donde la fecha de inicio HAYA pasado
  //     where: {
  //       AND: [
  //         {
  //           trabajadorId,
  //         },
  //         {
  //           evento: {
  //             fecha_inicio: {
  //               lte: new Date(),
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     include: {
  //       evento: {
  //         include: {
  //           empresa: true,
  //         },
  //       },
  //     },
  //   });
  //   //console.log(eventoId);
  //   //console.log(trabajadoresEnEventos);
  //   //console.log(trabajadoresEnEventos);
  //   return res.status(200).send(trabajadoresEnEventos);
  // }
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

    const trabajador = await prisma.trabajador.findUnique({
      where: {
        id: trabajadorId
      }
    })

    if (!trabajador)
      return res.status(400).send("Trabajador no encontrado");
    if (!checkOptionalFields(trabajador))
      return res.status(400).send("Debes completar todos los campos de tu perfil para poder postularte");

    let evento = await prisma.evento.findUnique({
      where: {
        id: eventoId,
      },
      include: {
        trabajadores: true,
      },
    });

    //console.log(evento);//evento.trabajadores array de objetos donde cada objeto
    //tiene la propiedad trabajadorId evento.trabajadores.amp((objTrabajador) => objTrabajador.trabajadorId)
    let check = evento?.trabajadores.filter(
      (objTrabajador) => objTrabajador.trabajadorId === trabajadorId
    );
    if (check?.length !== 0) {
      return res.status(400).send("ya te postulaste a este evento");
    }

    if (
      evento?.cupos === evento?.numeroPostulantes ||
      evento?.admitePostulaciones === false
    ) {
      evento = await prisma.evento.update({
        where: {
          id: eventoId,
        },
        data: {
          admitePostulaciones: false,
        },
        include: {
          trabajadores: true,
        },
      });
      return res
        .status(404)
        .send("No se aceptan mas postulaciones en este evento");
    }

    try {
      const trabajadorCreateStatus = await prisma.trabajadoresEnEventos.create({
        data: {
          eventoId,
          trabajadorId,
          status: "PENDIENTE",
        },
      });
      const counter = await prisma.evento.update({
        where: {
          id: eventoId,
        },
        data: {
          numeroPostulantes: {
            increment: 1,
          },
        },
      });
      //console.log(eventoId);//
      //console.log(trabajadorUpdateStatus);
      return res.status(200).send("postulacion realizada con exito");
    } catch (error: unknown) {
      return res.status(400).send(error);
    }
  }
}

// No recorro directamente las keys del objeto, porque ay algunas que es válido que sean false
// Por ejemplo: isDeleted, resetContraseñaCode
const checkOptionalFields = (t: Trabajador): boolean => {
  let valid = true;
  if (
    !t.nacimiento
    || !t.genero
    || !t.ciudad
    || !t.direccion
    || !t.estatura
    || !t.talla_camiseta
    || !t.grupo_sanguineo
    || !t.cv
    || !t.imagen_dni
    || !t.foto
    || !t.rut
    || !t.certificado_bancario
    || !t.Edad
  ) valid = false;
  return valid;
}