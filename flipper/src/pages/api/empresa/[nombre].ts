import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const nombre: string = req.query[0] as string;
  if (req.method === "GET") {
    let user = await prisma.empresa.findFirst({
      where: {
        nombre,
      },
      select: {
        email: true,
        nombre: true,
        nombreceo: true,
        isDeleted: true,
        ciudad: true,
        direccion: true,
        telefono: true,
        password: false,
        eventos: true,
      },
    });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).send("Empresa no encontrada");
    }
  } else if (req.method === "DELETE") {
    const { nombre } = req.query;
    if (typeof nombre === "string") {
      const updateUser = await prisma.empresa.update({
        where: {
          nombre,
        },
        data: {
          isDeleted: true,
        },
      });
    }
    res.status(200).send("DELETE");
  } else if (req.method === "PUT") {
    //const nombre: string = req.query[0] as string;
    if (Object.keys(req.body).length === 0) {
      res.status(400).send("Objeto vacio");
    }
    interface putEmpresa {
      nombre?: string;
      isDeleted?: boolean;
      nombreceo?: string;
      email?: string;
      ciudad?: string;
      direccion?: string;
      telefono?: string;
      //password?: string; no implementado por que se puede lograr lo mismo con recuperar password
      eventos?: string[]; // van las id de los eventos que se quieren agregar a la cuenta empresa
      //no es necesario hacer un put de borrado por que los eventos tiene borrado logico
    }
    let {
      nombre,
      isDeleted,
      nombreceo,
      email,
      ciudad,
      direccion,
      telefono,
      //password?: string; no implementado por que se puede lograr lo mismo con recuperar password
      eventos, // van las id de los eventos que se quieren agregar a la cuenta empresa
    }: //no es necesario hacer un put de borrado por que los eventos tiene borrado logico
    putEmpresa = req.body;

    if (typeof isDeleted == "boolean") {
      //console.log(req.body);
      const updateEvent = await prisma.empresa.update({
        where: {
          nombre,
        },
        data: {
          isDeleted: isDeleted,
        },
      });
      res.status(200).send("PUT");
    }

    if (Array.isArray(eventos)) {
      const updateTrabajadores = await prisma.empresa.update({
        where: {
          nombre,
        },
        data: {
          eventos: {
            create: {
              assignedBy: "test",
              eventoId: eventos,
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
