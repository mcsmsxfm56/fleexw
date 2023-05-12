import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { DataTRegister } from "../users/register/trabajador";
import {
  buscarTrabajador,
  eliminarTrabajador,
} from "@/services/trabajadorController";

interface token {
  id: string;
  email: string;
  iat: number;
}

interface decodeToken {
  email: string;
  id: string;
  iat: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataTRegister | {}>
) {
  //console.log(req.headers);
  const { id } = req.body;
  // console.log(id);

  try {
    if (req.method === "PUT" && req.body.realmethod === "GET") {
      try {
        const trabajador = await buscarTrabajador(id as string);

        const newTrabajador = {
          name: trabajador.name,
          ciudad: trabajador.ciudad,
          direccion: trabajador.direccion,
          email: trabajador.email,
          phone: trabajador.phone,
          genero: trabajador.genero,
          edad: trabajador.nacimiento, // habria que unificar el formato de la fecha de nacimiento para poder hacer una fn que retorne la edad
          estatura: trabajador.estatura,
          grupo_sanguineo: trabajador.grupo_sanguineo,
          talle_camiseta: trabajador.talla_camiseta,
          idType: trabajador.idType,
          idNumber: trabajador.idNumber,
          imagen_dni: trabajador.imagen_dni,
          foto:
            trabajador.foto ??
            " https://th.bing.com/th/id/OIP.OaHQ7x61nQd8AnrEDOLtYwHaHa?pid=ImgDet&rs=1 ",
          cv: trabajador.cv,
          rut: trabajador.rut,
          certificado_bancario: trabajador.certificado_bancario,
        };

        return res.status(200).json(newTrabajador);
      } catch (error: any) {
        return res.status(400).json(error.message);
      }
    }

    if (req.method === "DELETE") {
      try {
        const elimiar = await eliminarTrabajador(id as string);
        if (elimiar) {
          return res.status(200).json("Trabajador eliminado correctamente");
        }
      } catch (error: any) {
        return res.status(400).json(error.message);
      }
    }
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
}
