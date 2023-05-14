import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { Evento } from "@prisma/client";
import jwt from "jsonwebtoken";

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
  const { authorization } = req.headers;
  let token = null;
  if (authorization && authorization.toLocaleLowerCase().startsWith("bearer")) {
    token = authorization.split(" ")[1]; // obtenemos el token del authorization 'bearer token'
  }
  if (!token) {
    return res.status(401).json("Token inexistente o invalido");
  }
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
  if (decodedToken) {
    if (req.method === "GET") {
      const events = await prisma.evento.findMany();
      if (events) {
        res.status(200).json(events);
      } else {
        res
          .status(400)
          .json("No hay empresas, hay que esperar a que se registren");
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
        establecimiento: string;
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
          establecimiento,
          observaciones,
        }: inputPostApiHomeCreateEventId = req.body;

        // obtengo la fecha actual en formato que se pueda comparar con lo que enviamos
        let q = new Date();
        let q2 = q.getTimezoneOffset() * 60000;
        q = new Date(q.getTime() - q2);
        fecha_inicio = new Date(fecha_inicio);
        let fecha_inicio_2 = fecha_inicio.getTimezoneOffset() * 60000;
        fecha_inicio = new Date(fecha_inicio.getTime() - fecha_inicio_2);
        //fecha_inicio = new Date(fecha_inicio);
        fecha_final = new Date(fecha_final);
        let fecha_final_2 = fecha_final.getTimezoneOffset() * 60000;
        fecha_final = new Date(fecha_final.getTime() - fecha_final_2);
        console.log(q);
        if (fecha_inicio < q) {
          console.log(new Date(fecha_inicio));
          console.log("La fecha de inicio es menor que Hoy");
          return res.status(400).json("La fecha de inicio es menor que Hoy");
        }
        if (fecha_inicio > fecha_final) {
          return res
            .status(400)
            .json("La fecha de inicio es mayor que la de finalización");
        }
        console.log("pasa los errores de fecha");
        //fecha_inicio_input.slice(0, -1);
        //fecha_final_input.slice(0, -1);

        //fecha_final = new Date(fecha_final.toISOString());
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
            establecimiento,
            observaciones,
          },
        });
        return res.status(200).json("Evento creado con exito");
      } catch (err: unknown) {
        return res.status(400).json(err);
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
    if (req.method === "PUT" && req.body.realmethod === "PUT") {
      interface putEvento {
        isDeleted?: boolean;
        nombre?: string;
        fecha_inicio: string | Date;
        fecha_final: string | Date;
        lugar?: string;
        cupos?: number;
        perfil?: string;
        pago?: number;
        establecimiento?: string;
        observaciones?: string;
        trabajadores?: string;
      }
      const id: string = req.body.idEvent as string;
      if (Object.keys(req.body.values).length === 0) {
        res.status(400).json("Objeto vacio");
      }
      try {
        if (!id) throw new Error("No existe ese evento");
        let {
          isDeleted,
          trabajadores,
          nombre,
          fecha_inicio,
          fecha_final,
          lugar,
          cupos,
          perfil,
          pago,
          establecimiento,
          observaciones,
        }: putEvento = req.body.values;

        // obtengo la fecha actual en formato que se pueda comparar con lo que enviamos
        let q = new Date();
        let m = q.getMonth() + 1;
        let d = q.getDay();
        let y = q.getFullYear();

        let date = new Date(y, m, d);

        if (new Date(fecha_inicio) < date) {
          return res.status(400).json("La fecha de inicio es menor que Hoy");
        }
        if (new Date(fecha_inicio) > new Date(fecha_final)) {
          return res
            .status(400)
            .json("La fecha de inicio es mayor que la de finalización");
        }

        fecha_inicio = new Date(fecha_inicio);
        let fecha_inicio_2 = fecha_inicio.getTimezoneOffset() * 60000;
        fecha_inicio = new Date(fecha_inicio.getTime() - fecha_inicio_2);
        //fecha_inicio = new Date(fecha_inicio);
        fecha_final = new Date(fecha_final);
        let fecha_final_2 = fecha_final.getTimezoneOffset() * 60000;
        fecha_final = new Date(fecha_final.getTime() - fecha_final_2);

        const evento = await prisma.evento.update({
          where: {
            id: id,
          },
          data: {
            nombre: nombre,
            fecha_inicio: fecha_inicio,
            fecha_final: fecha_final,
            lugar: lugar,
            cupos: cupos,
            perfil: perfil,
            pago: pago,
            establecimiento: establecimiento,
            observaciones: observaciones,
          },
        });
        console.log("evento 1 ");
        console.log(evento);
        if (evento) {
          return res.status(200).json("Evento actualizado con exito");
        }
      } catch (error: any) {
        console.log("error 1");
        console.log(error);
        return res.status(400).json(error.message);
      }
    }
  }
}

/*RUTA CREATE-EVENT/:ID
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";




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

    res.status(200).json(empresaEventos);
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

    res.status(200).json("deleted");
    
  } else 
}

*/
