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
  const body = req.body;
  const { authorization } = req.headers;

  try {
    if (req.method === "GET") {
      try {
        const trabajador = await buscarTrabajador(id as string);

        const newTrabajador = {
          name: trabajador.name,
          ciudad: trabajador.ciudad,
          direccion: trabajador.direccion,
          email: trabajador.email,
          phone: trabajador.phone,
          genero: trabajador.genero,
          edad: "", // habria que unificar el formato de la fecha de nacimiento para poder hacer una fn que retorne la edad
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

        res.status(200).send(newTrabajador);
      } catch (error: any) {
        res.status(400).send(error.message);
      }
    }
    if (req.method === "PUT") {
      let token = null;
      if (
        authorization &&
        authorization.toLocaleLowerCase().startsWith("bearer")
      ) {
        token = authorization.split(" ")[1]; // obtenemos el token del authorization 'bearer token'
      }
      if (!token) {
        return res.status(401).send("Token inexistente o invalido");
      }
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
      const { id } = decodedToken as token;

      if (decodedToken) {
        const trabajadorModificar = await prisma.trabajador.update({
          where: { id: id },
          data: {
            phone: null ?? body.phone,
            email: null ?? body.email,
            nacimiento: null ?? body.nacimiento,
            genero: null ?? body.genero,
            ciudad: null ?? body.ciudad,
            direccion: null ?? body.direccion,
            estatura: null ?? body.estatura,
            talla_camiseta: null ?? body.talla_camiseta,
            grupo_sanguineo: null ?? body.grupo_sanguineo,
            imagen_dni: null ?? body.imagen_dni,
            foto: null ?? body.foto,
            cv: null ?? body.cv,
            rut: null ?? body.rut,
            certificado_bancario: null ?? body.certificado_bancario,
          },
        });
        return res.status(200).send(trabajadorModificar);
      }
    }
    if (req.method === "DELETE") {
      try {
        const elimiar = await eliminarTrabajador(id as string);
        if (elimiar) {
          return res.status(200).send("Trabajador eliminado correctamente");
        }
      } catch (error) {}
    }
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
