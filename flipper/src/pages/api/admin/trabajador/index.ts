import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization } = req.headers;
  let token = null;
  if (authorization && authorization.toLocaleLowerCase().startsWith("bearer")) {
    token = authorization.split(" ")[1]; // obtenemos el token del authorization 'bearer token'
  }
  if (!token) {
    return res.status(401).send("Token inexistente o invalido");
  }
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
  if (decodedToken) {
    if (req.method === "GET") {
      const trabajadorTable = await prisma.trabajador.findMany();
      return res.status(200).send(trabajadorTable);
    }
    if (req.method === "PUT") {
      const {
        name,
        idType,
        idNumber,
        nacimiento,
        genero,
        phone,
        email,
        id,
        isDeleted,
        ciudad,
        direccion,
        estatura,
        talla_camiseta,
        grupo_sanguineo,
        imagen_dni,
        foto,
        cv,
        rut,
        certificado_bancario,
      } = req.body;
      const updateEvento = await prisma.trabajador.update({
        where: { id },
        data: {
          name,
          idType,
          idNumber,
          nacimiento,
          genero,
          phone,
          email,
          isDeleted,
          ciudad,
          direccion,
          estatura,
          talla_camiseta,
          grupo_sanguineo,
          imagen_dni,
          foto,
          cv,
          rut,
          certificado_bancario,
        },
      });
      return res.status(200).send("actualizacion con exito");
    }
  }
}
