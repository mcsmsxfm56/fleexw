import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { Evento } from "@prisma/client";

//tipado del objeto json esperado en POST /api/event
interface input {
  id_empresa: string;
  nombre: string;
  fecha: string | Date;
  hora_final: string | Date;
  lugar: string;
  cupos: number;
  perfil: string;
  pago: number;
  observaciones: string;
}

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Evento | string | unknown>
) {
  //se verifica si el tipado es valido
  try {
    let {
      id_empresa,
      nombre,
      fecha,
      lugar,
      cupos,
      perfil,
      pago,
      observaciones,
      hora_final,
    }: input = req.body;

    if (req.method === "GET") {
      //ruta GET /api/event para buscar eventos
      res.status(200).send("GET");
    } else if (req.method === "POST") {
      //este try verifica que los datos del JSON sean validos, si no son validos el evento no se crea
      try {
        fecha = new Date(fecha);
        hora_final = new Date(hora_final);
        const event = await prisma.evento.create({
          data: {
            id_empresa,
            nombre,
            fecha,
            hora_inicio: fecha,
            hora_final,
            lugar,
            cupos,
            perfil,
            pago,
            observaciones,
          },
        });
        res.status(200).send(event);
      } catch (err: unknown) {
        /*
        id_empresa no disponible en tabla empresa
        {
            "code": "P2003",
            "clientVersion": "4.13.0",
            "meta": {
                "field_name": "Evento_id_empresa_fkey (index)"
            }
        }

        fecha invalida retorna objeto vacio, es cuando estas dos lineas fallan
        fecha = new Date(fecha);
        hora_final = new Date(hora_final);
         */
        res.status(400).send(err);
      }
    }
  } catch (err: unknown) {
    /*
    error de tipado en POST request json
    {
        "clientVersion": "4.13.0"
    }
    */
    res.status(400).send(err);
  }
}
