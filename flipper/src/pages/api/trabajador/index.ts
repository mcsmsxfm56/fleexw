import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

//tipado del objeto json esperado en GET /api/trabajador
//tipado del objeto json esperado en POST /api/trabajador
//tipado del objeto json esperado en UPDATE /api/trabajador
//tipado del objeto json esperado en DELETE /api/trabajador

//ejemplo de request esperado en GET /api/trabajador
//ejemplo de request esperado en POST /api/trabajador
//ejemplo de request esperado en UPDATE /api/trabajador
//ejemplo de request esperado en DELETE /api/trabajador

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    //ruta GET /api/trabajador para buscar eventos
    res.status(200).send("GET");
  }
  if (req.method === "POST") {
    //ruta POST /api/trabajador para buscar eventos
    res.status(200).send("POST");
  }
  if (req.method === "UPDATE") {
    //ruta UPDATE /api/trabajador para buscar eventos
    res.status(200).send("UPDATE");
  }
  if (req.method === "DELETE") {
    //ruta DELETE /api/trabajador para buscar eventos
    res.status(200).send("DELETE");
  }
}
