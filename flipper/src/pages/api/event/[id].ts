import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    //ruta GET /api/empresa/name para obtener una empresa en especifico
    //NextApiRequest.query extends {}
    //req.query[0] as unknown
    const id: number = parseInt(req.query[0] as string);
    const event = await prisma.evento.findUnique({
      where: {
        id,
      },
    });

    res.status(200).send(event);
  } else if (req.method === "DELETE") {
    //recibe la id del evento por query y hace borrado logico
    const id: number = parseInt(req.query[0] as string);
    const event = await prisma.evento.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    res.status(200).send("deleted");
  } else if (req.method === "UPDATE") {
    const id: number = parseInt(req.query[0] as string);
    //console.log(id);
    if (Object.keys(req.body).length === 0) {
      res.status(400).send("Objeto vacio");
    }
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

    if (typeof isDeleted == "boolean") {
      //console.log(req.body);
      const updateEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          isDeleted: isDeleted,
        },
      });
      res.status(200).send("PUT");
    }

    if (typeof trabajadores === "string") {
      const updateTrabajadores = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          trabajadores: {
            create: {
              assignedBy: "test",
              trabajadorId: trabajadores,
            },
            /* 
            {
              assignedAt?: Date | string
              assignedBy: string
              trabajadorId: string |TrabajadorCreateNestedOneWithoutEventosInput
            },
            TrabajadorCreateNestedOneWithoutEventosInput type
            
            */
          },
        },
      });
      //res.status(200).send("PUT");
    }

    if (typeof nombre === "string") {
      const updateEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          nombre,
        },
      });
      //res.status(200).send("PUT nombre");
    }
    if (typeof fecha === "string") {
      /*
      {
        "fecha": "10 October 2020 03:20 UTC"
        //en fecha tambien se setea la hora de inicio
      }
      */
      fecha = new Date(fecha);
      const updateEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          fecha,
          hora_inicio: fecha,
        },
      });
    }
    if (typeof hora_final === "string") {
      /*
      {
        "hora_final": "10 October 2020 03:20 UTC"
        //en hora final solo se toma la hora, la fecha puede ser cualquiera que no afecta
      }
      */
      hora_final = new Date(hora_final);
      const updateEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          hora_final,
        },
      });
    }
    if (typeof lugar === "string") {
      const updateEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          lugar,
        },
      });
    }
    if (typeof cupos === "number") {
      const updateEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          cupos,
        },
      });
    }
    if (typeof perfil === "string") {
      const updateEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          perfil,
        },
      });
    }
    if (typeof pago === "number") {
      const updateEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          pago,
        },
      });
    }
    if (typeof observaciones === "string") {
      const updateEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          observaciones,
        },
      });
    }
    //res.status(400).send("ningun campo valido se edito");
    res.status(200).send("check status");
  }
}
