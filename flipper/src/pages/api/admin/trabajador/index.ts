import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
