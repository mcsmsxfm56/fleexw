import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

type returnedUser = {
  nombre: string;
  isDeleted: boolean;
  nombreceo: string;
  email: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  password?: string;
  id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    //ruta GET /api/empresa/name para obtener una empresa en especifico
    const nombre: string = req.query[0] as string;
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
    //console.log("llego al flujo");
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
  }
}
