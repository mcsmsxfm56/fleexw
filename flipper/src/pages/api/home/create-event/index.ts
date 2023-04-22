import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { Evento } from "@prisma/client";

//tipado del objeto json esperado en POST /api/event

//tipado del objeto json esperado en GET /api/event
//tipado del objeto json esperado en UPDATE /api/event
//tipado del objeto json esperado en DELETE /api/event

/*
ejemplo de request esperada en POST /api/event
{
 "id_empresa": "ac351c6e-6f6a-478b-b8a3-fa7a261ee736",
 "nombre": "fiesta3",
 "fecha": "10 April 2023 08:13 UTC",
 "hora_final": "10 April 2023 11:13 UTC",
 "lugar": "eeuu",
 "cupos": 20,
 "perfil": "el perfil que buscan para las contrataciones del evento",
 "pago": 10000,
 "observaciones": "el pago se hace el pesos colombianos"
}
*/

/*ejemplo de request esperada en GET /api/event */
/*ejemplo de request esperada en UPDATE /api/event */
/*ejemplo de request esperada en DELETE /api/event */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Evento | string | unknown>
) {
  if (req.method === "GET") {
    const events = await prisma.evento.findMany();
    if (events) {
      res.status(200).send(events);
    } else {
      res
        .status(400)
        .send("No hay empresas, hay que esperar a que se registren");
    }
  }
}
