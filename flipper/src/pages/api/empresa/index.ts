import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

interface empresa {
  nombre: string;
  nombreceo: string;
  email: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  password: string | undefined;
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const user = await prisma.empresa.findMany();
    if (user) {
      user.forEach((empresa: empresa) => (empresa.password = undefined));
      res.status(200).send(user);
    } else {
      res
        .status(400)
        .send("No hay empresas, hay que esperar a que se registren");
    }
  }
}
