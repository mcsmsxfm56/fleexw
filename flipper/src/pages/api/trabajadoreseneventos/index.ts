import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { Trabajador } from "@prisma/client";
import jwt from "jsonwebtoken";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization } = req.headers;
  let token = null;

  if (authorization && authorization.toLocaleLowerCase().startsWith("bearer")) {
    token = authorization.split(" ")[1]; // obtenemos el token del authorization 'bearer token'
  }
  if (!token) {
    return res.status(401).json("Token inexistente o invalido");
  }
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
  if (decodedToken) {
    if (req.method === "GET") {
      const eventoId = req.body.eventoId as string;
      try {
        const trabajadoresEnEventos =
          await prisma.trabajadoresEnEventos.findMany({
            where: {
              eventoId,
            },
          });
        res.status(200).json(trabajadoresEnEventos);
      } catch (error: unknown) {
        res.status(400).json(error);
      }
    }

    if (req.method === "PUT" && req.body.realmethod === "GET") {
      const trabajadorId = req.body.trabajadorId;
      const { status, ordenFecha } = req.body;

      if (status && ordenFecha === "PROXIMOS") {
        const id = req.body.id as string;
        let presentDate = new Date();
        presentDate.setHours(presentDate.getHours() - 5);
        const trabajadorConfirmado =
          await prisma.trabajadoresEnEventos.findMany({
            where: {
              trabajadorId,
              status: status,
              evento: {
                fecha_inicio: { gte: presentDate },
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
        return res.status(200).json(trabajadorConfirmado);
      }
      if (status && ordenFecha === "HISTORIAL") {
        const id = req.body.id as string;
        let presentDate = new Date();
        presentDate.setHours(presentDate.getHours() - 5);
        let trabajadoresEnEventos = await prisma.trabajadoresEnEventos.findMany(
          {
            where: {
              trabajadorId,
              status,
              evento: {
                fecha_inicio: { lte: presentDate },
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
              createdAt: "desc",
            },
          }
        );
        return res.status(200).json(trabajadoresEnEventos);
      }
      const id = req.body.id as string;
      let presentDate = new Date();
      presentDate.setHours(presentDate.getHours() - 5);
      const trabajadoresEnEventos = await prisma.trabajadoresEnEventos.findMany(
        {
          //Donde la fecha de inicio no haya pasado
          where: {
            AND: [
              {
                trabajadorId,
              },
              {
                evento: {
                  fecha_inicio: {
                    gte: presentDate,
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
      return res.status(200).json(trabajadoresEnEventos);

      /*
    

    if (!req.body.historial) {
      const trabajadoresEnEventos = await prisma.trabajadoresEnEventos.findMany(
        {
          Donde la fecha de inicio no haya pasado
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
      return res.status(200).json(trabajadoresEnEventos);
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
      return res.status(200).json(trabajadoresEnEventos);
    }
    */
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
        const trabajadorUpdateStatus =
          await prisma.trabajadoresEnEventos.update({
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
        res.status(200).json(trabajadorUpdateStatus);
      } catch (error: unknown) {
        res.status(400).json(error);
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
    //   return res.status(200).json(trabajadoresEnEventos);
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
          id: trabajadorId,
        },
      });

      if (!trabajador) return res.status(400).json("Trabajador no encontrado");
      if (!checkOptionalFields(trabajador))
        return res
          .status(403)
          .json(
            "Debes completar todos los campos de tu perfil para poder postularte"
          );

      let evento = await prisma.evento.findUnique({
        where: {
          id: eventoId,
        },
        include: {
          trabajadores: true,
        },
      });

      //tiene la propiedad trabajadorId evento.trabajadores.amp((objTrabajador) => objTrabajador.trabajadorId)
      let check = evento?.trabajadores.filter(
        (objTrabajador) => objTrabajador.trabajadorId === trabajadorId
      );
      if (check?.length !== 0) {
        return res.status(400).json("ya te postulaste a este evento");
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
          .json("No se aceptan mas postulaciones en este evento");
      }

      try {
        const trabajadorCreateStatus =
          await prisma.trabajadoresEnEventos.create({
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
        return res.status(200).json("postulacion realizada con exito");
      } catch (error: unknown) {
        return res.status(400).json(error);
      }
    }
  }
}

// No recorro directamente las keys del objeto, porque ay algunas que es válido que sean false
// Por ejemplo: isDeleted, resetContraseñaCode
const checkOptionalFields = (t: Trabajador): boolean => {
  let valid = true;
  if (
    !t.nacimiento ||
    !t.genero ||
    !t.ciudad ||
    !t.direccion ||
    !t.estatura ||
    !t.talla_camiseta ||
    !t.grupo_sanguineo ||
    !t.cv ||
    !t.imagen_dni ||
    !t.foto ||
    !t.rut ||
    !t.certificado_bancario ||
    !t.Edad
  )
    valid = false;
  return valid;
};
