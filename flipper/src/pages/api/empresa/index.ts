import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

//tipado del objeto json esperado en GET /api/empresa

//tipado del objeto json esperado en POST /api/empresa
//tipado del objeto json esperado en UPDATE /api/empresa
//tipado del objeto json esperado en DELETE /api/empresa

//ejemplo de request esperado en GET /api/empresa

//ejemplo de request esperado en POST /api/empresa
//ejemplo de request esperado en UPDATE /api/empresa
//ejemplo de request esperado en DELETE /api/empresa

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
  if (req.method === "GET") {
    //ruta GET /api/empresa para obtener una lista de todas las empresas
    const user = await prisma.empresa.findMany();
    if (user) {
      //user es un array de objetos y cada objeto es una empresa
      //user.password = undefined;
      user.forEach((empresa: empresa) => (empresa.password = undefined));
      res.status(200).send(user);
    } else {
      res
        .status(400)
        .send("No hay empresas, hay que esperar a que se registren");
    }
  }
  if (req.method === "POST") {
    //ruta POST /api/empresa para buscar eventos
    res.status(200).send("POST");
  }
  if (req.method === "UPDATE") {
    //ruta UPDATE /api/empresa para buscar eventos
    res.status(200).send("UPDATE");
  }
  if (req.method === "DELETE") {
    //ruta DELETE /api/empresa para buscar eventos
    res.status(200).send("DELETE");
  }
}
