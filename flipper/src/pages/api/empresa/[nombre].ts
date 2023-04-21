import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const nombre: string = req.query[0] as string;
    let user = await prisma.empresa.findFirst({
      where: {
        nombre: nombre,
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
          nombre: nombre,
        },
        data: {
          isDeleted: true,
        },
      });
    }
    res.status(200).send("DELETE");
  } else if (req.method === "PUT") {
    const nombre: string = req.query.nombre as string;
    if (Object.keys(req.body).length === 0) {
      res.status(400).send("Objeto vacio");
    }
    interface putEmpresa {
      name?: string;
      isDeleted?: boolean;
      nombreceo?: string;
      email?: string;
      ciudad?: string;
      direccion?: string;
      telefono?: string;
      //password?: string; no implementado por que se puede lograr lo mismo con recuperar password
    }
    let {
      name,
      isDeleted,
      nombreceo,
      email,
      ciudad,
      direccion,
      telefono,
    }: //password?: string; no implementado por que se puede lograr lo mismo con recuperar password
    putEmpresa = req.body;

    if (typeof isDeleted == "boolean") {
      //console.log(req.query);
      const updateEvent = await prisma.empresa.update({
        where: {
          nombre: nombre,
        },
        data: {
          isDeleted: isDeleted,
        },
      });
      res.status(200).send("PUT");
    }

    if (typeof name === "string") {
      const updateEvent = await prisma.empresa.update({
        where: {
          nombre: nombre,
        },
        data: {
          nombre: name,
        },
      });
    }
    if (typeof nombreceo === "string") {
      const updateEvent = await prisma.empresa.update({
        where: {
          nombre: nombre,
        },
        data: {
          nombreceo: nombreceo,
        },
      });
    }
    if (typeof email === "string") {
      const updateEvent = await prisma.empresa.update({
        where: {
          nombre: nombre,
        },
        data: {
          email,
        },
      });
    }
    if (typeof ciudad === "string") {
      const updateEvent = await prisma.empresa.update({
        where: {
          nombre: nombre,
        },
        data: {
          ciudad: ciudad,
        },
      });
    }
    if (typeof direccion === "string") {
      const updateEvent = await prisma.empresa.update({
        where: {
          nombre: nombre,
        },
        data: {
          direccion: direccion,
        },
      });
    }
    if (typeof telefono === "string") {
      const updateEvent = await prisma.empresa.update({
        where: {
          nombre: nombre,
        },
        data: {
          telefono: telefono,
        },
      });
    }
    res.status(200).send("check status");
  }
}
