import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { Evento } from "@prisma/client";
import jwt from "jsonwebtoken";

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
    if (req.method === "POST") {
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
        let q = new Date();
        q.setHours(q.getHours() - 5);
        console.log("q new Date Colombia", q);
        //let q2 = q.getTimezoneOffset() * 60000;
        //q = new Date(q.getTime() - q2);
        fecha_inicio = new Date(fecha_inicio);
        console.log("fecha_inicio new Date", fecha_inicio);
        //let fecha_inicio_2 = fecha_inicio.getTimezoneOffset() * 60000;
        //fecha_inicio = new Date(fecha_inicio.getTime() - fecha_inicio_2);
        //console.log("fecha_inicio alterada", fecha_inicio);
        fecha_final = new Date(fecha_final);
        console.log("fecha_final new Date", fecha_final);
        //let fecha_final_2 = fecha_final.getTimezoneOffset() * 60000;
        //fecha_final = new Date(fecha_final.getTime() - fecha_final_2);
        //console.log("fecha_final alterada", fecha_final);
        //console.log(q);
        let fecha_inicio_gmt = fecha_inicio.getHours();
        console.log("fecha inicio hora", fecha_inicio_gmt);
        let yearFechaInicio = fecha_inicio.getFullYear();
        let monthFechaInicio = fecha_inicio.getMonth();
        let dayFechaInicio = fecha_inicio.getDate();
        let minutesFechaInicio = fecha_inicio.getMinutes();
        let fechaInicio = new Date(
          yearFechaInicio,
          monthFechaInicio,
          dayFechaInicio
        );
        let fechaActual = new Date(q.getFullYear(), q.getMonth(), q.getDate());
        let horaActual = q.getHours();
        console.log("fecha inicio sin hora", fechaInicio);
        console.log("fecha actual sin hora", fechaActual); //2023-05-15T00:00:00.000Z
        //las fechas en el server de vercel llegan acorde al formulario
        //un new date en q genera hora GMT
        if (fecha_inicio < q) {
          //console.log(new Date(fecha_inicio));
          //console.log("La fecha de inicio es menor que Hoy");
          return res.status(400).json("La fecha de inicio es menor que Hoy");
        }
        if (fecha_inicio > fecha_final) {
          return res
            .status(400)
            .json("La fecha de inicio es mayor que la de finalización");
        }
        console.log("pasa los errores de fecha");
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

        let q = new Date();
        let q2 = q.getTimezoneOffset() * 60000;
        q = new Date(q.getTime() - q2);
        fecha_inicio = new Date(fecha_inicio);
        let fecha_inicio_2 = fecha_inicio.getTimezoneOffset() * 60000;
        fecha_inicio = new Date(fecha_inicio.getTime() - fecha_inicio_2);
        fecha_final = new Date(fecha_final);
        let fecha_final_2 = fecha_final.getTimezoneOffset() * 60000;
        fecha_final = new Date(fecha_final.getTime() - fecha_final_2);
        if (fecha_inicio < q) {
          return res.status(400).json("La fecha de inicio es menor que Hoy");
        }
        if (fecha_inicio > fecha_final) {
          return res
            .status(400)
            .json("La fecha de inicio es mayor que la de finalización");
        }

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
