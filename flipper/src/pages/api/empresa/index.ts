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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    //ruta GET /api/empresa para buscar eventos
    res.status(200).send("GET");
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
