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
  } else if (req.method === "UPDATE") {
    const id: string = req.query.id as string;
    //console.log(id);
    if (Object.keys(req.body).length === 0) {
      res.status(400).send("Objeto vacio");
    }
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

    if (typeof isDeleted == "boolean") {
      //console.log(req.body);
      const updateEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          isDeleted: isDeleted,
        },
      });
      res.status(200).send("PUT");
    }
    /*
    if (typeof trabajadores === "string") {
      const updateTrabajadores = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          trabajadores: {
            create: {
              assignedBy: "test",
              trabajadorId: trabajadores,
            },
            /* 
            {
              assignedAt?: Date | string
              assignedBy: string
              trabajadorId: string |TrabajadorCreateNestedOneWithoutEventosInput
            },
            TrabajadorCreateNestedOneWithoutEventosInput type
            
            
          },
        },
      });
      //res.status(200).send("PUT");
    }
    */

    if (typeof nombre === "string") {
      const updateEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          nombre,
        },
      });
      //res.status(200).send("PUT nombre");
    }
    /*
    if (typeof fecha === "string") {
      /*
      {
        "fecha": "10 October 2020 03:20 UTC"
        //en fecha tambien se setea la hora de inicio
      }
      
      fecha = new Date(fecha);
      const updateEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          fecha_inicio: fecha,
          fecha_final: fecha,
        },
      });
    }
    */
    /*if (typeof hora_final === "string") {
      /*
      {
        "hora_final": "10 October 2020 03:20 UTC"
        //en hora final solo se toma la hora, la fecha puede ser cualquiera que no afecta
      }
      
      hora_final = new Date(hora_final);
      const updateEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          hora_final,
        },
      });
    }*/
    if (typeof lugar === "string") {
      const updateEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          lugar,
        },
      });
    }
    if (typeof cupos === "number") {
      const updateEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          cupos,
        },
      });
    }
    if (typeof perfil === "string") {
      const updateEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          perfil,
        },
      });
    }
    if (typeof pago === "number") {
      const updateEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          pago,
        },
      });
    }
    if (typeof observaciones === "string") {
      const updateEvent = await prisma.evento.update({
        where: {
          id,
        },
        data: {
          observaciones,
        },
      });
    }
    //res.status(400).send("ningun campo valido se edito");
    res.status(200).send("check status");
  }

  /*
  1. RUTA POST /api/home/create-event/:idEmpresaCreadora
  2. SE ESPERA QUE RECIBA 
  #de fecha tambien se extrae la hora inicial
  #hora final de evento, siempre incluir dia mes y año
  #Supongo que los eventos ocurriran solo en colombia
  #Postulaciones que la empresa acepta, cuando se reciban mas de 100 postulaciones se deshabilitan las postulaciones
  #esta en pesos colombianos
  POST /api/home/create-event/682bfc58-d04d-457f-ac92-91c7079dcf50
  {
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
    let id_empresa: string = req.query.id as string;
    interface inputPostApiHomeCreateEventId {
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
