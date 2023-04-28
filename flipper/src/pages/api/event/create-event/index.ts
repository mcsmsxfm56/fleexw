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
      //console.log("req.body funciona");
      //console.log(nombre);
      //fecha_inicio_input.slice(0, -1);
      //fecha_final_input.slice(0, -1);
      fecha_inicio = new Date(fecha_inicio);
      let fecha_inicio_2 = fecha_inicio.getTimezoneOffset() * 60000;
      fecha_inicio = new Date(fecha_inicio.getTime() - fecha_inicio_2);
      //console.log(fecha_inicio.toISOString());
      //fecha_inicio = new Date(fecha_inicio);
      //console.log(fecha_inicio);
      fecha_final = new Date(fecha_final);
      let fecha_final_2 = fecha_final.getTimezoneOffset() * 60000;
      fecha_final = new Date(fecha_final.getTime() - fecha_final_2);
      //fecha_final = new Date(fecha_final.toISOString());
      //console.log(fecha_final);
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

/*RUTA CREATE-EVENT/:ID
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";


interface putEvento {
  isDeleted?: boolean;
  nombre?: string;
  fecha?: string | Date;
  hora_final?: string | Date;
  lugar?: string;
  cupos?: number;
  perfil?: string;
  pago?: number;
  observaciones?: string;
  trabajadores?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    //ruta GET /api/event/:id para obtener un evento en especifico
    //NextApiRequest.query extends {}
    //req.query[0] as unknown

    //RECIBIR ID DE UNA EMPRESA PARA MOSTRARLE SUS EVENTOS, FIELD EVENTOS EN MODELO
    const id: string = req.query[0] as string; //ESPERA UN STRING UUID
    const empresaEventos = await prisma.empresa.findUnique({
      where: {
        id,
      },
    });

    res.status(200).send(empresaEventos);
  } else if (req.method === "DELETE") {
    //recibe la id del evento por query y hace borrado logico
    const id: string = req.query.id as string;
    const event = await prisma.evento.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    res.status(200).send("deleted");
  } else if (req.method === "PUT") {
    const id: string = req.query.id as string;
    //console.log(id);
    if (Object.keys(req.body).length === 0) {
      res.status(400).send("Objeto vacio");
    }
    try {
      if (!id) throw new Error("No existe ese evento");
      let {
        isDeleted,
        trabajadores,
        nombre,
        fecha,
        hora_final,
        lugar,
        cupos,
        perfil,
        pago,
        observaciones,
      }: putEvento = req.body;

      const evento = await prisma.evento.update({
        where: {
          id: id,
        },
        data: {
          nombre: nombre,
          fecha_inicio: fecha,
          fecha_final: hora_final,
          lugar: lugar,
          cupos: cupos,
          perfil: perfil,
          pago: pago,
          observaciones: observaciones,
        },
      });
      if (evento) {
        return res.status(200).send("Evento actualizado con exito");
      }
    } catch (error: any) {
      return res.status(400).send(error.message);
    }

  }
}

*/
