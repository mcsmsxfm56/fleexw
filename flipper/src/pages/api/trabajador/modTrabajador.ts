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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataTRegister | {}>
) {
  //console.log(req.headers);
  const body = req.body;
  const { authorization } = req.headers;

  try {
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
        console.log(body);

        const trabajadorModificar = await prisma.trabajador.update({
          where: { id: id },
          data: {
            phone: null ?? body.values.phone,
            email: null ?? body.values.email,
            nacimiento: null ?? body.values.nacimiento,
            genero: null ?? body.values.genero,
            ciudad: null ?? body.values.ciudad,
            direccion: null ?? body.values.direccion,
            estatura: null ?? body.values.estatura,
            talla_camiseta: null ?? body.values.talla_camiseta,
            grupo_sanguineo: null ?? body.values.grupo_sanguineo,
            imagen_dni: null ?? body.values.imagen_dni,
            foto: null ?? body.values.foto,
            cv: null ?? body.values.cv,
            rut: null ?? body.values.rut,
            certificado_bancario: null ?? body.values.certificado_bancario,
          },
        });

        return res.status(200).send(trabajadorModificar);
      }
    }
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}
