// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Empresa from "@/pages/api/models/empresa.model";
import type { NextApiRequest, NextApiResponse } from "next";

export interface Data {
  NombreEmpresa: string;
  NombreTitular: string;
  Email: string;
  Ciudad: string;
  Direccion: string;
  Telefono: string;
  Contraseña: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method);

  const {
    NombreEmpresa,
    NombreTitular,
    Email,
    Ciudad,
    Direccion,
    Telefono,
    Contraseña,
  } = req.body;
  try {
    if (
      !NombreEmpresa ||
      !NombreTitular ||
      !Email ||
      !Ciudad ||
      !Direccion ||
      !Telefono ||
      !Contraseña
    )
      throw new Error("Info Missing");
    console.log("aca ando");

    const objToCreate = {
      NombreEmpresa,
      NombreTitular,
      Email,
      Ciudad,
      Direccion,
      Telefono,
      Contraseña,
    };
    const empresaCreada = await Empresa.findOne({ where: { Email: Email } });
    if (empresaCreada) throw new Error("Empresa ya existente");
    const create = await Empresa.create(objToCreate);

    res.status(200).send(create);
  } catch (error: any) {
    res.status(404).send(error.message);
  }
}
