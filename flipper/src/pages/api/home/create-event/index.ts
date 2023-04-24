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
  /*
  1. RUTA POST /api/home/create-event
  2. SE ESPERA QUE RECIBA 
  #de fecha tambien se extrae la hora inicial
  #hora final de evento, siempre incluir dia mes y año
  #los eventos de momento solo seran en colombia
  #Postulaciones que la empresa acepta, cuando se reciban mas de 100 postulaciones se deshabilitan las postulaciones
  #esta en pesos colombianos
  {
  "id_empresa": "c68810cb-eca2-4d7a-b9f7-aa03569d3dd6",
  "nombre": "nombreDelEvento22455",
  "fecha_inicio": "22 April 2023 20:00 UTC",
  "fecha_final": "23 April 2023 02:00 UTC",
  "lugar": "Ciudad, Provincia",
  "cupos": 100,
  "perfil": "tipo de candidatos que se busca reclutar para el evento ej: camarero, fotografo",
  "pago": 50000,
  "observaciones": "cualquier dato adicional que la empresa quiera proveer sobre la organizacion del evento"
}

  */
  if (req.method === "POST") {
    //SE VERIFICA EL TIPADO
    interface inputPostApiHomeCreateEventId {
      id_empresa: string;
      nombre: string;
      fecha_inicio: string | Date;
      fecha_final: string | Date;
      lugar: string;
      cupos: number;
      perfil: string;
      pago: number;
      observaciones: string;
    }
    try {
      let {
        id_empresa,
        nombre,
        fecha_inicio,
        fecha_final,
        lugar,
        cupos,
        perfil,
        pago,
        observaciones,
      }: inputPostApiHomeCreateEventId = req.body;
      console.log(nombre);
      fecha_inicio = new Date(fecha_inicio);
      console.log(fecha_inicio);
      fecha_final = new Date(fecha_final);
      console.log(fecha_final);
      const eventoCreado = await prisma.evento.create({
        data: {
          id_empresa,
          nombre,
          fecha_inicio,
          fecha_final,
          lugar,
          cupos,
          perfil,
          pago,
          observaciones,
        },
      });
      res.status(200).send("Evento creado con exito");
    } catch (err: unknown) {
      res.status(400).send(err);
      /*
    1. ERROR DE TIPADO RETORNO
    {
        "clientVersion": "4.13.0"
    }
    2. ERROR id_empresa INVALIDA, ES UN STRING PERO NO EXISTE UNA EMPRESA CON ESA ID
    {
        "code": "P2003",
        "clientVersion": "4.13.0",
        "meta": {
            "field_name": "Evento_id_empresa_fkey (index)"
        }
    }
    */
    }
  }
}
