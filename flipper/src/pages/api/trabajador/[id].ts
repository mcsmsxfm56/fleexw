import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { DataTRegister } from "../users/register/trabajador";
import { buscarTrabajador } from "@/services/trabajadorController";

interface token {
  id: string;
  email: string;
  iat: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataTRegister | string>
) {
  const { id } = req.query;
  const body = req.body;
  const { authorization } = req.headers;

  try {
    if (req.method === "GET") {
      try {
        const trabajador = await buscarTrabajador(id as string);
        res.status(200).send(trabajador);
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
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
